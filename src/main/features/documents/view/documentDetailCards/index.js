import React from "react";
import { useSelector } from "react-redux";
import { CardWrapper } from "../../../../layout/GridStyle.js";
import BreadCumbs from "../components/breadcumb/index.js";
import DocFullCard from "../components/fullCard/index.js";
import ShortCard from "../components/shortCard/index.js";
import DocSceleton from "../skeleton/index.js";
import './style.css';

const DocumentDetailCards = (props) => {
  const breadCumbsState = useSelector(state => state.documentSlice.breadCumbPath);
  return (
    <>
      {/* <DocSceleton /> */}
      <CardWrapper>
        <BreadCumbs
          data={breadCumbsState}
        />
        {
          props.data.map((item, index) => (
            <DocFullCard data={item} />
          ))
        }
      </CardWrapper>
    </>
  );
};

export default DocumentDetailCards;