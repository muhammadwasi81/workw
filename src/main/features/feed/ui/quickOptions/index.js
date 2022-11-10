import React from "react";
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

function QuickOptions() {
  const dispatch = useDispatch();
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
        <img
          src={milePersatationIcon}
          name="mileshow"
          onClick={handleOpenComposer}
        />
        <img
          src={mileboardPlusIcon}
          name="mileboard"
          onClick={handleOpenComposer}
        />
        <img
          src={milegridPlusIcon}
          name="milegrid"
          onClick={handleOpenComposer}
        />
        <img
          src={milepadPlusIcon}
          name="milepad"
          onClick={handleOpenComposer}
        />
        {/* <img src={scheduleIcon} name="schedule" onClick={handleOpenComposer} /> */}
        <img src={taskPlusIcon} name="task" onClick={handleOpenComposer} />
        <img
          src={expensePlusIcon}
          name="expense"
          onClick={handleOpenComposer}
        />
      </div>
      <DocumentComposers />
      <CreateTask />
      <CreateExpense />
    </>
  );
}

export default QuickOptions;
