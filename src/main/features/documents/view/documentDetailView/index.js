import React, { useContext } from "react";
import { Drawer } from "antd";
import DetailCard from "../components/detailCard";

function DetailedView(props) {

  const isTablet = false;

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{"Detail"}</h1>}
      width="768"
      height={"85%"}
      placement={"right"}
      onClose={props.onClose}
      visible={!!props.id}
      className="drawerSecondary"
      destroyOnClose
      >
      <DetailCard id={props.id}/>
      {/* <DetailCard id={props.id} /> */}
    </Drawer>
  );
}

export default DetailedView;
