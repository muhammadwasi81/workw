import React, { useEffect } from "react";
import init from "./helper";
import "./style.css";

function SoundWaves() {
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
      <div class="line-container1">
        <div class="vertical-line1" />
        <div class="dot1" />
        <div class="dot1" />
      </div>
      <div id="waves"></div>
    </>
  );
}

export default SoundWaves;
