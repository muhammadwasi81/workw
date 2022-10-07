import React, { useContext } from "react";
import { Drawer } from "antd";
import { useMediaQuery } from "react-responsive";
import { LoanDictionary } from "./localization/index";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import LoanDetail from "./LoanDetail";

const DetailedFormView = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = LoanDictionary[userLanguage];

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{"Loan"}</h1>}
      width="768"
      placement={
        (Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")
      }
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer drawerSecondary"
      style={{
        cursor: "pointer",
      }}
    >
      <LoanDetail id={props.id} />
    </Drawer>
  );
};

export default DetailedFormView;
