export function formatNumberTo3Decimals(number: number): string {
    // Redondea el número a 3 decimales
    const roundedNumber = Math.round(number * 1000) / 1000;

    // Convierte el número redondeado a una cadena con 3 decimales
    const formattedNumber = roundedNumber.toFixed(3);

    return formattedNumber;
}