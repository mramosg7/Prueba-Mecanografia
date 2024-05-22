import { useState,useEffect } from "react"
import { typingTestTexts } from "../../texts"
import { useTimer } from "use-timer"
import { formatearTiempo, calcularWPM } from "../utils/utils"

export default function DisplayText(){
    const [text, setText] = useState([])
    const [currentWord, setCurrentWord] = useState(0)
    const [started, setStarted] = useState(false)
    const [finished, setFinished] = useState(false)

    const { time, start, pause, reset, status } = useTimer();
    const resetAll = () =>{
        text.forEach((_, index) => {
            const element = document.getElementById(index);
            if (element) {
                element.classList.remove('bg-red-200', 'bg-green-200', 'text-gray-500');
            }
        });
        reset()
        setCurrentWord(0)
        const textIndex = Math.floor(Math.random() * typingTestTexts.length)
        setText(typingTestTexts[textIndex].split(' '))
    }
    useEffect(() => {
        const handleEnterKey = (e) => {
            if (e.key === 'Enter') {
                resetAll();
                setFinished(false);
            }
        };

        if (finished) {
            document.addEventListener('keydown', handleEnterKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEnterKey);
        };
    }, [finished]);
    
    useEffect(()=>{
        const textIndex = Math.floor(Math.random() * typingTestTexts.length)
        setText(typingTestTexts[textIndex].split(' '))
        
        document.addEventListener('keydown',(e)=>{
            if(e.key === 'Escape'){
                resetAll()
            }
        })
        return () => {
            document.removeEventListener('keydown',(e)=>{
                if(e.key === 'Escape'){
                    resetAll()
                }
            })
        }
    },[])

    const handleChange = (e) => {

        const value = e.target.value;
        const lastChar = value.charAt(value.length - 1);
        
        if(lastChar === ' '){
            checkWord(e)
        }
        
    }
    const checkWord = (e) => {

        if(e.target.value === `${text[currentWord]} `){
            if(currentWord === 0){
                start()
            }
            if(currentWord === text.length-1){
                pause()
            }
            if(currentWord === text.length-1){
                setFinished(true)
            }
            document.getElementById(currentWord).classList.remove('bg-red-200') 
            document.getElementById(currentWord).classList.remove('bg-green-200') 
            document.getElementById(currentWord).classList.add('text-gray-500') 
            setCurrentWord(prevCurrentWord => prevCurrentWord+1)
            e.target.value = ''
            document.getElementById(currentWord+1)?.classList.add('bg-green-200') 
            
        }else{
            if(!document.getElementById(currentWord).classList.contains('bg-red-200')){
                document.getElementById(currentWord).classList += ' bg-red-200'
            }
            
        }
    }


    return(
        <>
            <div className="flex gap-3 p-5 w-[75%] justify-center">
                <div className="w-[75%] flex flex-col gap-3">
                    {!started && <>
                        <div className="bg-white border shadow border-black p-2 rounded-md h-[400px] flex flex-col gap-[40px] text-[25px]">
                            <p>Haz clic en <b >Iniciar</b> para comenzar la prueba.</p>
                            <p>Presiona la tecla <span className="text-white bg-black px-2 py-1 rounded text-center ">esc</span> para cambiar de leyenda.</p>
                        </div>
                        <button className="py-2 px-4 text-[17px] bg-blue-600 text-white font-bold w-[130px] rounded" onClick={()=>{setStarted(prevStarted=> !prevStarted); reset()}}>Iniciar</button>
                    </>}
                    {started && (<>
                        <div className="bg-white border shadow border-black p-3 min-h-[400px] rounded-md gap-[40px] text-[25px] text-justify flex flex-col justify-between">
                            <div>
                                {text.map((word,index)=>{
                                    return <span key={index} id={index}>{word} </span>
                                })}
                            </div>
                            
                            {finished && <div>Presiona la tecla <span className="text-white bg-black px-2 py-1 rounded text-center ">enter</span> para iniciar un nuevo juego.</div>}
                        </div>
                    
                        <div className="flex gap-2">
                            <input type="text" className="border border-black rounded focus:outline-none p-2 " onChange={(e)=>{handleChange(e)}} />
                            <button className="py-2 px-4 bg-red-400 text-white font-bold w-[100px] rounded" onClick={()=>{setStarted(prevStarted=> !prevStarted); resetAll()}}>Parar</button>
                        </div>
                    </>)}
                </div>
                <div className="text-[20px]">
                    <div><b>Tiempo:</b> {formatearTiempo(time)}</div>
                    <div><b>Velocidad:</b> {time === 0 ? '00.00' : calcularWPM(currentWord,time)} WPM</div>
                </div>
                
            </div>
           
        </>
    )

}