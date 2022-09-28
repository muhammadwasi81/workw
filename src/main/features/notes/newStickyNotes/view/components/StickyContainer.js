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
import SearchBox from "./SearchBox";
import "../../style.css";
import NewStickyNote from "./NewStickyNote";

// *******import redux*******
import { useSelector, useDispatch } from "react-redux";
import { closeSticky, addStickyNote } from "../../store/stickySlice";

// const { Title } = Typography;

const StickyContainer = () => {
  const dispatch = useDispatch();
  const sticky = useSelector((state) => {
    return state.stickySlice.listArray;
  });
  console.log("stikcy note data", sticky);

  // *********state for sticky notes*******
  const [minimize, setMinimize] = useState(true);
  const [search, setSearch] = useState("");

  // ********search handler***********
  const searchHandler = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    setSearch("saerch field", search);
  };

  const addStickyHandler = () => {
    dispatch(addStickyNote());
  };

  // ********minimize handler for sticky container********
  const minimizeHandler = () => {
    setMinimize(!minimize);
    console.log(minimize);
  };

  // *****close Sticky handler*****
  const closeHandler = () => {
    dispatch(closeSticky());
  };
  // console.log("minimization", minimize);
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
          <Input
            placeholder="Search"
            type="text"
            style={{ width: "300px" }}
            onChange={() => searchHandler(e)}
            prefix={<SearchOutlined />}
          />
          <CustomCard title="sanjna" cardContent="Miletap" />
          <CustomCard
            title="How to Draw professional Wireframe"
            cardContent="Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap Miletap"
          />
        </div>
      </Draggable>
    </>
  );
};
export default StickyContainer;
