import React, { useContext } from "react";
import { Drawer } from "antd";
import { useMediaQuery } from "react-responsive";
import { bonusDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import BonusDetailCard from "./DetailCard";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, bonusDictionary } = bonusDictionaryList[userLanguage];

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{bonusDictionary.bonus}</h1>}
      width="768"
      height={"85%"}
      placement={(Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary">
      <BonusDetailCard id={props.id} />
    </Drawer>
  );
}

export default DetailedView;
