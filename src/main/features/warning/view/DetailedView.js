import React, { useEffect, useContext, useState } from "react";
import { Button, Drawer, Tag, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { cancelWarning} from "../store/actions";
import { useDispatch } from "react-redux";
import DetailCard from "./DetailCard";

function DetailedView(props) {
  const dispatch = useDispatch();

  const { userLanguage } = useContext(LanguageChangeContext);
 const { sharedLabels, Direction, complainDictionary, warningDictionary } = warningDictionaryList[userLanguage];
  const { user } = useSelector(state => state.userSlice);

  let userId = user.id

  const isTablet = useMediaQuery({ maxWidth: 800 });

  const handleCancel = (e, payload) => {
    e.preventDefault()
    e.stopPropagation();
    dispatch(cancelWarning(payload));
}


  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{warningDictionary.warning}</h1>}
      width="768"
      placement={(Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")}
      onClose={props.onClose}
      visible={props.visible}
      destroyOnClose={true}
      className="detailedViewComposer drawerSecondary">

     <DetailCard id={props.id} handleCancel={handleCancel} />
    </Drawer >
  );
}

export default DetailedView;
