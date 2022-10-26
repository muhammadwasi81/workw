import React from "react";
import { Drawer } from "antd";
import QuotationDetailCard from "./quotationDetailCard";

function SalaryDetailedView(props) {
  const isTablet = false;

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>Salary</h1>}
      width="768"
      height={"85%"}
      placement={("right")}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary">
      <QuotationDetailCard  id={props.id}/>
    </Drawer>
  );
}

export default SalaryDetailedView;
