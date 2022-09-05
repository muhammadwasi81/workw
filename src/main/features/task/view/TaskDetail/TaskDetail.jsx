import { Drawer, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { taskDictionary } from "../../localization";
import { getTaskById } from "../../store/actions";
import { clearTaskById } from "../../store/taskSlice";
import TaskListItem from "../TaskList/listItem";

function TaskDetail(props) {
  const { visible, onClose, id } = props;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, taskDictionaryList } = taskDictionary[userLanguage];
  const [isMounted, setIsMounted] = useState(false);
  const { labels } = taskDictionaryList;
  const { task } = useSelector((state) => state.taskSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMounted) {
      dispatch(getTaskById(id));
    }
    setIsMounted(true);
    return () => {
      dispatch(clearTaskById());
    };
  }, [id]);

  return (
    <Drawer
      title={
        <h1
          style={{
            fontSize: "20px",
            margin: 0,
            textAlign: Direction === "ltr" ? "" : "end",
          }}
        >
          {labels.expenseDetail}
        </h1>
      }
      placement={Direction === "ltr" ? "right" : "left"}
      width={768}
      onClose={() => {
        onClose();
      }}
      visible={visible}
      destroyOnClose={true}
      className="drawerSecondary"
    >
      {!Object.keys(task).length ? (
        <Skeleton avatar paragraph={{ rows: 6 }} />
      ) : (
        <div className="taskDetail">
          {<TaskListItem item={task} isTaskMember={true} />}
        </div>
      )}
    </Drawer>
  );
}

export default TaskDetail;
