import React, { useState } from "react";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle.js";
import ShortCard from "../components/shortCard/index";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import DetailedFormView from "../DetailedFormView.js";

const FormShortCard = () => {
  const { forms } = useSelector((state) => state.formSlice);
  const [id, setId] = useState();
  const [visible, setVisible] = useState(false);

  const handleDrawerClose = () => {
    setVisible(false);
  };

  const handleDrawerOpen = (id) => {
    setVisible(true);
    setId(id);
    console.log("id", id);
  };

  console.log("formdata in form short card component", forms);
  return (
    <>
      <CardWrapper2>
        {forms.map((item, index) => (
          <ShortCard
            item={item}
            id={item.id}
            key={index}
            onListItem={handleDrawerOpen}
            visible={visible}
          />
        ))}
        <DetailedFormView
          id={id}
          visible={visible}
          onClose={handleDrawerClose}
        />
      </CardWrapper2>
    </>
  );
};

export default FormShortCard;
