import React from "react";
import Draggable from "react-draggable";
import "antd/dist/antd.css";
import { Input, Dropdown, Menu, Space,Col, Row,Typography,Image } from "antd";
import {
    CopyOutlined,
    CloseOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    ShareAltOutlined,
    HighlightOutlined,
    PictureOutlined,
  } from "@ant-design/icons";

import "../../style.css";
   


const { Title } = Typography;

const DetailedStickyNote = () => {
 // ********dropdown menu in three dot*********
 const menu = (
    <Menu
      items={[
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Share
            </a>
          ),
          icon: <ShareAltOutlined />,
          key: "0",
        },
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Copy
            </a>
          ),
          icon: <CopyOutlined />,
          key: "1",
        },
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Color
            </a>
          ),
          icon: <HighlightOutlined />,
          key: "2",
        },
      ]}
    />
  );

    
  return (

    <>
      <Draggable defaultPosition={{ x: 11, y: 456 }}>
        <div className="sticky_container">
          <div className="sticky-header">
            <p>Edit Note</p>
          <div className="leftNote_Icon">
              <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <EllipsisOutlined />
                  </Space>
                </a>
              </Dropdown>
              <DeleteOutlined />
              <CloseOutlined />
            </div>
            </div>

            {/* ********display container content******** */}
            <div className="detailed_container">
           <Title level={5}>How to draw a professional WireFrame?</Title>
           <div className="image_body">
             <Image  preview={false} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt="something.png" className="image"/>
             <Image  preview={false} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt="something.png" className="image"/>
             <Image  preview={false} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt="something.png" className="image"/>
             <Image  preview={false} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt="something.png" className="image"/>
           </div>
           <div className="detailed_content">
            <p className="content">Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap</p>
           </div>
            </div>
        </div>
      </Draggable>
    </>
  );
};
export default DetailedStickyNote;
