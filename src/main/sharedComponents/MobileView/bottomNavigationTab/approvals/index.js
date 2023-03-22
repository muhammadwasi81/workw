import { Drawer } from "antd";
import React from "react";

const Index = ({ drawerStatus, handleDrawer }) => {
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
    </Drawer>
  );
};

export default Index;
