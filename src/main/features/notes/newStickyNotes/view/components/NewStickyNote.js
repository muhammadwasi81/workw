import React, { useState } from "react";
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
import {
  handleChangeNote,
  closeStickyNote,
  deleteStickyNote,
  openColorPicker,
} from "../../store/stickySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import StickyColor from "./StickyColor";

// const axis = {
//   x_axis: String(Math.floor(Math.random() * 40) + 12) + "%",
//   y_axis: String(Math.floor(Math.random() * 40) + 90) + "%",
// };

const NewStickyNote = ({ item }) => {
  const [openColor, setOpenColor] = useState(false);
  const dispatch = useDispatch();

  const openColorHandler = () => {
    setOpenColor(true);
    console.log(openColor);
    // dispatch(openColorPicker());
  };

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
          label: <a onClick={openColorHandler} >Color</a>,

          icon: [<HighlightOutlined onClick={openColorHandler} />],
          key: "2",
        },
      ]}
    />
  );

  const handleChange = (e) => {
    dispatch(handleChangeNote());
  };

  const closeStickyNotes = () => {
    dispatch(closeStickyNote(item.id));
  };

  const deleteStickyNotes = () => {
    dispatch(deleteStickyNote(item.id));
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const formats = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ direction: "rtl" }],
      [{ align: ["center"] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <>
      <Draggable defaultPosition={{ x: 12, y: 450 }}>
        <div
          className="stickyNote_container"
          // style={{ display: !openColor ? "initial" : "none" }}
        >
          <div className="stickyNote_header">
          {openColor && <StickyColor id={item.id} />}
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
              <DeleteOutlined onClick={deleteStickyNotes} />
              <CloseOutlined onClick={closeStickyNotes} />
            </div>
          </div>

          {/* *******Insert text area and image********* */}
          {/* <PictureOutlined className="image_icon" /> */}

          <div className="textArea_container">
            <ReactQuill
              onChange={handleChange}
              modules={modules}
              formats={formats}
              className={"stickyNoteItem-textarea"}
              placeholder="Take a Note"
              value={item.description}
            />
          </div>

          {/* **********Insert images******** */}
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
        </div>
      </Draggable>
    </>
  );
};
export default NewStickyNote;
