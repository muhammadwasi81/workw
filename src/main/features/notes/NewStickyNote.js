// import StickyNoteColorSelector from "./StickyNoteColorSelector";
import { React, useState } from "react";
import Draggable from "react-draggable";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  AiOutlineBgColors,
  AiOutlineDash,
  AiOutlineShareAlt,
  AiOutlineCopy,
  AiOutlineClose,
  AiTwotoneDelete,
  AiOutlinePicture,
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import style from "./NewStickyNote.module.css";
import "./style.css";
import { useDispatch } from "react-redux";
import {
  closeStickyNote,
  targetTitleVal,
  targetTextVal,
  decrementStickyNote,
  addImage,
  deleteImg,
  openFullImage,
  closeStickyNoteColorPicker,
} from "../../../store/appReducer/newStickySlice";
import StickyNoteColorSelector from "./StickyNoteColorSelector";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewStickyNote = (props) => {
  /* const abc = {
    id: Math.random().toFixed(2).toString(),
    title: "Title",
  }; */

  // const closeSticky = useSelector((state) => state.newStickySlice.closeSticky);

  // const open = useSelector((state) => state.newStickySlice.show);

  const { id } = props;

  // Dragging.........

  // const [color, setColor] = useState(true);
  let [title, setTitle] = useState(props.titleVal);
  const [menuList, setMenuList] = useState(false);

  //const [textAreaValue, setTextAreaValue] = useState(props.textAreaValue);

  const dispatch = useDispatch();

  //const ref = useRef();

  const closeStickyNoteHandler = () => {
    dispatch(closeStickyNote(id));
  };
  const openColorPicker = () => {
    dispatch(closeStickyNoteColorPicker());
    //setColor(false);
  };
  /* const closeColorPicker = () => {
    setColor(true);
  }; */

  var stickyTitle;
  const getTitleValue = (e) => {
    stickyTitle = e.target.value;
    setTitle(e.target.value);
    dispatch(targetTitleVal({ stickyTitle, id }));
  };

  var stickyText;
  const getTextVal = (e) => {
    console.log(e);
    stickyText = e;
    //setTextAreaValue(e.target.value);
    dispatch(targetTextVal({ stickyText, id }));
  };

  props.onGetTitleVal(stickyTitle);
  // const nodeRef = React.useRef(null);

  const axis = {
    x_axis: Math.floor(Math.random() * 40) + 300,
    y_axis: Math.floor(Math.random() * 40) + 150,
  };

  const decrementHandler = () => {
    dispatch(decrementStickyNote(id));
  };

  const imageHandler = (e) => {
    const image = e.target.files[0];
    const abc = URL.createObjectURL(image);
    
    const id = props.id;
    dispatch(addImage({ abc, id }));
  };

  let imgSrc = props.img;

  const deleteImgHandler = (e) => {
    const source = String(e.target.id);
    dispatch(deleteImg({ id, source }));
    // console.log(imgSrc[0]);
    // const source = String(e.target.src);
    // console.log(source);
    // imgSrc = imgSrc.filter((src) => console.log(src !== source));
  };

  //console.log(props.img);

  //const reader = new FileReader();
  //console.log(reader.result);
  /* if (props.img) {
    reader.readAsDataURL(props.img[0]);
  } */

  const openImage = (e) => {
    const src = e.target.src;
    dispatch(openFullImage(src));
  };

  const openMenuList = () => {
    setMenuList(true);
  };

  const closeMenuList = () => {
    setMenuList(false);
  };

  const modules = {
    toolbar: [
      // [{ font: [] }],
      // [{ size: ["small", false, "large", "huge"] }],
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      // [{ script: "sub" }, { script: "super" }],
      //[{ 'indent': '-1'}, { 'indent': '+1' }],
      // [{ direction: "rtl" }],
      // [{ align: ["center"] }],
      // [{ color: ["blue"] }, { background: ["red"] }],
      // ["clean"],
    ],
  };
  const formats = {
    toolbar: [
      [{ font: [] }],
      // [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      //[{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ direction: "rtl" }],
      [{ align: ["center"] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <Draggable
      defaultPosition={{ x: axis.x_axis, y: axis.y_axis }}
      handle=".handle"
    >
      <div id={props.id} className={style.stickyNoteItem__container}>
        <StickyNoteColorSelector id={props.id} /* color={color} */ />
        <div
          style={{ backgroundColor: props.titleBg }}
          className={style.stickyNoteItem__item + " handle"}
        >
          <div className={style.stickyNoteItem__title}>
            <input
              placeholder={props.title}
              value={title}
              onChange={getTitleValue}
            />
          </div>
          <div className={style.stickyNoteItem__icons} onClick={openMenuList}>
            <AiOutlineDash />
          </div>
          <div
            className={style.stickyNoteItem__icons}
            onClick={openColorPicker}
          >
            <AiOutlineBgColors />
          </div>

          <div
            className={style.stickyNoteItem__icons}
            onClick={closeStickyNoteHandler}
          >
            <AiOutlineClose />
          </div>
        </div>

        <div
          style={{ display: `${menuList ? "flex" : "none"}` }}
          className={style.bottom_menu}
        >
          <div className={style.bottom_menuIcon}>
            <AiOutlineShareAlt />
          </div>
          <CopyToClipboard text={props.textAreaValue}>
            <div className={style.bottom_menuIcon}>
              <AiOutlineCopy />
            </div>
          </CopyToClipboard>
          <div onClick={decrementHandler} className={style.bottom_menuIcon}>
            <AiTwotoneDelete />
          </div>
          <div className={style.img_input_section}>
            <AiOutlinePicture />
            <input
              className={style.img_input}
              placeholder="+"
              type="file"
              accept="image/*"
              size="150"
              onChange={imageHandler}
            />
          </div>
          <div onClick={closeMenuList} className={style.bottom_menuIcon}>
            <AiOutlineClose />
          </div>
        </div>

        <ReactQuill
          //style={{ fontWeight: `${styles ? "700" : "unset"}` }}
          // onClick={closeColorPicker}
          onChange={getTextVal}
          modules={modules}
          formats={formats}
          className={style.stickyNoteItem__textarea}
          placeholder={props.textAreaPlaceholder}
          value={props.textAreaValue}
        />

        {
          <div className={style.image_container} style={{ display: "block" }}>
            {imgSrc.map((imagegSrc, index) => (
              <div
                className={style.image_section}
                style={{ display: "inline-block", width: "unset" }}
              >
                <div
                  className={style.image_deleteIcon}
                  onClick={deleteImgHandler}
                >
                  <AiOutlineClose id={imagegSrc} />
                </div>
                <img
                  className={style.image}
                  key={index}
                  onClick={openImage}
                  //onDoubleClick={deleteImgHandler}
                  src={imagegSrc}
                  alt=""
                />
              </div>
            ))}
          </div>
        }

        <br />

        <div
          style={{
            position: "absolute",
            zIndex: "1",
            bottom: "0px",
            right: "0px",
          }}
        >
          <img
            src={require("./content/halfArrow.ff8f53df.svg").default}
            alt=""
          />
        </div>
      </div>
    </Draggable>
  );
};

export default NewStickyNote;
