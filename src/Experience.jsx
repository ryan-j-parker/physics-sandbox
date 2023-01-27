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
import { Suspense } from 'react';
import { Loader, OrbitControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ACESFilmicToneMapping, sRGBEncoding } from 'three';

export default function Experience() {
  const ref = useRef();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 400,
            position: [0, 10, 40],
          }}
          gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            outputEncoding: sRGBEncoding,
          }}
        >
          <Stage>
            <Physics gravity={[0, -9.81, 0]}>
              <OrbitControls makeDefault dampingFactor={0.3} />
              {/* <Sky /> */}
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

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
              {/* <hemisphereLight
        skyColor="purple"
        groundColor="red"
        intensity={5}
        position={[0, 2, 0]}
        width={10}
        height={10}
        lookAt={[0, 0, 0]}
        // castShadow
      /> */}
              <Debug />
              {/* <Knight /> */}
              <Marble />
              <Cube />
              <AnimatedBox />
              <Floor />
            </Physics>
          </Stage>
        </Canvas>
      </Suspense>
    </>
  );
}
