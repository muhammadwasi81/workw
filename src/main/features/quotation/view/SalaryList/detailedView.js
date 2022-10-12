import React from "react";
import { Drawer } from "antd";
import SalaryDetailCard from "./salaryDetailCard";

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
      <SalaryDetailCard  id={props.id}/>
    </Drawer>
  );
}

export default SalaryDetailedView;
