/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useControls } from 'leva';
import { useState, useEffect, useRef } from 'react';

export default function Marble() {
  const ref = useRef();

  // const color = useControls({ marble: '#9B1D20' });
  // const [clicked, setClicked] = useState();

  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  const jump = () => {
    const origin = ref.current.translation();
    const mass = ref.current.mass();
    origin.y -= 0;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);

    ref.current.applyImpulse({ x: 0, y: mass * 10, z: 0 });
    ref.current.applyTorqueImpulse({ x: 0, y: mass * 2, z: 0.5 });
  };

  return (
    <RigidBody
      ref={ref}
      type="dynamic"
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
        // color={color.marble}
        // wireframe={true}
        />
      </mesh>
    </RigidBody>
  );
}
