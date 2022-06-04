import { Drawer } from "antd";
import React from "react";
import Approvals from "../../../Nav/approvals";

const Index = ({ drawerStatus, handleDrawer }) => {
  // console.log(drawerStatus, "drawerStatus");
  return (
    <Drawer
      placement={"bottom"}
      size={"large"}
      onClose={() => handleDrawer(false)}
      visible={drawerStatus}
      maskClosable={true}
      bodyStyle={{ padding: "10px" }}
      closable={false}
      contentWrapperStyle={{ height: "600px" }}>
      <Approvals />
    </Drawer>
  );
};

export default Index;
