import React from "react";
import SclknShortCard from "./shortCard/index.js";
import './style.css';

const DocSceleton = ({ type = "short", isActive = false }) => {
  if (!isActive)
    return <></>

  return (
    <>
      {
        type === "short" ? (Array(100).fill(1)).map((item) => (
          <SclknShortCard />
        )) : ""
      }
    </>
  );
};

export default DocSceleton;
