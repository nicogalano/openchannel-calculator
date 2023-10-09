import React, { useEffect, FunctionComponent, useRef } from 'react';
import * as d3 from 'd3';
import { CalculationCritivalResults, CalculationNormalResults } from '../utils/calculations';

interface ChartProps {
  results: {
    criticalResults: CalculationCritivalResults; // Cambia 'any' al tipo correcto si es necesario
    normalResults: CalculationNormalResults; // Cambia 'any' al tipo correcto si es necesario
  };
}

function drawChannel(svgRef: React.RefObject<SVGSVGElement>, slopeRatio: number, basalWidth: number, hc: number, hn:number) {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const h = 240;
    const w = 300;
    const k = 2; // --> deberia salir del input 
    const height = 10; // Altura del trapecio

    const ratio = h / hn;

    // 240 / hn
    // 240  hn


    //     x4,y2---------------------x3,y2
    //          
    //
    //              x1,y1--x2,y1
    
    const fillColor = "blue"; // Color de relleno
    
    const bottomWidth = 10; // Ancho inferior del trapecio --> deberia ser bs
    const topWidth = 2 * k * height + bottomWidth; // Ancho superior del trapecio


    const x1 = k * height ; // 
    const y1 = 0;  // 
    
    const x2 = x1 + bottomWidth ; 
    const x3 = topWidth; // 
    const y2 = h; // 

    const x4 = 0;

    const yScale = d3.scaleLinear()
        .domain([0, h]) // Invertir el dominio
        .range([h, 0]); // Invertir el rango

    // Definir las coordenadas de los puntos en forma de un array
    const points = [
        { x: x1, y: yScale(y1) },
        { x: x2, y: yScale(y1) },
        { x: x3, y: yScale(y2) },
        { x: x4, y: yScale(y2) },
    ];

    console.log(points);

    const areaGenerator = d3.area()
        .x(d => d.x)
        .y1(d => d.y)
        .y0(0) // Establecer la coordenada y del punto inferior del área
        .curve(d3.curveLinearClosed); // Cerrar el área
    
    svg
        .attr("width", w)
        .attr("height", h)
        .style("margin-top", 50)
    svg
        .append("path")
        .attr("d", areaGenerator(points))
        .attr("fill", fillColor);

    svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", yScale(hc * ratio)) // Altura deseada de la línea horizontal
        .attr("x2", w)
        .attr("y2", yScale(hc * ratio)) // Altura deseada de la línea horizontal
        .attr("stroke", "red")
        .attr("stroke-width", 2);

        console.log(hc );
        console.log(ratio );
        console.log(hc * ratio);
        
}


const Chart: FunctionComponent<{ results?: { criticalResults?: CalculationCritivalResults, normalResults?: CalculationNormalResults } }> = ({ results }) => {
    const svg = useRef<SVGSVGElement>(null);
    
    useEffect(() => {
        
        
        if (results?.criticalResults && results?.normalResults) {
            drawChannel(svg, 2, 10, results.criticalResults.criticalHeight, results.normalResults.normalHeight);
        }
    }, [svg, results]);

    return (
        <div id="chart">
            <svg ref={svg} />
        </div>
    );
};

export default Chart;
