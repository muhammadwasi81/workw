import { Progress } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { Rate } from "antd";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { taskDictionary } from "../../localization";
import { getPriorityLabel } from "../../utils/enum/enum";
import TaskMembers from "../TaskDetail/taskMembers";
import { postUserTaskRating } from "../../utils/services/service";
import Attachments from "../../../travel/view/UI/Attachments";

function TaskListItem({
  item,
  isTaskMember = false,
  onTask = () => { },
  isRatingDisable = true,
  changeOnProgress,
  progress,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  const [rating, setRating] = useState("");
  const { taskDictionaryList } = taskDictionary[userLanguage];
  const [isMount, setIsMount] = useState(false);
  const { labels } = taskDictionaryList;
  const {
    id,
    subject,
    description,
    referenceNo,
    ratingAssign,
    priority,
    startDate,
    endDate,
    progress: progressed,
    members = [],
    creator,
    attachments
  } = item;

  let classes = "card-list-item ";
  classes += Direction === "rtl" ? "rtl" : "ltr";
  const { color, label } = getPriorityLabel(labels, priority);

  useEffect(() => {
    if (isMount) {
      if (!isRatingDisable) handleRating(id, rating);
    }
  }, [rating]);

  useEffect(() => {
    setIsMount(true);
  }, []);

  const handleRating = async (id, rating) => {
    await postUserTaskRating(id, rating);
  };
  console.log(progress ? progress : progressed, "condition");
  return (
    <div className={classes} onClick={() => onTask(id)}>
      <div className="card-item-header">
        <div className="left">
          <UserInfo
            avatarSrc={creator?.image}
            name={creator?.name}
            Subline={
              <SublineDesigWithTime
                designation={
                  creator?.designation ? creator?.designation : "Not Designated"
                }
              // time="2 days ago"
              />
            }
          />
        </div>

        <div className="right">
          <div className="rating">
            <Rate
              defaultValue={ratingAssign}
              disabled={isRatingDisable || progress !== 100}
              onChange={(value) => setRating(value)}
            />
          </div>
          <div className="labels">
            <span className="taskID">{referenceNo}</span>
            <span className="priority " style={{ backgroundColor: color }}>
              {label}
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="card-item-body-main">
          <div className="card-item-body">
            <div className="left">
              <div className="card-Title-1">{subject}</div>
              <p className="card-desc-1">{description}</p>

            </div>

            <div className="right !min-w-max">
              {isTaskMember && (
                <TaskMembers
                  members={members}
                  changeOnProgress={changeOnProgress}
                />
              )}
              <div className="!w-max m-4 ml-auto">
                <Attachments
                  data={attachments}
                  key={{ data: attachments }}
                  toShow={3}
                  onClick={() => { }}
                  size={"50px"}
                />
              </div>
            </div>
          </div>
          <div>
            <Progress
              strokeColor="#526bb1"
              percent={progress ? progress : progressed}
            />
          </div>
          <div className="cardSections">
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.startDate}</div>
              <div className="cardSection__body">
                {moment(startDate).format("ddd,MMM DD,YYYY")}
              </div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.endtDate}</div>
              <div className="cardSection__body">
                {moment(endDate).format("ddd,MMM DD,YYYY")}
              </div>
            </div>
            {/* <div className="cardSectionItem">
              <div className="cardSection__title">{labels.predecessor}</div>
              <div className="cardSection__body">Predecessor</div>
            </div> */}
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.assignTo}</div>
              <div className="cardSection__body">
                {members && (
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={"Members"}
                    membersData={members}
                    image={"https://joeschmoe.io/api/v1/random"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskListItem;
