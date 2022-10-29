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
import { closeSticky, showStickyNote } from "../../store/stickySlice";
// import sticky note actions
import {
  addSticky,
  getAllStickyNotesAction,
  searchTitleDescAction,
} from "../../store/actions";
import useDebounce from "../../../../../../utils/Shared/helper/use-debounce";

const StickyContainer = () => {
  // *********state for sticky notes*******
  const [minimize, setMinimize] = useState(true);
  const [search, setSearch] = useState(null);
  const searchDebounce = useDebounce(search, 500);

  const dispatch = useDispatch();

  // ****get redux data for sticky notes*****
  const notesList = useSelector((state) => {
    return state.stickySlice.listArray;
  });
  // console.log("stikcy note data", sticky_note);

  useEffect(() => {
    dispatch(getAllStickyNotesAction({}));
  }, []);

  useEffect(() => {
    if (searchDebounce) searchHandler(searchDebounce);
  }, [searchDebounce]);

  // ********search handler***********
  const searchHandler = (value) => {
    dispatch(getAllStickyNotesAction({ search: value }));
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
  const axis = {
    x_axis: Math.floor(Math.random() * 40) + 250,
    y_axis: Math.floor(Math.random() * 40) + 155,
  };
  return (
    <>
      <Draggable
        defaultPosition={{ x: axis.x_axis, y: axis.y_axis }}
        handle=".handle"
      >
        <div className={`sticky_container ${!minimize ? "minimize" : ""}`}>
          <div className="sticky-header">
            <div className="left_Icon">
              <PlusOutlined onClick={addStickyHandler} />
            </div>

            <p className="heading">Sticky Notes</p>
            <div className="right_Icons">
              <MinusOutlined onClick={minimizeHandler} />
              <CloseOutlined onClick={closeHandler} className="margin_Icon" />
            </div>
          </div>

          {/* <SearchBox /> */}
          <div className={`search_Box ${!minimize ? "hide" : ""}`}>
            <Input
              placeholder="Search"
              // style={{ width: "300px" }}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </div>
          <div className={`noteList-container ${!minimize ? "hide" : ""}`}>
            {notesList.length > 0 ? (
              notesList.map((item) => (
                <CustomCard item={item} onDoubleClick={openClickedNote} />
              ))
            ) : (
              <div>
                <h2>No Notes Found!</h2>
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </>
  );
};
export default StickyContainer;
