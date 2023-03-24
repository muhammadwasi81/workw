import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import { groupByKey } from "../../../../../utils/base";
import moment from "moment";
import TaskListItem from "../../../task/view/TaskList/listItem";
import TaskComposer from "../../../task/view/TaskComposer";

function TaskContainer() {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const {
    taskList: { loading, list },
  } = useSelector((state) => state.taskSlice);

  const handleCard = (id) => {
    setId(id);
    setVisible(true);
  };
  const handleDrawerClose = () => {
    setVisible(false);
  };

  let filteredList = list.map((item) => ({
    ...item,
    startDateOnly: moment(item.startDate).format("MMM Do YYYY"),
  }));
  const groupDate = groupByKey(filteredList, "startDateOnly");

  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/tasks?q=${searchQuery}`);
  };

  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Task</h5>
        {Object.keys(groupDate).map((item) => {
          return groupDate[item].slice(0, 4).map((task) => {
            return (
              <TaskListItem key={task.id} item={task} onTask={handleCard} />
            );
          });
        })}
        <div
          onClick={searchHandler}
          className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
        >
          See more
        </div>
      </div>
    </>
  );
}
export default TaskContainer;
