import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { STRINGS } from "../../../../utils/base";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import {
  ContBody,
  HeaderMenuContainer,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import HeaderNavLink from "../../../sharedComponents/AppComponents/MainHeader/HeaderNavLink";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import TaskComposer from "./TaskComposer";
import TaskList from "./TaskList/index";
import FilterForm from "./Filter/";

import {
  FilterFilled,
  UnorderedListOutlined,
  AppstoreFilled,
} from "@ant-design/icons";
import AssignedByMe from "./AssignedByMe";
import "./task.css";
import TopBar from "../../../layout/topBar/topBar";

function Task() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const label = dictionaryList[userLanguage];
  const [currentTab, setCurrentTab] = useState("task");

  const { search } = useLocation();
  let pathName = search.split("=")[1];

  useEffect(() => {
    if (!pathName) {
      setCurrentTab("task");
    } else {
      setCurrentTab(pathName);
    }
  }, [pathName]);
  console.log(currentTab, "Current Tab");
  return (
    <TabbableContainer>
      <ContainerHeader>
        <HeaderMenuContainer>
          <HeaderNavLink
            isDefault={false}
            linkName={label.appHeader.Task.dashboard}
            activeName={"dashboard"}
            to={`${STRINGS.ROUTES.TASK.DEFAULT}?f=dashboard`}
            urlParam={currentTab}
          />
          <HeaderNavLink
            isDefault={false}
            linkName={label.appHeader.Task.myTask}
            activeName={"task"}
            to={`${STRINGS.ROUTES.TASK.DEFAULT}?f=task`}
            urlParam={currentTab}
          />
          <HeaderNavLink
            isDefault={false}
            linkName={label.appHeader.Task.assignedByMe}
            activeName={"assignedByMe"}
            to={`${STRINGS.ROUTES.TASK.DEFAULT}?f=assignedByMe`}
            urlParam={currentTab}
          />
          <HeaderNavLink
            isDefault={false}
            linkName={label.appHeader.Task.teamTask}
            activeName={"teamTask"}
            to={`${STRINGS.ROUTES.TASK.DEFAULT}?f=teamTask`}
            urlParam={currentTab}
          />
        </HeaderMenuContainer>
        <div className="right-menu" style={{ paddingRight: "10px" }}>
          <div className="btn-hld">
            <SideDrawer
              children={<TaskComposer />}
              title="Create Task"
              buttonText="Create Task"
            />
          </div>
        </div>
        <span className="ln" />
      </ContainerHeader>
      <TopBar
        icons={[
          <FilterFilled className="topBarIcon" />,
          <AppstoreFilled className="topBarIcon gridIcon" />,
          <UnorderedListOutlined className="topBarIcon gridIcon" />,
        ]}
      />
      <ContBody>
        <div className="lf-col">
          {currentTab === "task" ? (
            <TaskList />
          ) : currentTab === "assignedByMe" ? (
            [1, 2, 3, 4].map((x) => <AssignedByMe />)
          ) : (
            currentTab
          )}
        </div>
        <div
          className="rt-col"
          style={{ backgroundColor: "white", borderRadius: "8px" }}
        >
          <FilterForm />
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default Task;
