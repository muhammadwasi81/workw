import React from "react";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../style.css";
import {} from "antd";
import "antd/dist/antd.css";

const StickyColor = () => {
  const selectColorHandler = () => {};
  const colors = [
    "rgb(208, 235, 253)",
    "rgba(205, 241, 205, 0.77)",
    "rgb(241, 211, 217)",
    "rgb(251, 251, 232)",
    "rgb(241, 241, 241)",
    "rgb(255, 255, 255)",
    "rgb(255, 250, 243)",
  ];

  return (
    <>
      <div
        className="menu__popUp"
        //   style={{ display: !color ? "initial" : "none" }}
      >
        <div className="color___LIST">
          {colors.map((colors) => (
            <div
              key={colors}
              onClick={selectColorHandler}
              style={{ backgroundColor: colors, width: "100%" }}
              value={colors}
            ></div>
          ))}
        </div>
        <div className="note__iconHOVER-dlt">
          <div>
            <DeleteOutlined />
          </div>
          Delete Note
        </div>
        <hr />
        <div className="note__iconHOVER-dlt">
          <div>
            <CloseOutlined />
          </div>
          Close Colors
        </div>
        <hr />
      </div>
    </>
  );
};
export default StickyColor;
