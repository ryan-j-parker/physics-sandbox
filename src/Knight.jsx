/* eslint-disable react/no-unknown-property */
import { useFBX } from '@react-three/drei';
import React from 'react';
import { useRef } from 'react';

export default function Knight() {
  const ref = useRef();
  const knight = useFBX('/FBX-knight/KnightCharacter.fbx');
  const helmet = useFBX('/FBX-knight/Helmet1.fbx');
  const sword = useFBX('/FBX-knight/ShortSword.fbx');
  const shoulderPads = useFBX('/FBX-knight/ShoulderPads.fbx');
  return (
    <mesh ref={ref} scale={0.1}>
      <primitive object={knight} />
      <primitive object={helmet} />
      <primitive object={sword} />
      <primitive object={shoulderPads} />
    </mesh>
  );
}
