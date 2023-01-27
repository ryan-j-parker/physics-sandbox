/* eslint-disable react/no-unknown-property */
import {
  Backdrop,
  Float,
  Loader,
  OrbitControls,
  Stage,
  Stars,
} from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  Debug,
  Physics,
  RigidBody,
  usePrismaticJoint,
} from '@react-three/rapier';
import gsap from 'gsap';
import React from 'react';
import { useRef } from 'react';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { ACESFilmicToneMapping, sRGBEncoding } from 'three';
import * as THREE from 'three';

import WasdControls from './WasdControls';
import Marble from './Marble';
const AltTorus = () => {
  const altTorusRef = useRef();
  //   useEffect(() => {
  //     gsap.to(altTorusRef, { duration: 1, drawSVG: 0, delay: 0.5 });
  //   }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(time * -0.5, 0, 0));
    altTorusRef.current.setNextKinematicRotation(rotation);
  });

  return (
    <RigidBody
      colliders="trimesh"
      friction={0}
      restitution={1}
      gravityScale={0}
      type="kinematicPosition"
      position={[0, 0, 0]}
      ref={altTorusRef}
    >
      <mesh>
        <meshLambertMaterial color="cyan" metalness={0.95} roughness={0.2} reflectivity={1} />
        <torusGeometry args={[3, 0.5, 32, 32]} />
      </mesh>
    </RigidBody>
  );
};

const Torus = () => {
  const torusRef = useRef();
  useEffect(() => {
    gsap.to(torusRef, { x: 100, duration: 1 });
  }, []);

  const jump = () => {
    const origin = torusRef.current.translation();
    const mass = torusRef.current.mass();
    origin.y -= 0;
    // const direction = { x: 0, y: -1, z: 0 };
    // const ray = new rapier.Ray(origin, direction);
    // const hit = rapierWorld.castRay(ray, 10, true);

    torusRef.current.applyImpulse({ x: 0, y: mass * 10, z: -6 * mass });
    torusRef.current.applyTorqueImpulse({ x: -1.5, y: 0, z: 0 });
  };

  return (
    <RigidBody
      onClick={jump}
      colliders="trimesh"
      friction={1}
      restitution={1}
      gravityScale={0}
      type="Static"
    >
      <mesh ref={torusRef} castShadow receiveShadow>
        <torusGeometry args={[1, 0.7, 32, 32]} />
        <meshPhysicalMaterial color="cyan" metalness={0.95} roughness={0.2} />
      </mesh>
    </RigidBody>
  );
};

const Pupil = () => {
  const pupil = useRef();
  useEffect(() => {
    gsap.to(pupil, { x: 100, duration: 1 });
  }, []);

  return (
    <RigidBody position={[2, 0, -2]} gravityScale={0} colliders="ball">
      <mesh ref={pupil} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color="black" metalness={0.95} roughness={0.2} />
      </mesh>
    </RigidBody>
  );
};

const GroundPlane = () => {
  const planeRef = useRef();
  console.log(<Backdrop />);
  return (
    <RigidBody
      ref={planeRef}
      colliders="cuboid"
      type="fixed"
      friction={1}
      restitution={1}
      position={[0, -4, 5]}
      //   gravityScale={0}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[10, 0.25, 25]} />
        <meshPhysicalMaterial color="cyan" metalness={0.95} roughness={0.2} />
      </mesh>
    </RigidBody>
  );
};

export function TubeRamp() {
  const tubeRef = useRef();

  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-5, -2, 2),
    new THREE.Vector3(-3, 2, 0),
    new THREE.Vector3(2, 2, 0)
  );

  const geometry = new THREE.TubeGeometry(curve);
  const material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
  });

  return (
    <RigidBody
      ref={tubeRef}
      colliders="trimesh"
      friction={1}
      restitution={1}
      gravityScale={0}
      type="Static"
      rotation={[0.2, -0.5, 0.5]}
      position={[8, 0, 6]}
    >
      <mesh geometry={geometry} material={material} />
    </RigidBody>
  );
}

export function PlaneRamp() {
  const planeRef = useRef();
  return (
    <RigidBody
      ref={planeRef}
      colliders="cuboid"
      type="fixed"
      friction={1}
      restitution={1}
      position={[0, -4, 12]}
      gravityScale={0}
      // rotation={[Math.sin() * 0.5, 0, 0]}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[10, 0.25, 25]} />
        <meshPhysicalMaterial color="cyan" metalness={0.95} roughness={0.2} />
      </mesh>
    </RigidBody>
  );
}

const Box = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 2;
    // console.log(delta);
  });
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default function AltScene() {
  const props = {
    gl: { powerPreference: 'high-performance' },
    camera: { position: [0, 0, 10], near: 0.1, far: 800, fov: 50 },
    onCreated: ({ gl }) => {
      gl.toneMapping = ACESFilmicToneMapping;
      gl.outputEncoding = sRGBEncoding;
      gl.antialias = true;
    },
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Canvas {...props}>
          <Stage
            contactShadow={{ resolution: 1024, scale: 1 }}
            shadows
            environment="city"
            adjustCamera={false}
          >
            <Physics gravity={[0, -9.81, 0]}>
              <Float>
                <Pupil />
              </Float>
              {/* <FlexibleJoint /> */}
              {/* <PlaneRamp /> */}
              {/* <TubeRamp /> */}
              <Marble />
              {/* <Backdrop
                color="#00FFC0"
                opacity={0.5}
                position={[-10, -2, 4]}
                floor={5}
                height={10}
                width={10}
                segments={40}
              /> */}
              {/* <WasdControls /> */}
              {/* <Tube /> */}
              <AltTorus />
              <Box />
              <Torus />
              <GroundPlane />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
              <Debug />
              <ambientLight intensity={1} />
              <spotLight
                position={[0, 3, 0]}
                angle={0.9}
                penumbra={0.3}
                color="#FF2233"
                intensity={14}
              />
              <spotLight
                position={[0, 0, -1]}
                angle={0.9}
                penumbra={0.3}
                color="#FF2233"
                intensity={14}
              />
              <OrbitControls makeDefault />
            </Physics>
          </Stage>
        </Canvas>
      </Suspense>
    </>
  );
}
