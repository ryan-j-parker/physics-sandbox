/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import { Edges } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export default function AnimatedBox() {
  const ref = useRef();
  const [clicked, setClicked] = useState();

  useFrame(() => {
    {
      clicked
        ? (gsap.to(ref.current.scale, { x: 3, y: 3, z: 3, duration: 1.5 }),
        gsap.to(ref.current.rotation, { x: Math.PI * 0.5, y: Math.PI * 2, duration: 1.5 }))
        : (gsap.to(ref.current.scale, { x: 3, y: 3, z: 3, duration: 1.5 }),
        gsap.to(ref.current.rotation, { x: Math.PI * 2, y: Math.PI * 0.5, duration: 1.5 }));
    }
  });

  const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
  console.log('clicked', clicked);

  return (
    <RigidBody mass={4} gravityScale={1} colliders="cuboid" position={[4, 3, 4]}>
      <mesh
        ref={ref}
        onClick={() => {
          setClicked(!clicked);
          console.log(clicked);
        }}
      >
        <Edges
          scale={1.1}
          threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
          color="white"
        />
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={clicked ? color : color} />
      </mesh>
    </RigidBody>
  );
}
