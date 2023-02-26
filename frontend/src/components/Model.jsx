import { useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

const Model = ({ model }) => {
  const obj = useLoader(OBJLoader, model);

  return <primitive object={obj} scale={10.0} />;
};

const Scene = ({ model }) => {
  return (
    <Canvas style={{ height: "100%", width: "100%" }}>
      <color attach="background" args={["black"]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.1}/>
        <pointLight position={[8, 8, 8]} />
        <Model model={model} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
