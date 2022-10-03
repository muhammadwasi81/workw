import React, { useState, useEffect } from "react";
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
// import SearchBox from "./SearchBox";
import "../../style.css";
import NewStickyNote from "./NewStickyNote";
// *******import redux*******
import { useSelector, useDispatch } from "react-redux";
import { closeSticky, addStickyNote, openClickedSticky, showStickyNote} from "../../store/stickySlice";
// import sticky note actions
import { addSticky,getAllStickyNotesAction } from "../../store/actions";
import NoteList from "../../../NoteList";


const StickyContainer = () => {


  // *********state for sticky notes*******
  const [minimize, setMinimize] = useState(true);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  // const color=useSelector((state)=>state.stickySlice.colorCode);
  // console.log("COLORSSSSSS",color);

  // ****get redux data for sticky notes*****
  const notesList = useSelector((state) => {
    return state.stickySlice.listArray;
  });
  // console.log("stikcy note data", sticky_note);

  useEffect(()=>{
    dispatch(getAllStickyNotesAction({}));
  },[])

  // ********search handler***********
  const searchHandler = (e) => {
    const searchValue = e.target.value;
    // console.log(searchValue);
    setSearch(searchValue);
    console.log(searchValue);
  };

  // *****search filter*****
  // const filteredData = item.filter((list) => {
  //   if (search === "") {
  //     return list;
  //   } else {
  //     return Object.values(list)
  //       .join(" ")
  //       .toLowerCase()
  //       .includes(search.toLowerCase());
  //   }
  // });

  const addStickyHandler = () => {
    console.log("Calling")
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
  const openClickedNote=(note)=>{
    console.log("clicked note");
    dispatch(showStickyNote(note.id));

  }
  console.log(notesList)
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
              <CloseOutlined onClick={closeHandler} />
            </div>
          </div>

          {/* <SearchBox /> */}
          <div className={`search_Box ${!minimize ? "minimize" : ""}`}>
            <Input
              placeholder="Search"
              style={{ width: "300px" }}
              onChange={searchHandler}
              prefix={<SearchOutlined />}
            />
          </div>
          {/* <div className="noteList-container"> */}
          {notesList.length > 0
            ? notesList.map((item) =>
                    <CustomCard item={item} onDoubleClick={openClickedNote}/>
               )
            : "Nothing"}
          
        {/* </div> */}
        </div>
      </Draggable>
    </>
  );
};
export default StickyContainer;
