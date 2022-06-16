import { Button, Typography } from "antd";
import React, { Fragment } from "react";
import { MoreOutlined } from "@ant-design/icons";
const { Title } = Typography;

function RemarksDisplay() {
  return (
    <Fragment>
      <div className="remarks-display">
        <div className="remarks-header">
          <div className="remarks-header-left">
            <span className="user-name">kami</span>
            <span className="designation">
              ui/ux .<span className="remark-time">1hr ago </span>
            </span>
          </div>
          <div className="remarks-header-right">
            <MoreOutlined />
          </div>
        </div>

        <p className="remarks-content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          hic, nisi magnam impedit autem accusamus maxime libero odio
          reprehenderit vero iste nesciunt fuga perferendis nobis sed magni quis
          nam saepe.
        </p>
      </div>
      <div className="remarks-button">
        <Typography style={{ marginRight: "10px", fontWeight: "bold" }}>
          In process
        </Typography>
        <Typography style={{ fontSize: "10px", paddingTop: "4px" }}>
          Thu, Sep 16, 2021, 12:37 PM
        </Typography>
      </div>
    </Fragment>
  );
}

export default RemarksDisplay;
