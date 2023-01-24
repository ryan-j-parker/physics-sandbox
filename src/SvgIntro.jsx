import gsap from 'gsap';
import { useRef, useEffect } from 'react';

// the VAST majority of the following code is courtesy of Derek Nguyen (d4rekanguok) on CodeSandbox
//      https://codesandbox.io/s/svg-xray-text-cjy50?from-embed=&file=/src/app.module.css:0-678
// which was found through a fantastic article he wrote called "How to use SVGs in React" for Sanity.io
//      https://www.sanity.io/guides/import-svg-files-in-react
// The sandbox Derek created shows how to use SVGs in React, and I've made some modifications to it to
//      make it work with GSAP and to make it more reusable. I've also added some comments to explain.

/**
 *
 * @param {SVGRect} svgViewBox
 * @param {DOMRect} svgDimension
 * @returns {(a: number, b: number) => [x: number, y: number]}
 */
const createTranslator = (svgViewBox, svgDimension) => (a, b) => {
  if (!svgViewBox || !svgDimension) {
    console.warn('No dimension provided.');
    return [a, b];
  }
  const { width: viewBoxWidth, height: viewBoxHeight } = svgViewBox;
  const { top, left, width: svgWidth, height: svgHeight } = svgDimension;

  const x = ((a - left) * viewBoxWidth) / svgWidth;
  const y = ((b - top) * viewBoxHeight) / svgHeight;

  return [x, y];
};

/**
 * @param {HTMLElement} $el
 * @param {number} x
 * @param {number} y
 */
const followCursor = ($el, x, y) => {
  $el.setAttribute('cx', x);
  $el.setAttribute('cy', y);
};

export const SvgIntro = () => {
  const combinedRefs = useRef({
    $container: null,
    $innerDot: null,
    $outerDot: null,
  });

  const ref = useRef();

  useEffect(() => {
    const { $container, $innerDot, $outerDot } = combinedRefs.current;
    if (!$container || !$innerDot || !$outerDot) {
      return;
    }

    let translateCoords = (...args) => args;

    /* debounce this in a real app */
    const getDimensions = () => {
      const svgDimension = $container.getBoundingClientRect();
      const svgViewBox = $container.viewBox.baseVal;
      translateCoords = createTranslator(svgViewBox, svgDimension);
    };

    getDimensions();

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const [x, y] = translateCoords(clientX, clientY);
      followCursor($innerDot, x, y);
      followCursor($outerDot, x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', getDimensions);
    window.addEventListener('scroll', getDimensions);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', getDimensions);
      window.removeEventListener('scroll', getDimensions);
    };
  });

  // gsap tween to fade in the text
  useEffect(() => {
    gsap.to(ref.current, {
      duration: 1,
      opacity: 1,
      ease: 'power2.inOut',
      delay: 0.5,
    });
  });

  return (
    <svg
      ref={($el) => (combinedRefs.current.$container = $el)}
      className="svg"
      viewBox="0 0 600 337"
    >
      <defs>
        <linearGradient id="gradient" x1="60%" y1="10%" x2="30%" y2="100%">
          <stop offset="0%" stopColor="plum">
            <animate
              attributeName="stop-color"
              values="plum; violet; plum"
              dur="3s"
              repeatCount="indefinite"
            ></animate>
          </stop>

          <stop offset="100%" stopColor="cyan">
            <animate
              attributeName="stop-color"
              values="mediumpurple; mediumorchid; mediumpurple"
              dur="3s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>

        <linearGradient id="gradient2" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="turquoise"></stop>
          <stop offset="100%" stopColor="deepskyblue"></stop>
        </linearGradient>

        {/* the ref here is linked to the gsap animation above */}
        <clipPath id="clip-text" ref={ref}>
          <text id="text" x="20" y="1.25em">
            <tspan>Ryan J. Parker</tspan>
            <tspan id="dev" x="25" dy="1.5em">
              software developer
            </tspan>
          </text>
          <text id="looking" x="210" dy="3.65em">
            enter
          </text>
        </clipPath>
      </defs>

      <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>

      {/* outer dot of the spotlight circle - controls "beam"  */}
      <circle
        className="dot"
        ref={($el) => (combinedRefs.current.$outerDot = $el)}
        r="62"
        fill="cyan"
      ></circle>
      <use href="#text" stroke="url(#gradient)" strokeWidth="1.8" fill="none" />

      {/* inner dot of the spotlight circle - circles are z-indexed behind the text  */}
      <g clipPath="url(#clip-text)">
        <circle
          className="dot"
          ref={($el) => (combinedRefs.current.$innerDot = $el)}
          r="80"
          fill="url(#gradient2)"
        ></circle>
      </g>
    </svg>
  );
};
