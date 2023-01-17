import React, { useEffect } from 'react';
import init from './helper';
import './style.css';

function SoundWaves() {
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="line-container1">
        <div className="vertical-line1" />
        <div className="dot1" />
        <div className="dot1" />
      </div>
      <div id="waves"></div>
    </>
  );
}

export default SoundWaves;
