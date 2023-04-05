import React, { useState, useEffect, useContext } from "react";
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
import Nodata from "../../../../../../content/NewContent/eLearning/Nodata.svg";

// *******import redux*******
import { useSelector, useDispatch } from "react-redux";
import { closeSticky, showStickyNote } from "../../store/stickySlice";
// import sticky note actions
import {
  addSticky,
  getAllStickyNotesAction,
  searchTitleDescAction,
} from "../../store/actions";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { stickyNotesDictionaryList } from "../../localization/index";

const StickyContainer = () => {
  // *********state for sticky notes*******
  const [minimize, setMinimize] = useState(true);
  const [search, setSearch] = useState(null);
  //const searchDebounce = useDebounce(search, 500);

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
    dispatch(addSticky({}));
  };

  // ********minimize handler for sticky container********
  const minimizeHandler = () => {
    setMinimize(!minimize);
  };

  // *****close Sticky handler*****
  const closeHandler = () => {
    dispatch(closeSticky());
  };

  // *******open clicked sticky note********
  const openClickedNote = (note) => {
    dispatch(showStickyNote(note.id));
  };

  const { userLanguage } = useContext(LanguageChangeContext);
  const { stikcyDictionary } = stickyNotesDictionaryList[userLanguage];
  return (
    <>
      <Draggable handle=".handle">
        <div className={`sticky_container ${!minimize ? "minimize" : ""}`}>
          <div className="sticky-header handle">
            <div className="left_Icon">
              <PlusOutlined onClick={addStickyHandler} />
            </div>
            <p className="heading">{stikcyDictionary.stickyNotes}</p>
            <div className="right_Icons">
              <MinusOutlined
                onClick={minimizeHandler}
                className="minimize-Icon"
              />
              <CloseOutlined onClick={closeHandler} className="close_Icon" />
            </div>
          </div>

          {/* <SearchBox /> */}
          <div className={`search_Box ${!minimize ? "hide" : ""}`}>
            <Input
              placeholder={stikcyDictionary.search}
              // style={{ width: "300px" }}
              onChange={searchHandler}
              prefix={<SearchOutlined />}
            />
          </div>
          <div className={`noteList-container ${!minimize ? "hide" : ""}`}>
            {notesList.length ? (
              notesList.map((item) => (
                <CustomCard
                  item={item}
                  onDoubleClick={openClickedNote}
                  index={item.id}
                  key={item.id}
                />
              ))
            ) : (
              <div className="flex items-center justify-center">
                <img
                  src={Nodata}
                  className="h-[200px] w-[200px]"
                  alt="no-data"
                />
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </>
  );
};
export default StickyContainer;
