import { Drawer } from "antd";
import React, { useContext } from "react";
import RequestDetailCard from "./requestDetailedCard";
import { requestListDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
const RequestDetailedView = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, requestListDictionary } = requestListDictionaryList[
    userLanguage
  ];
  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          {requestListDictionary.detailedView}
        </h1>
      }
      width="768"
      height={"85%"}
      placement={"right"}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary"
    >
      <RequestDetailCard id={props.id} />
    </Drawer>
  );
};

export default RequestDetailedView;
