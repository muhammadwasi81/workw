import React from "react";
import { CardWrapper } from "../../../../layout/GridStyle.js";
import DocFullCard from "../components/fullCard/index.js";
import './style.css';

const DocumentDetailCards = () => {
  return (
    <>
      {/* <DocSceleton /> */}
      <CardWrapper>
        {(Array(100).fill(1)).map((item, index) => (
          <DocFullCard />
        )
      )}
      </CardWrapper>
    </>
  );
};

export default DocumentDetailCards;