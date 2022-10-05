import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Space, Image } from "antd";
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
import { useDispatch } from "react-redux";
import {
  closeStickyNote,
  targetTitleVal,
  targetStickyDescription,
} from "../../store/stickySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import StickyColor from "./StickyColor";
import {
  deleteStickyAction,
  getStickyNoteTitleAction,
  getStickyNoteDescAction,
} from "../../store/actions";
import useDebounce from "../../../../../../utils/Shared/helper/use-debounce";



const NewStickyNote = ({ item }) => {
  const [openColor, setOpenColor] = useState(true);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const tilteDebounce = useDebounce(title, 500);
  const descriptionDebounce = useDebounce(description, 500);
  const [images, setImage] = useState([]);
  const dispatch = useDispatch();

  const openColorHandler = () => {
    setOpenColor(true);
  };

  const uploadImageHandler = (e) => {
    const image = e.target.files[0];
    console.log(image);
    const url = URL.createObjectURL(image);
    setImage(url);
    // console.log(url);
    // const id = item.id;
    // console.log("ID",id);
    // dispatch(addImage({ url, id }));
    console.log(url, "add images");
    console.log(images, "IMAGE STATE");
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
          label: (
            <div>
              {/* <a style={{ textDecoration: "none", color: "Black" }}>Color</a> */}
              {openColor && <StickyColor item={item} />}
            </div>
          ),

          // icon: <HighlightOutlined onClick={openColorHandler} />,
          key: "2",
        },
      ]}
    />
  );

  useEffect(() => {
    if (tilteDebounce)
      setTitleValue(tilteDebounce)
  }, [tilteDebounce]);
  useEffect(() => {
    if (descriptionDebounce)
      setDescriptionValue(descriptionDebounce)
  }, [descriptionDebounce]);


  // ********sticky note description handler******

  const closeStickyNotes = () => {
    dispatch(closeStickyNote(item.id));
  };

  const deleteStickyNotes = () => {
    dispatch(deleteStickyAction(item.id));
  };

  // ******sticky note title handler******
  const setTitleValue = (value) => {
    const id = item.id;
    dispatch(targetTitleVal({ id, value }));
    dispatch(getStickyNoteTitleAction({ ...item, title: value }));
  };
  const setDescriptionValue = (value) => {
    const id = item.id;
    dispatch(targetStickyDescription({ id, value }));
    dispatch(getStickyNoteDescAction({ ...item, description: value }));
  };


  // *******modules and formats for React quil******
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [],
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
      <Draggable defaultPosition={{ x: 12, y: 450 }} handle=".handle">
        <div
          className="stickyNote_container"
        // style={{ display: !openColor ? "initial" : "none" }}
        >
          <div
            className="stickyNote_header handle"
            style={{ backgroundColor: item.colorCode }}
          >
            <input
              placeholder="Title"
              onChange={(e)=>setTitle(e.target.value)}
              defaultValue={item.title}
              style={{ backgroundColor: item.colorCode }}
              className="sticky_titleContainer"
            />

            {/* ******Drop Down menu (color, copy, share) on three dot****** */}
            <div className="leftNote_Icon">
              <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <EllipsisOutlined className="margin_Icon" />
                  </Space>
                </a>
              </Dropdown>
              <DeleteOutlined onClick={deleteStickyNotes} className="margin_Icon" />
              <CloseOutlined onClick={closeStickyNotes} className="margin_Icon" />
            </div>
          </div>

          {/* *******Insert text area and image********* */}

          <div className="textArea_container">
            <ReactQuill
              onChange={(value)=>setDescription(value)}
              modules={modules}
              formats={formats}
              className={"stickyNoteItem-textarea"}
              placeholder="Take a Note"
              defaultValue={item.description}
            />
            <div className="img-input-container">
              <PictureOutlined className="image_icon" />
              <input
                type="file"
                onChange={uploadImageHandler}
                className="img-input"
              />
            </div>

            {/* **********Insert images******** */}
            {images.length > 0
              ? <div className="image_body">
                {images.map((item) => {
                  <Image
                    preview={false}
                    src={images}
                    alt="something.png"
                    className="image"
                  />;
                })}

              </div> : ""}
          </div>
        </div>
      </Draggable>
    </>
  );
};
export default NewStickyNote;
