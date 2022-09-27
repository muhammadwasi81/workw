import React from "react";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle.js";
import ShortCard from "../components/shortCard/index";
import "./style.css";
import { useSelector } from "react-redux";

const FormShortCard = () => {
  const { forms } = useSelector((state) => state.formSlice);
  console.log("formdata in form short card component", forms);
  return (
    <>
      <CardWrapper2>
        {forms.map((item, index) => (
          <ShortCard item={item} id={item.id} key={index} />
        ))}
      </CardWrapper2>
    </>
  );
};

export default FormShortCard;
