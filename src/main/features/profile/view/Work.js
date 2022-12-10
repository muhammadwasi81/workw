import { Button } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import WorkplaceForm from "../forms/WorkplaceForm";
import AddButton from "../UI/AddButton";
import List from "../UI/List";
import { useDispatch, useSelector } from "react-redux";
import { getWorkAction } from "../store/action";
import { useParams } from "react-router-dom";

function Work() {
  const [showWorkForm, setShowWorkForm] = useState(false);
  const dispatch = useDispatch();
  const handleShowWork = () => {
    setShowWorkForm(!showWorkForm);
  };

  return (
    <div className="p-3 ">
      <p className="text-lg text-black font-semibold">Work</p>
      <div className="">
        {showWorkForm ? (
          <WorkplaceForm handleShowWork={handleShowWork} />
        ) : (
          <AddButton text={"Add a workplace"} onClick={handleShowWork} />
        )}
        <List />
      </div>
    </div>
  );
}

export default Work;
