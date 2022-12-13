import React, { useContext } from "react";
import { Drawer } from "antd";
import PayrollDetailCard from "./payrollDetailCard";
import { payrollDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function PayrollDetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { payrollDictionary, Direction } = payrollDictionaryList[userLanguage];
  const isTablet = false;

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          {payrollDictionary.payroll}
        </h1>
      }
      width="768"
      height={"85%"}
      placement={"right"}
      onClose={props.onClose}
      visible={props.visible}
      className="drawerSecondary"
      destroyOnClose={true}
    >
      <PayrollDetailCard id={props.id} />
    </Drawer>
  );
}

export default PayrollDetailedView;
