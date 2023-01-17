import React, { useState } from "react";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle.js";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
import ShortCard from "../components/shortCard/index";
import "./style.css";
import { Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import DetailedFormView from "../DetailedFormView.js";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon/index.js";

const FormShortCard = () => {
  const { forms, loader, formDetail } = useSelector((state) => state.formSlice);
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

  if (forms?.length === 0 && loader) {
    return (
      <div className="d_AllShortCard2">
        {[...Array(15)].map((item) => (
          <Skeleton key={item} />
        ))}
      </div>
    );
  }
  return (
    <>
      {forms?.length > 0 && !loader ? (
        <CardWrapper>
          {forms.map((item, index) => (
            <ShortCard
              item={item}
              id={item.id}
              key={index}
              onListItem={handleDrawerOpen}
              visible={visible}
            />
          ))}
        </CardWrapper>
      ) : (
        !loader && <NoDataFound />
      )}
      {formDetail && (
        <DetailedFormView
          id={id}
          visible={visible}
          onClose={handleDrawerClose}
        />
      )}
    </>
  );
};

export default FormShortCard;
