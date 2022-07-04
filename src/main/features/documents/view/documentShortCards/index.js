import React from "react";
import ShortCard from "../components/shortCard/index.js";
import DocSceleton from "../skeleton/index.js";
import './style.css';

const DocumentShortCards = () => {
  return (
    <>
      {/* <DocSceleton /> */}
    <div className="d_AllShortCard" >
      {
        (Array(100).fill(1)).map((item) => (
          <ShortCard />
        ))
      }
    </div>
    </>
  );
};

export default DocumentShortCards;
