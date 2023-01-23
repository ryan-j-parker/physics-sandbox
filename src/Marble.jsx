/* eslint-disable react/no-unknown-property */
import { RigidBody } from '@react-three/rapier';
import { useControls } from 'leva';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Marble() {
  const ref = useRef();

  const color = useControls({ marble: 'purple' });
  const [clicked, setClicked] = useState();

//   useEffect(() => {
//     {
//       clicked
//         ? ref.applyImpulse([0, 1, 0], [0, 0, 0], true)
//         : ref.applyImpulse([0, 1, 0], [0, 0, 0], true);
//     }
//   });

  return (
    <RigidBody
      type="kinematicPosition"
      colliders="ball"
      friction={0.5}
      restitution={0.5}
      //   rotation={[0, 0.5, 0]}
      mass={4}
      gravityScale={1}
      onClick={() => {
        setClicked(!clicked);
        console.log(clicked);
      }}
    >
      <mesh ref={ref} castShadow receiveShadow position={[0, 5, 0]}>
        <icosahedronGeometry args={[2, 1]} />
        <meshLambertMaterial color={color.marble} wireframe={true} />
      </mesh>
    </RigidBody>
  );
}
