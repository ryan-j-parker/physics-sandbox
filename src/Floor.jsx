/* eslint-disable react/no-unknown-property */
import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';
import { useRef } from 'react';

export default function Floor() {
  const ref = useRef();

  return (
    <RigidBody type="fixed" position={[0, -0.5, 0]} mass={100} colliders="cuboid">
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        onPointerOver={(e) => (e.stopPropagation(), console.log('over'))}
      >
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color={'#ccda89'} side={DoubleSide} />
      </mesh>
    </RigidBody>
  );
}
