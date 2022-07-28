import React from "react";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle.js";
import ShortCard from "../components/shortCard/index";
import './style.css';

const FormShortCard = () => {
  return (
    <>
      {/* <DocSceleton /> */}
      <CardWrapper2>
        {(Array(100).fill(1)).map((item, index) => (
          <ShortCard />
        )
      )}
      </CardWrapper2>
    </>
  );
};

export default FormShortCard;