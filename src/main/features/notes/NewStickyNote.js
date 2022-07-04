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

  return (
    <>
      <Draggable defaultPosition={{ x: axis.x_axis, y: axis.y_axis }}>
        <div
          style={{ transform: `translate(${props.x_axis}, ${props.y_axis})` }}
          id={props.id}
          className={style.stickyNoteItem__container}
        >
          <StickyNoteColorSelector id={props.id} color={color} />

          <div
            style={{ backgroundColor: props.titleBg }}
            className={style.stickyNoteItem__item}
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
          <div className={imgSrc < 1 ? style.noHeight : style.image_container}>
            {imgSrc.map((imagegSrc) => (
              <img
                onDoubleClick={deleteImgHandler}
                id={props.id}
                className={style.image_section}
                src={imagegSrc}
                alt=""
              />
            ))}
          </div>

          <textarea
            onClick={closeColorPicker}
            onChange={getTextVal}
            className={style.stickyNoteItem__textarea}
            placeholder={props.textAreaPlaceholder}
            value={props.textAreaValue}
          />

          <div className={style.bottom_menu}>
            <div>
              <AiOutlineShareAlt />
            </div>
            <CopyToClipboard text={props.textAreaValue}>
              <div>
                <AiOutlineCopy />
              </div>
            </CopyToClipboard>
            <div onClick={decrementHandler}>
              <AiTwotoneDelete />
            </div>
            <div className={style.img_input}>
              <input
                placeholder="+"
                type="file"
                accept="image/*"
                size="150"
                onChange={imageHandler}
              />
            </div>
          </div>

          {/* <div style={div}>
            <img
              src={require("./content/halfArrow.ff8f53df.svg").default}
              style={{ height: "17px" }}
              alt=""
            />
          </div> */}
        </div>
      </Draggable>
    </>
  );
};

export default NewStickyNote;
