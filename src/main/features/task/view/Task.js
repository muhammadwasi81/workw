import React, { useContext, useState } from "react";
import { STRINGS } from "../../../../utils/base";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import TaskComposer from "./TaskComposer";
import TaskList from "./TaskList/index";
import AssignedByMe from "./AssignedByMe";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header";
import { buttonsEnum } from "../enum/enum";
import { taskDictionary } from "../localization";
import Approval from "../../../sharedComponents/AppComponents/Approval/Approval";

function Task() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appHeader, sharedLabels } = dictionaryList[userLanguage];
  const { taskDictionaryList } = taskDictionary[userLanguage];

  const [currentTab, setCurrentTab] = useState(
    `${STRINGS.ROUTES.TASK.DEFAULT}?f=task`
  );
  const render = {
    [appHeader.Task.myTask]: <TaskList />,
    [appHeader.Task.assignedByMe]: <AssignedByMe />,
  };
  const handleItem = (currentValue) => {
    setCurrentTab(currentValue);
  };
  const items = [
    {
      name: appHeader.Task.dashboard,
      to: `${STRINGS.ROUTES.TASK.DEFAULT}?f=dashboard`,
      renderButton: buttonsEnum.dashboard,
      onClick: (value) => handleItem(value),
    },
    {
      name: appHeader.Task.myTask,
      to: `${STRINGS.ROUTES.TASK.DEFAULT}?f=task`,
      renderButton: buttonsEnum.task,
      onClick: (value) => handleItem(value),
    },
    {
      name: appHeader.Task.assignedByMe,
      to: `${STRINGS.ROUTES.TASK.DEFAULT}?f=assignedByMe`,
      renderButton: buttonsEnum.assign,
      onClick: (value) => handleItem(value),
    },
    {
      name: appHeader.Task.teamTask,
      to: `${STRINGS.ROUTES.TASK.DEFAULT}?f=teamTask`,
      renderButton: buttonsEnum.team,
      onClick: (value) => handleItem(value),
    },
  ];
  const buttons = [
    {
      buttonText: taskDictionaryList.createTextBtn,
      render: (
        <SideDrawer
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
        filter={{
          onFilter: () => {},
        }}
        segment={{
          onSegment: (value) => {},
          label1: sharedLabels.List,
          label2: sharedLabels.Table,
        }}
      />
      <ContBody>
        <div className="lf-col">
          {render[currentTab]}
          <Approval
            username="username"
            userdesignation="userdesignation"
            status="status"
          />
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default Task;
