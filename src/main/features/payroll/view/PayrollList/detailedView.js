import React from "react";
import { Drawer } from "antd";
import PayrollDetailCard from "./payrollDetailCard";

function PayrollDetailedView(props) {
  const isTablet = false;

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>Payroll</h1>}
      width="768"
      height={"85%"}
      placement={("right")}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary">
      <PayrollDetailCard  id={props.id}/>
    </Drawer>
  );
}

export default PayrollDetailedView;
