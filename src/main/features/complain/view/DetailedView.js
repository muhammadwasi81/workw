import React, { useContext } from "react";
import { Drawer } from "antd";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useMediaQuery } from "react-responsive";
import ComplainDetail from "./ComplainDetail";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, complainDictionary } = complainDictionaryList[
    userLanguage
  ];
  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{complainDictionary.complain}</h1>}
      width="768"
      height={"85%"}
      placement={(Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")}
      onClose={props.onClose}
      visible={!!props.id}
      destroyOnClose={true}
      className="drawerSecondary">
      <ComplainDetail  id={props.id}/>
    </Drawer>
  );
}

export default DetailedView;
