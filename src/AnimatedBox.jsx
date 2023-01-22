/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

export default function AnimatedBox() {
  const ref = useRef();

  useFrame(() => {
    {
      clicked
        ? (gsap.to(ref.current.scale, { x: 3, y: 3, z: 3, duration: 1.5 }),
        gsap.to(ref.current.rotation, { x: Math.PI * 0.5, duration: 1.5 }))
        : (gsap.to(ref.current.scale, { x: 3, y: 3, z: 3, duration: 1.5 }),
        gsap.to(ref.current.rotation, { x: Math.PI * 2, duration: 1.5 }));
    }
  });

  const [clicked, setClicked] = useState();

  return (
    <mesh
      ref={ref}
      position={[5, 1, 5]}
      onClick={() => {
        setClicked(!clicked);
        console.log(clicked);
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}
