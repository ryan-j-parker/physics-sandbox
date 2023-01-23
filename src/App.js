/* eslint-disable react/no-unknown-property */
import './App.css';
import { Suspense } from 'react';
import { Loader, OrbitControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ACESFilmicToneMapping, sRGBEncoding } from 'three';
import Experience from './Experience';
import { Physics } from '@react-three/rapier';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 400,
          position: [0, 10, 40],
        }}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputEncoding: sRGBEncoding,
        }}
      >
        <Experience />
        <OrbitControls makeDefault dampingFactor={0.3} />
        {/* <Sky /> */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      </Canvas>
    </Suspense>
  );
}

export default App;
