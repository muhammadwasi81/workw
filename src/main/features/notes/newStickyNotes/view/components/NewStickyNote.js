import React from "react";
import { Input, Dropdown, Menu, Space, Col, Row, Image } from "antd";
import "antd/dist/antd.css";
import Draggable from "react-draggable";
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
import { useDispatch, useSelector } from "react-redux";
import { handleChangeNote } from "../../store/stickySlice";

// const axis = {
//   x_axis: String(Math.floor(Math.random() * 40) + 12) + "%",
//   y_axis: String(Math.floor(Math.random() * 40) + 90) + "%",
// };

const { TextArea } = Input;

const NewStickyNote = ({ item }) => {
  const dispatch = useDispatch();

 
  // ********dropdown menu (color, copy, share) in three dot*********
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

  const handleChange = (e) => {
    dispatch(handleChangeNote());
  };

  return (
    <>
      <Draggable defaultPosition={{ x: 12, y: 450 }}>
        <div className="stickyNote_container">
          <div className="stickyNote_header">
            <p>Title</p>
            {/* <Input placeholder="Title" style={{backroundColor:"#0f4c81"}} /> */}

            {/* ******Drop Down menu (color, copy, share) on three dot****** */}
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

          {/* *******Insert text area and image********* */}
          {/* <PictureOutlined className="image_icon" /> */}
          <div className="image_body">
            <Image
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt="something.png"
              className="image"
            />
            <Image
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt="something.png"
              className="image"
            />
            <Image
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt="something.png"
              className="image"
            />
            <Image
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt="something.png"
              className="image"
            />
          </div>
          <div className="textArea_container">
            <TextArea
              placeholder="Take a note"
              autoSize
              defaultValue={item.description}
              onChange={handleChange}
            />
          </div>
        </div>
      </Draggable>
    </>
  );
};
export default NewStickyNote;
