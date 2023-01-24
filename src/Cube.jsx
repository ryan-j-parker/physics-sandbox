/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Edges, Stage } from '@react-three/drei';
import { useRef } from 'react';
import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { RigidBody } from '@react-three/rapier';

export default function Cube() {
  const ref = useRef();
  const [color, setColor] = useState('green');
  const [scale, setScale] = useState(1);
  const [hovered, setHovered] = useState();

  useFrame(() => {
    {
      hovered
        ? (gsap.to(ref.current.rotation, { x: 0.001, duration: 10 }),
        gsap.to(ref.current.rotation, { y: 0.01, duration: 10 }))
        : (gsap.to(ref.current.rotation, { x: 0.01, duration: 10 }),
        gsap.to(ref.current.rotation, { y: 0.001, duration: 10 }));
    }
  });

  return (
    <RigidBody
      gravityScale={1}
    >
      <mesh
        ref={ref}
        //   color={color}
        scale={scale}
        castShadow
        receiveShadow
        position={[0, 2, 0]}
        rotation={[0, 0.5, 0]}
        onPointerOver={(e) => {
          setColor('white');
          setHovered(!hovered);
          console.log(hovered);
        }}
        onPointerOut={(e) => (e.stopPropagation(), setColor('green'))}
        onClick={() => {
          // e.stopPropagation();
          setScale(scale + 0.1);
        }}
        onContextMenu={(e) => (e.stopPropagation(), setScale(scale - 0.1))}
      >
        <Edges
          scale={1.1}
          threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
          color="white"
        />
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  );
}
