/* eslint-disable react/no-unknown-property */
import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';
import { useRef } from 'react';
import { useControls } from 'leva';

export default function Floor() {
  const ref = useRef();
  const color = useControls({ ground: 'purple' });

  return (
    <RigidBody type="fixed" position={[0, -0.5, 0]} mass={100} colliders="cuboid">
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        // rotation={[Math.PI * - 0.5, 0, 0]}
        onPointerOver={(e) => (e.stopPropagation(), console.log('over'))}
      >
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color={color.ground} side={DoubleSide} />
      </mesh>
    </RigidBody>
  );
}
