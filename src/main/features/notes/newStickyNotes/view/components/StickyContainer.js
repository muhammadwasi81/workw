import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import Draggable from "react-draggable";
import {
  MinusOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import CustomCard from "./CustomCard";
import "../../style.css";
// *******import redux*******
import { useSelector, useDispatch } from "react-redux";
import {
  closeSticky,
  showStickyNote,
} from "../../store/stickySlice";
// import sticky note actions
import { addSticky, getAllStickyNotesAction,searchTitleDescAction } from "../../store/actions";


const StickyContainer = () => {
  // *********state for sticky notes*******
  const [minimize, setMinimize] = useState(true);

  const dispatch = useDispatch();

  // ****get redux data for sticky notes*****
  const notesList = useSelector((state) => {
    return state.stickySlice.listArray;
  });
  // console.log("stikcy note data", sticky_note);

  useEffect(() => {
    dispatch(getAllStickyNotesAction({}));
  }, []);

  // ********search handler***********
  const searchHandler = (e) => {
    const searchValue = e.target.value;
    dispatch(getAllStickyNotesAction({search:searchValue}));
  };

  
//*****add sticky notes in sticky container*****
  const addStickyHandler = () => {
    console.log("Calling");
    dispatch(addSticky({}));
  };

  // ********minimize handler for sticky container********
  const minimizeHandler = () => {
    setMinimize(!minimize);
    // console.log(minimize);
  };

  // *****close Sticky handler*****
  const closeHandler = () => {
    dispatch(closeSticky());
  };

  // *******open clicked sticky note********
  const openClickedNote = (note) => {
    dispatch(showStickyNote(note.id));
  };
  // console.log(notesList)
  return (
    <>
      <Draggable defaultPosition={{ x: 11, y: 456 }}>
        <div className={`sticky_container ${!minimize ? "minimize" : ""}`}>
          <div className="sticky-header">
            <div className="left_Icon">
              <PlusOutlined onClick={addStickyHandler} />
            </div>

            <p className="heading">Sticky Notes</p>
            <div className="right_Icons">
              <MinusOutlined onClick={minimizeHandler} />
              <CloseOutlined onClick={closeHandler} className="margin_Icon"/>
            </div>
          </div>

          {/* <SearchBox /> */}
          <div className={`search_Box ${!minimize ? "hide" : ""}`}>
            <Input
              placeholder="Search"
              style={{ width: "300px" }}
              onChange={searchHandler}
              prefix={<SearchOutlined />}
            />
          </div>
          <div className={`noteList-container ${!minimize ? "hide" : ""}`}>
            {notesList.length >0
              ? notesList.map((item) => (
                <CustomCard item={item} onDoubleClick={openClickedNote} />
                ))
              : <div><h2>No Notes Found!</h2></div>}
          </div>
        </div>
      </Draggable>
    </>
  );
};
export default StickyContainer;
