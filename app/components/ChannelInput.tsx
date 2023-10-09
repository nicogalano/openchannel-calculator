import React, { useState } from 'react';
import { calculateCriticalHeight, calculateNormalHeight } from '../utils/calculations';
import { useResults } from '../helpers/ResultsContext';

const ChannelInput: React.FC = () => {
    const [flowRate, setFlowRate] = useState<number>(0);
    const [slope, setSlope] = useState<number>(0);
    const [slopeRatio, setSlopeRatio] = useState<number>(0);
    const [basalWidth, setBasalWidth] = useState<number>(0);
    const [manning, setManning] = useState<number>(0);

    const { setResults } = useResults() as { setResults: any };

    // Functions to handle input changes
    const handleFlowRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlowRate(parseFloat(e.target.value));
    };

    const handleSlopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlope(parseFloat(e.target.value));
    };

    const handleSlopeRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlopeRatio(parseFloat(e.target.value));
    };

    const handleBasalWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBasalWidth(parseFloat(e.target.value));
    };

    const handleManning = (e: React.ChangeEvent<HTMLInputElement>) => {
        setManning(parseFloat(e.target.value));
    };

    // Function to perform calculation with entered values
    const handleCalculateClick = (
        flowRate: number,
        basalWidth: number,
        slope: number,
        slopeRatio: number,
        manning: number
    ) => {
        const criticalResults = calculateCriticalHeight(flowRate, basalWidth, slopeRatio);
        const normalResults = calculateNormalHeight(flowRate, basalWidth, slope, slopeRatio, manning);
        setResults({
            criticalResults,
            normalResults,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center my-24">
            <label className="mb-4 text-lg font-bold">Channel Input</label>
            <div className="flex flex-col  mx-4">

                <h2 className="mb-2 text-md ">Flow Rate</h2>
                <div className='flex items-center mb-4'>
                    <input
                        className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        type="number"
                        placeholder="Enter Flow Rate"
                        value={flowRate}
                        onChange={handleFlowRateChange}
                    />
                    <div className="ml-2">m³/s</div>
                </div>

                <h2 className="mb-2 text-md mr-2">Slope</h2>
                <div className='flex items-center mb-4'>
                    <input
                        className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        type="number"
                        placeholder="Slope (%)"
                        value={slope}
                        onChange={handleSlopeChange}
                    />
                    <div className="ml-2">%</div>
                </div>

                <h2 className="mb-2 text-md mr-2">Slope Ratio</h2>
                <div className='flex items-center mb-4'>
                    <input
                        className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        type="number"
                        placeholder="Slope Ratio"
                        value={slopeRatio}
                        onChange={handleSlopeRatioChange}
                    />
                    <div className="ml-2">(-)</div>
                </div>

                <h2 className="mb-2 text-md mr-2">Basal Width</h2>
                <div className='flex items-center mb-4'>
                    <input
                        className="ml-4  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        type="number"
                        placeholder="Basal Width"
                        value={basalWidth}
                        onChange={handleBasalWidthChange}
                    />
                    <div className="ml-2">(m)</div>
                </div>

                <h2 className="mb-2 text-md mr-2">Manning</h2>
                <div className='flex items-center mb-4'>
                    <input
                        className="ml-4  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        type="number"
                        placeholder="Basal Width"
                        value={manning}
                        onChange={handleManning}
                    />
                    <div className="ml-2">(-)</div>
                </div>

            </div>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={() => handleCalculateClick(flowRate, basalWidth, slope, slopeRatio, manning)}
            >
                Calculate
            </button>
        </div>
    );
};

export default ChannelInput;
