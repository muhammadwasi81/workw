import React from "react";
import SclknShortCard from "./shortCard/index.js";
import './style.css';

const DocSceleton = () => {
  return (
    <div className="d_AllShortCard" >
      {
        (Array(100).fill(1)).map((item) => (
          <SclknShortCard />
        ))
      }
    </div>
  );
};

export default DocSceleton;
