// Results.tsx

import React, { useEffect, useRef } from 'react';
import { useResults } from '../helpers/ResultsContext'; // Ajusta la ruta según sea necesario
import { formatNumberTo3Decimals } from '../helpers/helper';
import NoSsr from './no-ssr';
import VoxelChannel from './voxel-channel';
import * as THREE from 'three';



const Results: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const context = useResults() as { results: any };
    if ('results' in context) { // Comprobar si 'results' está en el objeto context
        const { results } = context;
        const criticalResults = results.criticalResults;
        const normalResults = results.normalResults;

        useEffect(() => {
            if (canvasRef.current) {
                // Configura la escena, cámara y renderer
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
                renderer.setSize(300, 300); // Ajusta el tamaño del lienzo

                // Crea la geometría del canal y las alturas (similar al ejemplo anterior)
                const channelGeometry = new THREE.BoxGeometry(1, 2, 1);
                const channelMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                const channelMesh = new THREE.Mesh(channelGeometry, channelMaterial);
                scene.add(channelMesh);

                // Agrega objetos a la escena

                // Configura la posición y orientación de la cámara
                camera.position.z = 5;

                // Renderiza la escena
                const animate = () => {
                    requestAnimationFrame(animate);

                    // Actualiza la escena si es necesario (puedes agregar animación aquí)

                    renderer.render(scene, camera);
                };

                animate();
            }
        }, [criticalResults, normalResults]);


        return (
            <div>
                <div>
                    <h3>3D Channel Representation</h3>
                    <canvas ref={canvasRef}></canvas>
                    {/* Puedes agregar otros resultados aquí */}
                </div>

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
        );
    } else {
        return <div>Error</div>
    }
};

export default Results;
