import { Drawer } from "antd";
import React, { useContext } from "react";
import AssetsDetailCard from "./assetsDetailedCard";
import { assetsDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const AssetsDetailedView = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { assetsDictionary, Direction } = assetsDictionaryList[userLanguage];
  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          {assetsDictionary.assests}
        </h1>
      }
      width="768"
      height={"85%"}
      placement={"right"}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary"
    >
      <AssetsDetailCard id={props.id} />
    </Drawer>
  );
};

export default AssetsDetailedView;
