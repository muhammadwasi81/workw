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
import { handleChangeNote, closeStickyNote, closeStickyNoteColor,addImage, targetTitleVal, targetStickyDescription } from "../../store/stickySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import StickyColor from "./StickyColor";
import { deleteStickyAction, getStickyNoteTitleAction,getStickyNoteDescAction } from "../../store/actions";

// const axis = {
//   x_axis: String(Math.floor(Math.random() * 40) + 12) + "%",
//   y_axis: String(Math.floor(Math.random() * 40) + 90) + "%",
// };

const NewStickyNote = ({ item }) => {
  const [openColor, setOpenColor] = useState(false);
  const [title,setTitle]=useState();
  const [images,setImage]=useState([]);
  const dispatch = useDispatch();

  const openColorHandler = () => {
    setOpenColor(true);
    console.log("open color", openColor);
  };

  const bgColor = useSelector((state) => {
    return state.stickySlice.bgColor;
  });
  // console.log(bgColor,"BG COLOR");


  
  const uploadImageHandler = (e) => {
    const image = e.target.files[0];
    console.log(image);
    const url = URL.createObjectURL(image);
    setImage(url);
    // console.log(url);
    // const id = item.id;
    // console.log("ID",id);
    // dispatch(addImage({ url, id }));
    console.log(url,"add images");
    console.log(images,"IMAGE STATE");
  };

  let imgSrc=item.img;
  console.log("ADD IMAGES",imgSrc);
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
              <a style={{ textDecoration: "none", color: "Black" }}>Color</a>
              <div>{openColor && <StickyColor item={item} />}</div>
            </div>
          ),

          icon: <HighlightOutlined onClick={openColorHandler} />,
          key: "2",
        },
      ]}
    />
  );

  let stickyText;
  const handleChange = (e) => {
    console.log(e);
    stickyText = e;
    console.log("stickyTexr",stickyText);
    const id=item.id
    dispatch(getStickyNoteDescAction({...item, description:stickyText}));
    
  };

  const closeStickyNotes = () => {
    dispatch(closeStickyNote(item.id));
  };

  const deleteStickyNotes = () => {
    dispatch(deleteStickyAction(item.id));
    console.log("deleted", item.id);
  };
let stickyTitle;
  const getTitleValue=(e)=>{
    stickyTitle = e.target.value;
    setTitle(e.target.value);
    // const id=item.id;
    dispatch(getStickyNoteTitleAction({ ...item,title:stickyTitle })); 
   console.log("TITLEE",item.title);
  }

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
      <Draggable defaultPosition={{ x: 12, y: 450 }}>
        <div
          className="stickyNote_container"
          // style={{ display: !openColor ? "initial" : "none" }}
        >
          <div
            className="stickyNote_header"
            style={{ backgroundColor: item.colorCode }}
          >
            <input
              placeholder="Title"
              onChange={getTitleValue}
              defaultValue={item.title}
              style={{ backgroundColor: item.colorCode }}
              className="sticky_titleContainer"
            />
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

          <div className="textArea_container">
            <ReactQuill
              onChange={handleChange}
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
          </div>

          {/* **********Insert images******** */}
          <div className="image_body">
            {images.map((item)=>{
            <Image
              preview={false}
              src={images}
              alt="something.png"
              className="image"
            />
          })}
          </div>
        </div>
      </Draggable>
    </>
  );
};
export default NewStickyNote;
