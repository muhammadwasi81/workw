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

import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header";
import { buttonsEnum } from "../enum/enum";
import { taskDictionary } from "../localization";
import MyTask from "./MyTask";

function Task() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appHeader, sharedLabels, navMenuLabel } =
    dictionaryList[userLanguage];
  const { taskDictionaryList } = taskDictionary[userLanguage];

  const items = [
    {
      name: navMenuLabel.tasks,
      to: `${STRINGS.ROUTES.TASK.DEFAULT}`,
      renderButton: buttonsEnum.dashboard,
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
        buttons={[
          {
            name: appHeader.Task.myTask,
            onClick: () => {},
          },
          {
            name: appHeader.Task.assignedByMe,
            onClick: () => {},
          },
          {
            name: appHeader.Task.teamTask,
            onClick: () => {},
          },
        ]}
        segment={{
          onSegment: (value) => {},
          label1: sharedLabels.List,
          label2: sharedLabels.Table,
        }}
      />
      <ContBody>
        <div className="lf-col">
          <MyTask />
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default Task;
