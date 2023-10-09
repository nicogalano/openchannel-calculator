// Results.tsx

import React, { useEffect, useRef } from 'react';
import { useResults } from '../helpers/ResultsContext'; // Ajusta la ruta según sea necesario
import { formatNumberTo3Decimals } from '../helpers/helper';
import Chart from './Plot';

const Results: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const context = useResults() as { results: any };
    if ('results' in context) { // Comprobar si 'results' está en el objeto context
        const { results } = context;
        const criticalResults = results.criticalResults;
        const normalResults = results.normalResults;

        return (
            <div className='mt-24 mx-4'>
                
                <div className='m-4'>
                    <Chart results={{ criticalResults, normalResults }}/>
                </div>

                <div className='m-4'>
                    <h3>Critical Results</h3>
                    {criticalResults !== undefined && (
                        <div>
                            <p>Critical Height: {formatNumberTo3Decimals(criticalResults.criticalHeight)} m</p>
                            <p>Critical Velocity: {formatNumberTo3Decimals(criticalResults.velocity)} m/s</p>
                            <p>Critical Area: {formatNumberTo3Decimals(criticalResults.area)} m2</p>
                            <p>Critical Froud: {formatNumberTo3Decimals(criticalResults.froud)} (-)</p>
                        </div>
                    )}
                    <h3>Normal Results</h3>
                    {normalResults !== undefined && (
                        <div>
                            <p>Normal Height: {formatNumberTo3Decimals(normalResults.normalHeight)} m</p>
                            <p>Normal Velocity: {formatNumberTo3Decimals(normalResults.velocity)} m/s</p>
                            <p>Normal Area: {formatNumberTo3Decimals(normalResults.area)} m2</p>
                            <p>Normal Froud: {formatNumberTo3Decimals(normalResults.froud)} (-)</p>
                        </div>

                    )}
                </div>
            </div>
        );
    } else {
        return <div>Error</div>
    }
};

export default Results;
