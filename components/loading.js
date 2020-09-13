/**
 * @TODO Resolve styled component #108
 */
import 'styled-components/macro';

import { useEffect, useRef, useState } from 'react';
import { a, useSpring } from '@react-spring/web';
import Logo from './logo';

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function Hero() {
  const [paused, set] = useState(true);

  useEffect(() => {
    set(false);
  }, []);

  const svgIconRef = useRef();

  const { visibility, opacity, ...maskProps } = useSpring({
    pause: paused,
    from: {
      scaleX: 0.001,
      scaleY: 0,
      opacity: 1,
      visibility: 'hidden',
      transformOrigin: 'bottom left',
      scrollTop: 0,
    },
    to: async (animate) => {
      const circles = svgIconRef.current.querySelectorAll('circle');

      circles[0].classList.add('text-c000');

      await wait(800);

      circles[1].classList.add('text-c000');

      await animate({
        to: { scaleY: 1 },
      });

      await animate({
        to: { scaleX: 1 },
      });

      circles[2].classList.add('text-c000');

      await animate({
        to: { transformOrigin: 'bottom right' },
        immediate: true,
      });

      await animate({
        to: { visibility: 'visible' },
      });

      await animate({
        to: { scaleX: 0 },
      });

      circles[3].classList.add('text-c000');

      await wait(800);

      await animate({
        to: { opacity: 0 },
      });
    },
  });

  return (
    <>
      <a.div className="bg-c100 w-screen h-screen fixed z-10 top-0 left-0 pointer-events-none" style={{ opacity }}>
        <div className="outer-container h-screen relative text-c005">
          {/* The dots in the upper left corner of the screen */}
          <div className="header__loading flex justify-between items-center">
            <svg
              ref={svgIconRef}
              width="26"
              height="20"
              viewBox="0 0 26 20"
              className="fill-current text-c100"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="23.5" cy="17.5" r="2.5" />
              <circle cx="8.5" cy="17.5" r="2.5" />
              <circle cx="23.5" cy="2.5" r="2.5" />
              <circle cx="8.5" cy="2.5" r="2.5" />
            </svg>
          </div>

          <style jsx>{`
            .header__loading {
              height: 150px;
            }
          `}</style>

          <div className="absolute bottom-0 left-0 right-0">
            {/* The mask over the Poimander logo */}
            <a.div style={maskProps} className="bg-c000 absolute h-full w-full" />

            <a.div style={{ visibility }} className="text-c005">
              <Logo />
            </a.div>
          </div>
        </div>
      </a.div>
    </>
  );
}

export default Hero;