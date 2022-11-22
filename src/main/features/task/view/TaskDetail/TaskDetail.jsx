import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Skeleton } from "antd";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import { taskDictionary } from "../../localization";
import { getTaskById } from "../../store/actions";
import { changeOnProgress, clearTaskById } from "../../store/taskSlice";
import TaskListItem from "../TaskList/listItem";
import '../style/task.css'

function TaskDetail(props) {
  const { visible, onClose, id } = props;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, taskDictionaryList } = taskDictionary[userLanguage];
  const [progress, setProgress] = useState();
  const { labels } = taskDictionaryList;
  const { task } = useSelector((state) => state.taskSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if(id){
      dispatch(getTaskById(id));
    }
    // if (isMounted) {
    // }
    // setIsMounted(true);
    return () => {
      dispatch(clearTaskById());
    };
  }, [id]);
  useEffect(() => {
    const memberAvg = task.members?.reduce((acc, obj) => acc + obj.progress, 0);
    const progress = memberAvg / task?.members?.length;
    setProgress(progress);
  }, [task]);

  const handleProgressChange = (data) => {
    dispatch(changeOnProgress(data));
  };

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
          {labels.taskDetail}
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
          {
            <TaskListItem
              progress={progress}
              item={task}
              isTaskMember={true}
              isRatingDisable={false}
              changeOnProgress={handleProgressChange}
              isDetail={true}
            />
          }
          <div className="comments">
            <CommentWrapper
              initailComments={[]}
              referenceId={id}
              module={2}
              isCommentLoad={true}
            />
          </div>
        </div>
      )}
    </Drawer>
  );
}

export default TaskDetail;
