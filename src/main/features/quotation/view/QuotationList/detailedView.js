import React, { useContext } from "react";
import { Drawer } from "antd";
import QuotationDetailCard from "./quotationDetailCard";
import { quotationDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function SalaryDetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { quotationDictionary, Direction } = quotationDictionaryList[
    userLanguage
  ];
  const isTablet = false;

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          {quotationDictionary.quotationDetail}
        </h1>
      }
      width="768"
      height={"85%"}
      placement={"right"}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary"
    >
      <QuotationDetailCard id={props.id} />
    </Drawer>
  );
}

export default SalaryDetailedView;
