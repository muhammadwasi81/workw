import React, { useContext, useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TaskReferenceTypeEnum } from "../../enums/enum";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import TaskComposer from "../TaskComposer";
import { taskDictionary } from "../../localization";
import { handleOpenTaskComposer } from "../../store/taskSlice";
import { STRINGS } from "../../../../../utils/base";

function CreateTask({
  referenceId = STRINGS.DEFAULTS.guid,
  referenceType = TaskReferenceTypeEnum.General,
  feature = "",
}) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);

  const { taskDictionaryList } = taskDictionary[userLanguage];

  const {
    taskList: { list },
    success,
    drawerOpen,
  } = useSelector((state) => state.taskSlice);

  return (
    <>
      <Drawer
        title={
          <h1
            style={{
              fontSize: "20px",
              margin: 0,
            }}
          >
            {taskDictionaryList.createTextBtn}
          </h1>
        }
        width="768"
        onClose={() => {
          dispatch(handleOpenTaskComposer(false));
        }}
        visible={drawerOpen}
        destroyOnClose={true}
        className="detailedViewComposer drawerSecondary"
      >
        <TaskComposer
          referenceId={referenceId}
          referenceType={referenceType}
          feature={feature}
        />
      </Drawer>
    </>
  );
}
export default CreateTask;
