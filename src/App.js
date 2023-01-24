/* eslint-disable react/no-unknown-property */
import './App.css';
import Experience from './Experience';
import { Routes, Route } from 'react-router-dom';
import AltScene from './AltScene';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Experience />} />
      <Route path="alt" element={<AltScene />} />
    </Routes>
  );
}

export default App;
