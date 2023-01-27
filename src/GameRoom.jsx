/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React from 'react';
import Floor from './Floor';
import Marble from './Marble';

export default function GameRoom() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2.5, 4, 6],
      }}
    >
      <Physics gravity={[0, -9.81, 0]}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[0, 5, 0]}
          angle={3.14}
          penumbra={0.3}
          color="#FF2233"
          intensity={14}
          castShadow
        />
        <Marble />
        <Floor />
      </Physics>
    </Canvas>
  );
}
