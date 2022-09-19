import React, { useContext, useEffect, useState } from "react";
import { STRINGS } from "../../../../utils/base";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import TaskComposer from "./TaskComposer";

import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header";
import { buttonsEnum } from "../utils/enum/enum";

import MyTaskList from "./MyTask";
import { useDispatch } from "react-redux";
import { getAllTask } from "../store/actions";
import useSelection from "antd/lib/table/hooks/useSelection";
import { useSelector } from "react-redux";
import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TaskTable/TaskColumns";
import { taskDictionary } from "../localization";

function Task() {
  let defaultFilter = {
    filterType: 2,
    pageNo: 1,
    pageSize: 20,
  };
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appHeader, sharedLabels, navMenuLabel } = dictionaryList[
    userLanguage
  ];
  const { taskDictionaryList } = taskDictionary[userLanguage];
  const [filterType, setFilterType] = useState(2);
  const [tableView, setTableView] = useState(false);
  const dispatch = useDispatch();
  const {
    taskList: { list },
    success,
  } = useSelector((state) => state.taskSlice);
  useEffect(() => {
    dispatch(
      getAllTask({
        ...defaultFilter,
        filterType,
      })
    );
  }, [filterType]);

  const items = [
    {
      name: navMenuLabel.tasks,
      to: `${STRINGS.ROUTES.TASK.ROOT}`,
      renderButton: buttonsEnum.dashboard,
    },
  ];
  const buttons = [
    {
      buttonText: taskDictionaryList.createTextBtn,
      render: (
        <SideDrawer
          success={success}
          isAccessDrawer={true}
          openDrawer={success}
          children={<TaskComposer />}
          title={taskDictionaryList.createTextBtn}
          buttonText={taskDictionaryList.createTextBtn}
        />
      ),
    },
  ];

  return (
    <TabbableContainer>
      <Header items={items} buttons={buttons} />
      <TopBar
        onSearch={(value) => {
          console.log(value);
        }}
        // filter={{
        //   onFilter: () => {},
        // }}
        buttons={[
          {
            name: appHeader.Task.myTask,
            onClick: () => setFilterType(2),
          },
          {
            name: appHeader.Task.createdByMe,
            onClick: () => setFilterType(1),
          },
          {
            name: appHeader.Task.teamTask,
            onClick: () => setFilterType(3),
          },
        ]}
        segment={{
          onSegment: (value) => {
            if (value === "Table") {
              setTableView(true);
            } else {
              setTableView(false);
            }
          },
          label1: sharedLabels.List,
          label2: sharedLabels.Table,
        }}
      />
      <ContBody>
        <div className="lf-col">
          {tableView ? (
            <Table
              columns={tableColumn()}
              dragable={true}
              data={list ? list : []}
            />
          ) : (
            <MyTaskList filterType={filterType} />
          )}
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default Task;
