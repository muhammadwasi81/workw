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
import { closeSticky, addStickyNote, openClickedSticky} from "../../store/stickySlice";

// const { Title } = Typography;

const StickyContainer = () => {
  const dispatch = useDispatch();
  const sticky_note = useSelector((state) => {
    return state.stickySlice.listArray;
  });
  // console.log("stikcy note data", sticky_note);

  // *********state for sticky notes*******
  const [minimize, setMinimize] = useState(true);
  const [search, setSearch] = useState("");

  // ********search handler***********
  const searchHandler = (e) => {
    const searchValue = e.target.value;
    // console.log(searchValue);
    setSearch(searchValue);
    console.log(searchValue);
  };

  // *****search filter*****
  const filteredData = sticky_note.filter((list) => {
    if (search === "") {
      return list;
    } else {
      return Object.values(list)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
    }
  });

  const addStickyHandler = () => {
    dispatch(addStickyNote());
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
  const openClickedNote=()=>{
    console.log("clicked note");
    dispatch(openClickedSticky());
  }
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
          <div className="search_Box">
            <Input
              placeholder="Search"
              style={{ width: "300px" }}
              onChange={searchHandler}
              prefix={<SearchOutlined />}
            />
          </div>
          {filteredData.length > 0
            ? filteredData.map((list) => {
                return (
                  <>
                    <CustomCard title="sanjna" cardContent="Miletap" onDoubleClick={openClickedNote}/>
                    <CustomCard
                      title="How to Draw professional Wireframe"
                      cardContent="Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap"
                    />
                  </>
                );
              })
            : "Nothing"}
        </div>
      </Draggable>
    </>
  );
};
export default StickyContainer;
