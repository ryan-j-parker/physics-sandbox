import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';

export default function Fort(props) {
  const ref = useRef();
  const { nodes, materials } = useGLTF('/modular_fort/modular_fort_01_2k.gltf');

  return <mesh></mesh>;
}
