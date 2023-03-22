import React, { useState } from "react";
import { Button, Popover } from "antd";
import ContentOptions from "./content";
import menuIcon from "../../../../../../content/NewContent/Documents/3dots.svg";
import "./style.css";

const QuickOptions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <div className="docsPopover">
      <Popover
        content={<ContentOptions handleClose={hide} data={data} />}
        title={null}
        trigger="click"
        placement="rightTop"
        open={open}
        onOpenChange={handleOpenChange}
        overlayClassName="docsPopover"
      >
        <div className="menuIcon">
          <img src={menuIcon} />
        </div>
      </Popover>
    </div>
  );
};
export default QuickOptions;
