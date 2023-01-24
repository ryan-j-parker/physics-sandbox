import gsap from 'gsap';
import React from 'react';
import { useEffect } from 'react';
import { SvgIntro } from './SvgIntro';

export const SimpleLoadingIcon = ({ color = 'currentColor', thickness = 2 }) => (
  <svg className="svg" viewBox="0 0 24 24" xmlns="<http://www.w3.org/2000/svg>">
    <circle
      className="path"
      cx="12"
      cy="12"
      r="8"
      strokeLinecap="round"
      strokeWidth={thickness}
      stroke={color}
      fill="none"
    />
  </svg>
);


const AnimatedSvg = () => {
  return (
    <>
      <svg viewBox="0 0 24 24" xmlns="<http://www.w3.org/2000/svg>">
        <circle cx="12" cy="12" r="8" strokeWidth="4" stroke="tomato" fill="none" />
      </svg>
    </>
  );
};

const Graphic = () => {
  return (
    <svg viewBox="0 0 600 337">
      <defs>
        <linearGradient id="gradient">Ryan J. Parker <br /> Software Developer </linearGradient>
      </defs>

      <text x="20" y="1.25em">
        <tspan>Using SVGs</tspan>
        <tspan x="20" dy="1em">
          in React
        </tspan>
      </text>
    </svg>
  );
};


export default function AltScene() {
  useEffect(() => {
    gsap.to('.animated', { x: 100, duration: 1 });
    gsap.to('.animated-svg', { duration: 1, drawSVG: 0, delay: 0.5 });
  }, []);

  return (
    <>
      {/* <div className="animated">
        CSS <br /> IS AWESOME
      </div> */}
      {/* <Graphic /> */}
      {/* <img src="/r-stroke-svg.svg" alt="Ryan" className="animated-svg" /> */}
      {/* <AnimatedSvg className="animated-svg" /> */}
      {/* <SimpleLoadingIcon /> */}
      <SvgIntro />
    </>
  );
}
