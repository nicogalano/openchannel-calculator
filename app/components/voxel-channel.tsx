'useClient';
import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadGLTFModel } from '../lib/model';

function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const VoxelChannel = () => {
    const refContainer = useRef()
    const [loading, setLoading] = useState(true)
    const [renderer, setRenderer] = useState()
    const refRenderer = useRef()
    const [target] = useState(new THREE.Vector3(-0.5, 1.2, 0))
    const [initialCameraPosition] = useState(
        new THREE.Vector3(
            20 * Math.sin(0.2 * Math.PI),
            10,
            20 * Math.sin(0.2 * Math.PI)
        )
    )

    const [scene] = useState(new THREE.Scene())
    const [_controls, setControls] = useState()

    /* eslint-disable react-hook/exhaustive-deps */
    useEffect(() => {

        const { current: container } = refContainer
        console.log(container.clientWidth);
        if (container && !renderer) {
            const scW = container.clientWidth
            const scH = container.clientHeight

            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            })
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(scW * 3, scH * 3)
            renderer.outputColorSpace = THREE.SRGBColorSpace
            container.appendChild(renderer.domElement)
            setRenderer(renderer)

            // 640 -> 240
            // 8 -> 6

            const scale = scH * 0.005 + 4.8
            const camera = new THREE.OrthographicCamera(
                -scale,
                scale,
                scale,
                -scale,
                0.01,
                5000
            )
            camera.position.copy(initialCameraPosition)
            camera.lookAt(target)
            setCamera(camera)

            const ambientLight = new THREE.AmbientLight(0x404040, 0.55)
            scene.add(ambientLight)

            const controls = new OrbitControls(camera, renderer.domElement)
            controls.autoRotate = true
            controls.target = target
            setControls(controls)

            loadGLTFModel(scene, '/canal1.glb', {
                receiveShadow: false,
                castShadow: false
            }).then(() => {
                animate()
                setLoading(false)
            })

            let req = null
            let frame = 0
            const animate = () => {
                req = requestAnimationFrame(animate)

                frame = frame <= 100 ? frame + 1 : frame

                if (frame <= 100) {
                    const p = initialCameraPosition
                    const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

                    camera.position.y = 10
                    camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
                    camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
                    camera.lookAt(target)
                } else {
                    controls.update()
                }
                renderer.render(scene, camera)
            }
            return () => {
                cancelAnimationFrame(req)
                renderer.dispose()
            }
        }
    }, [])

    return (
        <div className='mt-2 w-640 h-640'>
            <div ref={refContainer} className=" w-640 h-640" >
                {loading && (
                    <div>Loading...</div>
                )}

            </div>
        </div>
    )
}

export default VoxelChannel;