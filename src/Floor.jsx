/* eslint-disable react/no-unknown-property */
import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';
import { useRef } from 'react';

export default function Floor() {
  const ref = useRef();
  return (
    <RigidBody type="fixed">
      <mesh
        ref={ref}
        color="red"
        castShadow
        receiveShadow
        position={[0, -0.5, 0]}
        // rotation={[Math.PI * - 0.5, 0, 0]}
        onPointerOver={(e) => (e.stopPropagation(), console.log('over'))}
      >
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color="purple" side={DoubleSide} />
      </mesh>
    </RigidBody>
  );
}
