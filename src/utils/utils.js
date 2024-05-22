/**
 * Formatea los segundos en formato mm:ss
 * @param {number} segundos - Segundos a formatear
 * @returns {string} Tiempo formateado en formato mm:ss
 */

export function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    
    const minutosString = minutos < 10 ? '0' + minutos : minutos;
    const segundosString = segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes;
    
    return minutosString + ':' + segundosString;
}

/**
 * Calcula las palabras por minuto (WPM) en base a las palabras escritas y el tiempo transcurrido
 * @param {number} palabras - Cantidad de palabras escritas
 * @param {number} segundos - Tiempo transcurrido
 * @returns {number} WPM calculadas
 */

export function calcularWPM(palabras, segundos) {
    if(segundos === 0){
        return 0
    }
    const wpm = palabras * 60 / segundos;
    return wpm.toFixed(2);
}