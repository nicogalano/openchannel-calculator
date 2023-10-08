// calculation.ts

// Import any necessary dependencies, if needed
// import { Dependency } from 'dependency-library';

export interface CalculationCritivalResults {
    criticalHeight: number;
    velocity: number;
    area: number;
    froud: number;
    // Agrega otras propiedades si es necesario
}

export interface CalculationNormalResults {
    normalHeight: number;
    velocity: number;
    area: number;
    froud: number;
    // Agrega otras propiedades si es necesario
}


const g: number = 9.81;

// Example of a simple calculation function
export function calculateCriticalHeight(flowRate: number, basalWidth: number, slopeRatio: number,): CalculationCritivalResults {

    const criticalHeight = encontrarDiametroHidraulico(flowRate, basalWidth, slopeRatio);
    console.log('Altura crítica:', criticalHeight);

    const area: number = calculateArea(basalWidth, slopeRatio, criticalHeight)
    const velocity: number = calculateVelocity(flowRate, area)
    const bs: number = basalWidth + 2 * slopeRatio * criticalHeight;

    const froud: number = calculateFroud(velocity, area, bs)

    return {
        criticalHeight,
        area,
        velocity,
        froud
    };
}


export function calculateNormalHeight(flowRate: number, basalWidth: number, slope: number, slopeRatio: number, manning: number): CalculationNormalResults {

    const normalHeight: number = encontrarAlturaNormal(flowRate, basalWidth, slopeRatio, slope, manning)
    console.log('Altura normal:', normalHeight);

    const area: number = calculateArea(basalWidth, slopeRatio, normalHeight)
    const velocity: number = calculateVelocity(flowRate, area)
    const bs: number = basalWidth + 2 * slopeRatio * normalHeight;

    const froud: number = calculateFroud(velocity, area, bs)

    return {
        normalHeight,
        area,
        velocity,
        froud
    };
}


function calculateFroud(velocidad: number, area: number, bs: number) {
    return velocidad / (Math.sqrt(g * area / bs));
}

function calculateVelocity(flowRate: number, areaActual: number) {
    return flowRate / areaActual;
}

function calculateArea(basalWidth: number, slopeRatio: number, diametroHidraulico: number) {
    return basalWidth * diametroHidraulico + slopeRatio * diametroHidraulico * diametroHidraulico;
}

function calculatePm(basalWidth: number, slopeRatio: number, normalHeight: number) {
    return basalWidth + 2 * Math.sqrt(slopeRatio * slopeRatio + 1) * normalHeight;
}

function calculateRh(area: number, Pm: number) {
    return area / Pm;
}

function calculateSf(vel: number, Rh: number, manning: number) {
    return Math.pow(manning * vel, 2) / Math.pow(Rh, 1.33333333333333);
}

function encontrarDiametroHidraulico(caudal: number, basalWidth: number, slopeRatio: number) {
    let diametroActual = 0;
    let incremento = 0.001; // Tamaño del incremento

    while (diametroActual <= 100) {

        const bs = basalWidth + 2 * slopeRatio * diametroActual;
        const areaActual = calculateArea(basalWidth, slopeRatio, diametroActual);
        const velocidadActual = calculateVelocity(caudal, areaActual);

        const froudeActual = calculateFroud(velocidadActual, areaActual, bs);

        if (Math.abs(froudeActual - 1) < 0.001) {
            // El número de Froude es aproximadamente igual a 1, detener la búsqueda.
            break;
        }
        diametroActual += incremento;
    }
    return diametroActual;
}

function encontrarAlturaNormal(caudal: number, basalWidth: number, slopeRatio: number, slope: number, manning: number) {
    let alturaActual = 0;
    let incremento = 0.001; // Tamaño del incremento

    while (alturaActual <= 100) {

        const bs = basalWidth + 2 * slopeRatio * alturaActual;
        const areaActual = calculateArea(basalWidth, slopeRatio, alturaActual);
        const velocidadActual = calculateVelocity(caudal, areaActual);

        const PmActual = calculatePm(basalWidth, slopeRatio, alturaActual);
        const RhActual = calculateRh(areaActual, PmActual);

        const SfActual = calculateSf(velocidadActual, RhActual, manning);

        if (Math.abs(SfActual - slope) < Math.pow(0.001, 2)) {
            break;
        }
        alturaActual += incremento;
    }
    return alturaActual;
}
