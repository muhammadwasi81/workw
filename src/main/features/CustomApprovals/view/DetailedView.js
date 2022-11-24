import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image,Skeleton } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import DetailCard from "./DetailCard";

function DetailedView(props) {

  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[
    userLanguage
  ];
  const isTablet = useMediaQuery({ maxWidth: 800 });

  const handleCancel = (e, payload) => {
    e.preventDefault();
    e.stopPropagation();
  };


  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>{"Custom Approval"}</h1>
      }
      width="768"
      placement={
        (Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")
      }
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer drawerSecondary"
      destroyOnClose={true}
    >
      <DetailCard id={props.id} handleCancel={handleCancel} />
    </Drawer>
  );
}

export default DetailedView;
