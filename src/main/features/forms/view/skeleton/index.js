import React from "react";
import SclknShortCard from "./shortCard/index.js";
import './style.css';
import { Skeleton } from 'antd';

const DocSceleton = () => {
  return (
    <div className="d_AllShortCard" >
      {
        (Array(100).fill(1)).map((item) => (
          <SclknShortCard />
          // <Skeleton loading={true} active></Skeleton>
        ))
      }
    </div>
  );
};

export default DocSceleton;
