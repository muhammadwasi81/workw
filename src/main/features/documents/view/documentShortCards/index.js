import React from "react";
import { useSelector } from "react-redux";
import BreadCumbs from "../components/breadcumb/index.js";
import ShortCard from "../components/shortCard/index.js";
import DocSceleton from "../skeleton/index.js";
import './style.css';

const DocumentShortCards = (props) => {
  const breadCumbsState = useSelector(state => state.documentSlice.breadCumbPath);
  return (
    <>
      {/* <DocSceleton /> */}
    <BreadCumbs
    data={breadCumbsState}
    />
    <div className="d_AllShortCard" >
      {
        props.data.map((item) => (
          <ShortCard data={item} />
        ))
      }
    </div>
    </>
  );
};

export default DocumentShortCards;
