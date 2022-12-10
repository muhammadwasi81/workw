import React, { useContext } from "react";
import { Drawer } from "antd";
import SalaryDetailCard from "./salaryDetailCard";
import { salaryDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function SalaryDetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { salaryDictionary } = salaryDictionaryList[userLanguage];
  const { salary } = salaryDictionary;
  const isTablet = false;

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{salary}</h1>}
      width="768"
      height={"85%"}
      placement={"right"}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary"
      destroyOnClose={true}
    >
      <SalaryDetailCard id={props.id} />
    </Drawer>
  );
}

export default SalaryDetailedView;
