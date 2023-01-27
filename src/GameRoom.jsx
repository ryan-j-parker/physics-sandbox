/* eslint-disable react/no-unknown-property */
import { Center, Float, Html, Loader, OrbitControls, Text3D } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React from 'react';
import { Suspense } from 'react';
import { useState } from 'react';
import { sRGBEncoding } from 'three';
import { ACESFilmicToneMapping } from 'three';
import { PCFSoftShadowMap } from 'three';
import Floor from './Floor';
import Marble from './Marble';

export default function GameRoom() {
  const [name, setName] = useState();

  return (
    <Suspense fallback={<Loader />}>
      <Canvas
        shadowMap
        colorManagement
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 8, 6],
        }}
        gl={{
          // shadowMap.enabled: true;
          // shadowMap.type: PCFSoftShadowMap;
          toneMapping: ACESFilmicToneMapping,
          outputEncoding: sRGBEncoding,
          antialias: true,
        }}
      >
        <Physics gravity={[0, -9.81, 0]}>
          <OrbitControls />
          <ambientLight intensity={1} />
          <spotLight
            position={[0, 2, 0]}
            //   angle={3.14 / 2}
            //   penumbra={0.3}
            color="#FF2233"
            intensity={14}
            castShadow
          />
          <Float
            floatIntensity={0.25}
            floatSpeed={0.25}
            floatFrequency={0.25}
            floatDamping={5}
            rotationIntensity={0.5}
            rotationSpeed={2}
            rotationFrequency={0.5}
            rotationDamping={0.5}
          >
            <Text3D
              position={[-4.5, 1, 0]}
              color="white"
              size={3}
              maxWidth={4}
              lineHeight={1}
              letterSpacing={0.05}
              textAlign="center"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Righteous_Regular.json"
            >
              Play
            </Text3D>
            {/* <Center> */}
            <Html
              position={[0, 0, 5]}
              transform
              occlude
              style={{
                color: 'white',
                background: 'black',
                borderRadius: '0.25rem',
              }}
            >
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: 2,
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
              >
                Welcome to the game.
              </h1>
              <p
                align="center"
                style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginTop: 2,
                  marginBottom: 2,
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
              >
                Enter your name:
              </p>
              <div
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <input
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginTop: 1,
                    marginBottom: 2,
                    paddingLeft: 4,
                    paddingRight: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '50%',
                  }}
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Arnold Blueberry"
                />
                <button
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginTop: 3,
                    marginBottom: 2,
                    paddingLeft: 4,
                    paddingRight: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '20%',
                  }}
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setName(name);
                    console.log('You are playing as: ', name);
                  }}
                >
                  submit
                </button>
              </div>
            </Html>
            {/* </Center> */}
          </Float>
          <Marble />
          <Floor />
        </Physics>
      </Canvas>
    </Suspense>
  );
}
