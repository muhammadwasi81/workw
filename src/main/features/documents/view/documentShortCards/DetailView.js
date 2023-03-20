import { Drawer } from "antd";
import React from "react";
import DetailCard from "./DetailCard";

function DetailView(props) {
  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>Document Information</h1>
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
    </Drawer>
  );
}
export default DetailView;
