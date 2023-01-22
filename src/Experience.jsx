/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { Edges, Stage } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';
import Cube from './Cube';
import Floor from './Floor';
import AnimatedBox from './AnimatedBox';

export default function Experience() {
  const ref = useRef();

  return (
    <>
      <ambientLight
        intensity={1}

        // color="red"
      />
      <Stage contactShadow={{ resolution: 1024, scale: 1 }}>
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
        <Cube />
        <AnimatedBox />
        <Floor />
      </Stage>
    </>
  );
}
