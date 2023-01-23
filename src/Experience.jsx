/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { Edges, Stage } from '@react-three/drei';
import { Debug, Physics, RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';
import Cube from './Cube';
import Floor from './Floor';
import AnimatedBox from './AnimatedBox';
import Marble from './Marble';
import Knight from './Knight';

export default function Experience() {
  const ref = useRef();

  return (
    <>
      <ambientLight
        intensity={1}

        // color="red"
      />
      {/* <Stage contactShadow={{ resolution: 1024, scale: 1 }}> */}
      {/* <RigidBody
          type="Static"
          shape={{
            type: 'Cuboid',
            halfExtents: [0.5, 0.5, 0.5],
          }}
          position={[0, 0.5, 0]}
          rotation={[0, 0.5, 0]}
        > */}

      {/* </RigidBody> */}
      <hemisphereLight
        skyColor="purple"
        groundColor="red"
        intensity={5}
        position={[0, 2, 0]}
        width={10}
        height={10}
        lookAt={[0, 0, 0]}
        // castShadow
      />
      <Physics
        gravity={[0, -9.81, 0]}
        // defaultContactMaterial={{
        //   friction: 0.5,
        //   restitution: 0.5,
        // }}
      >
        <Debug />
        <Knight />
        <Marble />
        <Cube />
        <AnimatedBox />
        <Floor />
      </Physics>
      {/* </Stage> */}
    </>
  );
}
