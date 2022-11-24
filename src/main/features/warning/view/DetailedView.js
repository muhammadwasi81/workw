import React, { useContext, useState } from "react";
import { Button, Drawer, Tag, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useDispatch } from "react-redux";
import DetaileCard from "./DetailCard";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction, complainDictionary, warningDictionary } = warningDictionaryList[userLanguage];
  const { warningDetail, loadingData } = useSelector((state) => state.warningSlice);

  const isTablet = useMediaQuery({ maxWidth: 800 });


  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{warningDictionary.reward}</h1>}
      width="768"
      height={"85%"}
      placement={(Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")}
      onClose={props.onClose}
      visible={!!props.id}
      destroyOnClose={true}
      className="drawerSecondary">
      <DetaileCard id={props.id} />
    </Drawer>
  );
}

export default DetailedView;
