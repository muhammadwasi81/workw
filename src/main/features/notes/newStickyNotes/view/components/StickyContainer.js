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
import Nodata from "../../../../../../content/NewContent/eLearning/no_data.svg";

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
import useWindowDimensions from "./useWindowDimensions";

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

  // useEffect(() => {
  //   if (searchDebounce) searchHandler(searchDebounce);
  // }, [searchDebounce]);

  // ********search handler***********
  const searchHandler = (e) => {
    let value = e.target.value;
    if (search == "") {
      return notesList;
    } else {
      dispatch(getAllStickyNotesAction({ search: value }));
    }
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

  //*****window size******
  const { height, width } = useWindowDimensions();
  console.log(width, height, "widthhh");

  const axis = {
    x_axis: Math.floor(Math.random() * 40) + width,
    y_axis: Math.floor(Math.random() * 40) + height,
  };
  // const axis = {
  //   x_axis: width * 50,
  //   y_axis: height,
  // };
  return (
    <>
      <Draggable defaultPosition={{ x: axis.x_axis }} handle=".handle">
        <div className={`sticky_container ${!minimize ? "minimize" : ""}`}>
          <div className="sticky-header handle">
            <div className="left_Icon">
              <PlusOutlined onClick={addStickyHandler} />
            </div>

            <p className="heading">Sticky Notes</p>
            <div className="right_Icons">
              <MinusOutlined onClick={minimizeHandler} />
              <CloseOutlined onClick={closeHandler} className="close_Icon" />
            </div>
          </div>

          {/* <SearchBox /> */}
          <div className={`search_Box ${!minimize ? "hide" : ""}`}>
            <Input
              placeholder="Search"
              // style={{ width: "300px" }}
              onChange={searchHandler}
              prefix={<SearchOutlined />}
            />
          </div>
          <div className={`noteList-container ${!minimize ? "hide" : ""}`}>
            {notesList.length > 0 ? (
              notesList.map((item) => (
                <CustomCard item={item} onDoubleClick={openClickedNote} />
              ))
            ) : (
              <div className="flex items-center justify-center">
                <img src={Nodata} width={200} />
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </>
  );
};
export default StickyContainer;
