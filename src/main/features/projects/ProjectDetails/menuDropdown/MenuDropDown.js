import { Dropdown, Menu, Space } from "antd";
import React, { useState } from "react";
import StickyColor from "./StickyColor";
import { EllipsisOutlined } from "@ant-design/icons";

const MenuDropDown = (changeBgColor) => {
  const [openColor, setOpenColor] = useState(true);

  const menu = (
    <Menu
      items={[
        {
          label: <div>{openColor && <StickyColor />}</div>,
          key: "1",
        },
      ]}
    />
  );
  return (
    <>
      <Dropdown menu={menu} overlay={menu} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <EllipsisOutlined className="threedot_Icon cursor-pointer rounded-sm hover:transition-all" />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};
export default MenuDropDown;
