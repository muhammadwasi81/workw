import React, { useContext } from "react";
import { Drawer } from "antd";
import DetailCard from "../components/detailCard";
import { documentDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];

  const isTablet = false;

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          {documentDictionary.detail}
        </h1>
      }
      width="768"
      height={"85%"}
      placement={"right"}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary"
      destroyOnClose
    >
      <DetailCard id={props.id} />
      {/* <DetailCard id={props.id} /> */}
    </Drawer>
  );
}

export default DetailedView;
