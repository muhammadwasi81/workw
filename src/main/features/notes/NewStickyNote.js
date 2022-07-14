// import StickyNoteColorSelector from "./StickyNoteColorSelector";
import { React, useState } from "react";
import Draggable from "react-draggable";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
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
import { useDispatch } from "react-redux";
import {
  closeStickyNote,
  targetTitleVal,
  targetTextVal,
  decrementStickyNote,
  addImage,
  deleteImg,
  boldText,
} from "../../../store/appReducer/newStickySlice";
import StickyNoteColorSelector from "./StickyNoteColorSelector";

const NewStickyNote = (props) => {
  /* const abc = {
    id: Math.random().toFixed(2).toString(),
    title: "Title",
  }; */

  // const closeSticky = useSelector((state) => state.newStickySlice.closeSticky);

  // const open = useSelector((state) => state.newStickySlice.show);
  const { id } = props;

  // Dragging.........

  const [color, setColor] = useState(true);
  let [title, setTitle] = useState(props.titleVal);
  const [set, isSet] = useState(true);

  //const [textAreaValue, setTextAreaValue] = useState(props.textAreaValue);

  const dispatch = useDispatch();

  //const ref = useRef();

  const closeStickyNoteHandler = () => {
    dispatch(closeStickyNote(id));
  };
  const openColorPicker = () => {
    setColor(false);
  };
  const closeColorPicker = () => {
    setColor(true);
  };

  var stickyTitle;
  const getTitleValue = (e) => {
    stickyTitle = e.target.value;
    setTitle(e.target.value);
    dispatch(targetTitleVal({ stickyTitle, id }));
  };

  var stickyText;
  const getTextVal = (e) => {
    stickyText = e.target.value;
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
  console.log(deleteImg());
  const deleteImgHandler = (e) => {
    const source = String(e.target.src);

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

  const boldTextHandler = () => {
    const id = props.id;
    isSet(false);
    dispatch(boldText(id));
  };

  const italicText = () => {};

  const underlineText = () => {};

  const listText = () => {};

  const [cancel, setCancel] = useState(false);

  const XXX = () => {
    setCancel(true);
    console.log(cancel);
  };

  return (
    <Draggable
      defaultPosition={{ x: axis.x_axis, y: axis.y_axis }}
      handle=".handle"
    >
      <div id={props.id} className={style.stickyNoteItem__container}>
        <StickyNoteColorSelector id={props.id} color={color} />
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
          <div
            className={style.stickyNoteItem__icons}
            onClick={openColorPicker}
          >
            <AiOutlineDash />
          </div>

          <div
            className={style.stickyNoteItem__icons}
            onClick={closeStickyNoteHandler}
          >
            <AiOutlineClose />
          </div>
        </div>

        <div className={style.bottom_menu}>
          <div className={style.bottom_menuIcon} onClick={boldTextHandler}>
            <AiOutlineBold />
          </div>
          <div className={style.bottom_menuIcon} onClick={italicText}>
            <AiOutlineItalic />
          </div>
          <div className={style.bottom_menuIcon} onClick={underlineText}>
            <AiOutlineUnderline />
          </div>
          <div className={style.bottom_menuIcon} onClick={listText}>
            <AiOutlineUnorderedList />
          </div>
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
        </div>

        <textarea
          onClick={closeColorPicker}
          onChange={getTextVal}
          className={style.stickyNoteItem__textarea}
          placeholder={props.textAreaPlaceholder}
          value={props.textAreaValue}
        />

        {
          <div
            className={imgSrc < 1 ? style.noHeight : style.image_container}
            style={{ display: "block" }}
          >
            {imgSrc.map((imagegSrc, index) => (
              <div
                className={style.image_section}
                style={{ display: "inline-block", width: "unset" }}
              >
                <div
                  className={style.image_deleteIcon}
                  style={{ display: `${cancel ? "initial" : "none"}` }}
                >
                  <AiTwotoneDelete
                    style={{ margin: "0px auto" /* color: "black" */ }}
                  />
                </div>
                <img
                  key={index}
                  onMouseOver={XXX}
                  onDoubleClick={deleteImgHandler}
                  style={{ height: "40px", width: "auto" }}
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
