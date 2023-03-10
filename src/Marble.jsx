/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Marble() {
  const ref = useRef();

  // const [clicked, setClicked] = useState();

  const jump = () => {
    const origin = ref.current.translation();
    const mass = ref.current.mass();
    origin.y -= 0;
    const direction = { x: 0, y: -1, z: 0 };

    ref.current.applyImpulse({ x: 0, y: mass * 10, z: 0 });
    ref.current.applyTorqueImpulse({ x: 0, y: mass * 2, z: 0.5 });
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(time * -0.5, 0, 0));
    ref.current.setNextKinematicRotation(rotation);
  });

  return (
    <RigidBody
      ref={ref}
      type="kinematic"
      colliders="ball"
      friction={0.2}
      restitution={0.9}
      mass={1}
      gravityScale={1}
      onClick={jump}
      position={[-3, 2, -3]}
    >
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[2, 1]} />
        <meshLambertMaterial
          color={'#4568cd'}
          flatShading={true}
          // wireframe={true}
        />
      </mesh>
    </RigidBody>
  );
}
