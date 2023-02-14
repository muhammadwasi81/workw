import React, { useState } from "react";
import { Button, Popover, Drawer } from "antd";
import ContentOptions from "./content";
import { MoreOutlined } from "@ant-design/icons";
import menuIcon from "../../../../content/NewContent/Documents/3dots.svg";
import "./style.css";

const QuickOptions = ({ data, onClick = () => {} }) => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <>
      <div
        // className="docsPopover"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Popover
          content={<ContentOptions handleClose={hide} data={data} />}
          title={null}
          trigger="click"
          placement="rightTop"
          open={open}
          onOpenChange={handleOpenChange}
          overlayClassName="docsPopover"
        >
          <div className="" onClick={onClick}>
            {/* <img src={menuIcon} /> */}
            <MoreOutlined
              className="!text-[22px] cursor-pointer  !text-[#707070] shadow-md shadow-gray-300 "
              width={20}
            />
          </div>
        </Popover>
      </div>
    </>
  );
};
export default QuickOptions;
