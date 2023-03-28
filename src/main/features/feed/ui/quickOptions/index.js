import React, { useContext } from "react";
import scheduleIcon from "../../../../../content/NewContent/Documents/file/quickIcons/schedulePlus.svg";
import taskPlusIcon from "../../../../../content/NewContent/Documents/file/quickIcons/taskPlus.svg";
import expensePlusIcon from "../../../../../content/NewContent/Documents/file/quickIcons/expensePlus.svg";
import milePersatationIcon from "../../../../../content/NewContent/Documents/file/quickIcons/mile-persatation plus.svg";
import mileboardPlusIcon from "../../../../../content/NewContent/Documents/file/quickIcons/mileboardPlus.svg";
import milegridPlusIcon from "../../../../../content/NewContent/Documents/file/quickIcons/milegridPlus.svg";
import milepadPlusIcon from "../../../../../content/NewContent/Documents/file/quickIcons/milepadPlus.svg";
import DocumentComposers from "../../../documents/view/composer/index";
import { useDispatch } from "react-redux";
import { handleOpenDocComposer } from "../../../documents/store/slice";
import { handleOpenExpenseComposer } from "../../../expense/store/slice";
import CreateExpense from "../../../expense/view/CreateExpense/OpenCreateExpense";

import { handleOpenTaskComposer } from "../../../task/store/taskSlice";
import CreateTask from "../../../task/view/createTask/CreateTask";
import { Tooltip } from "antd";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../localization";

function QuickOptions() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);

  const { Post, Direction } = FeedDictionary[userLanguage];
  const { createMileshow } = Post;
  const handleOpenComposer = (e) => {
    let key = e.target.name;
    switch (key) {
      case "mileshow":
        dispatch(handleOpenDocComposer(key));
        break;
      case "mileboard":
        dispatch(handleOpenDocComposer(key));
        break;
      case "milegrid":
        dispatch(handleOpenDocComposer(key));
        break;
      case "milepad":
        dispatch(handleOpenDocComposer(key));
        break;
      case "task":
        dispatch(handleOpenTaskComposer(true));
        break;
      case "expense":
        dispatch(handleOpenExpenseComposer(true));
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="quickIcons">
        <Tooltip title={"Create Show"} color="var(--currentThemeColor)">
          <img
            className="hover:scale-125 transition-all hover:shadow-md"
            src={milePersatationIcon}
            name="mileshow"
            onClick={handleOpenComposer}
          />
        </Tooltip>
        <Tooltip title="Create Board" color="var(--currentThemeColor)">
          <img
            className="hover:scale-125 transition-all hover:shadow-md"
            src={mileboardPlusIcon}
            name="mileboard"
            onClick={handleOpenComposer}
          />
        </Tooltip>
        <Tooltip title="Create Grid" color="var(--currentThemeColor)">
          <img
            className="hover:scale-125 transition-all hover:shadow-md"
            src={milegridPlusIcon}
            name="milegrid"
            onClick={handleOpenComposer}
          />
        </Tooltip>
        <Tooltip title="Create Pad" color="var(--currentThemeColor)">
          <img
            className="hover:scale-125 transition-all hover:shadow-md"
            src={milepadPlusIcon}
            name="milepad"
            onClick={handleOpenComposer}
          />
        </Tooltip>
        {/* <img src={scheduleIcon} name="schedule" onClick={handleOpenComposer} /> */}
        <Tooltip title="Create Task" color="var(--currentThemeColor)">
          <img
            className="hover:scale-125 transition-all hover:shadow-md"
            src={taskPlusIcon}
            name="task"
            onClick={handleOpenComposer}
          />
        </Tooltip>
        <Tooltip title="Create Expense" color="var(--currentThemeColor)">
          <img
            className="hover:scale-125 transition-all hover:shadow-md"
            src={expensePlusIcon}
            name="expense"
            onClick={handleOpenComposer}
          />
        </Tooltip>
      </div>
      <DocumentComposers />
      <CreateTask />
      <CreateExpense />
    </>
  );
}

export default QuickOptions;
