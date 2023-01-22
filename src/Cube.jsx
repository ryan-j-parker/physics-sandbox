/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Edges, Stage } from '@react-three/drei';
import { useRef } from 'react';
import { useState } from 'react';

export default function Cube() {
  const ref = useRef();
  const [color, setColor] = useState('green');
  const [scale, setScale] = useState(1);
  return (
    <mesh
      ref={ref}
      //   color={color}
      scale={scale}
      castShadow
      receiveShadow
      position={[0, 0.5, 0]}
      rotation={[0, 0.5, 0]}
      onPointerOver={(e) => (e.stopPropagation(), setColor('white'))}
      onPointerOut={(e) => (e.stopPropagation(), setColor('green'))}
      onClick={(e) => (e.stopPropagation(), setScale(scale + 0.1))}
    >
      <Edges
        scale={1.1}
        threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
        color="white"
      />
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
