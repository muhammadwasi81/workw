import React, { useState, } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Typography } from "antd";
import Draggable from "react-draggable";
import { MinusOutlined, CloseOutlined,PlusOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";
import CustomCard from "./CustomCard";
import SearchBox from "./SearchBox";
import "./style.css";

const { Title } = Typography;

const StickyContainer = () => {
  return (
    <>
      <Draggable defaultPosition={{ x: 11, y: 456 }}>
        <div className="sticky_container">
          <div className="sticky-header">
            <div className="left_Icon">
          <PlusOutlined />
          </div>
            <p className="heading">Sticky Notes</p>
           <div className="right_Icons">
            <MinusOutlined/>
            <CloseOutlined />
            </div>
          </div>
          <CustomCard title="sanjna" cardContent="Miletap"/>
        </div>
      </Draggable>
    </>
  );
};
export default StickyContainer;
