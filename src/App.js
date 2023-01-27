/* eslint-disable react/no-unknown-property */
import './App.css';
import Experience from './Experience';
import { Routes, Route } from 'react-router-dom';
import AltScene from './AltScene';
import { Canvas } from '@react-three/fiber';
import { ACESFilmicToneMapping, sRGBEncoding } from 'three';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei';
import GameRoom from './GameRoom';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Experience />} /> */}
      <Route path="/" element={<AltScene />} />
      <Route path="/game" element={<GameRoom />} />
    </Routes>
  );
}

export default App;
