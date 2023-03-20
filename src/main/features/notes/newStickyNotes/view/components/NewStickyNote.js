import React, { useEffect, useState, useRef, useContext } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  closeStickyNote,
  targetTitleVal,
  targetStickyDescription,
  addImage,
} from "../../store/stickySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import StickyColor from "./StickyColor";
import {
  deleteStickyAction,
  getStickyNoteTitleAction,
  getStickyNoteDescAction,
  getStickyAttachmentAction,
} from "../../store/actions";
import useDebounce from "../../../../../../utils/Shared/helper/use-debounce";
import { createGuid } from "../../../../../../utils/base";
import ShareComponent from "./ShareComponent";
import { handleOpenSticky } from "../../store/stickySlice";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { stickyNotesDictionaryList } from "../../localization/index";
import { formats, modules } from "../../utils/index";

const NewStickyNote = ({ item }) => {
  const [openColor, setOpenColor] = useState(true);
  const [openShare, setOpenShare] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const tilteDebounce = useDebounce(title, 500);
  const descriptionDebounce = useDebounce(description, 500);

  const dispatch = useDispatch();
  const { openSticky, selectionId } = useSelector((state) => {
    return state.stickySlice;
  });
  const { userLanguage } = useContext(LanguageChangeContext);
  const { stikcyDictionary } = stickyNotesDictionaryList[userLanguage];
  const color = item.colorCode;
  const uploadImageHandler = (e) => {
    const image = e.target.files[0];
    const id = item.id;
    dispatch(
      getStickyAttachmentAction({
        attachments: [{ file: image, id: createGuid() }],
        id,
        description: item.description,
        title: item.title,
        color: item.colorCode,
      })
    );
  };
  const openShareHandler = () => {
    setOpenShare((openShare) => !openShare);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(item.description);
  };
  // ********dropdown menu (color, copy, share) in three dot*********
  const menu = (
    <Menu
      items={[
        {
          label: (
            <div onClick={openShareHandler}>
              <ShareAltOutlined />
              <a className="drop-downList">Share</a>
            </div>
          ),
          key: "0",
        },
        {
          label: (
            <div onClick={copyToClipboard}>
              <CopyOutlined />
              <a className="drop-downList">Copy</a>
            </div>
          ),
          key: "1",
        },

        {
          label: <div>{openColor && <StickyColor item={item} />}</div>,

          // icon: <HighlightOutlined onClick={openColorHandler} />,
          key: "2",
        },
      ]}
    />
  );

  useEffect(() => {
    if (tilteDebounce) setTitleValue(tilteDebounce);
  }, [tilteDebounce]);
  useEffect(() => {
    if (descriptionDebounce) setDescriptionValue(descriptionDebounce);
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
    dispatch(
      getStickyNoteTitleAction({ ...item, attachments: [], title: value })
    );
  };
  const setDescriptionValue = (value) => {
    const id = item.id;
    dispatch(targetStickyDescription({ id, value }));
  };

  // *******modules and formats for React quil******

  const imgSrc = item.attachments;
  // const { height, width } = useWindowDimensions();
  // console.log(width, height, "widthhh");

  const axis = {
    x_axis: Math.floor(Math.random() * (400 - 300)) + 300,
    y_axis: Math.floor(Math.random() * (200 - 500)) + 500,
  };
  const openNewStikcyHandler = () => {
    dispatch(handleOpenSticky(item.id));
  };

  return (
    <>
      <Draggable
        Draggable
        defaultPosition={{ x: axis.x_axis, y: axis.y_axis }}
        handle=".handle"
        // grid={[25, 25]}
        scale={1}
        // bounds="parent"
        // allowAnyClick={true}
      >
        <div
          className="stickyNote_container"
          onClick={openNewStikcyHandler}
          style={{
            position: "absolute",
            zIndex: item.id === openSticky ? 3 : 2,
          }}
        >
          <div
            className="stickyNote_header handle"
            style={{
              backgroundColor: item.colorCode,
            }}
          >
            <input
              placeholder={stikcyDictionary.title}
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={item.title}
              style={{
                backgroundColor: item.colorCode,
                color: `${item.colorCode ? "black" : "white"}`,
              }}
              className="sticky_titleContainer"
            />

            {/* ******Drop Down menu (color, copy, share) on three dot****** */}
            <div className="leftNote_Icon">
              <Dropdown menu={menu} overlay={menu} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <EllipsisOutlined
                      className="threedot_Icon"
                      style={{ color: `${item.colorCode ? "black" : "white"}` }}
                    />
                  </Space>
                </a>
              </Dropdown>
              <DeleteOutlined
                onClick={deleteStickyNotes}
                className="margin_Icon"
                style={{ color: `${item.colorCode ? "black" : "white"}` }}
              />
              <CloseOutlined
                onClick={closeStickyNotes}
                className="margin_Icon"
                style={{ color: `${item.colorCode ? "black" : "white"}` }}
              />
            </div>
          </div>

          {/* *******Insert text area and image********* */}

          {openShare && (
            <ShareComponent
              item={item}
              handleClose={() => setOpenShare(false)}
            />
          )}

          <div className="textArea_container">
            <ReactQuill
              onChange={(value) => setDescription(value)}
              modules={modules}
              formats={formats}
              className={"stickyNoteItem-textarea"}
              placeholder={stikcyDictionary.takeANote}
              defaultValue={item.description}
            />

            <div className="img-input-container">
              <PictureOutlined className="image_icon text-[20px]" />
              <input
                type="file"
                // multiple={true}
                onChange={uploadImageHandler}
                className="img-input"
              />
            </div>
          </div>

          {/* **********Insert images******** */}
          {imgSrc.length > 0 ? (
            <div className="image_body">
              {imgSrc.map((item, index) => {
                return (
                  <Image
                    key={item.id}
                    preview={true}
                    src={item.path}
                    className="image"
                  />
                  // <Attachments
                  //   data={item.path}
                  //   key={{ data: item.path }}
                  //   toShow={1}
                  //   onClick={() => {}}
                  //   size={"50px"}
                  // />
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </Draggable>
    </>
  );
};
export default NewStickyNote;
