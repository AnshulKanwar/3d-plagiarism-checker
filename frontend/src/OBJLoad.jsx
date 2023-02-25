import { useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three-obj-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const OBJLoad = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);
    
        const objLoader = new OBJLoader();
        objLoader.load('/path/to/file.obj', (object) => {
          scene.add(object);
        });
    )
}