import { Button, Progress, Tag } from "antd";
import React, { useContext } from "react";
// import WarningApprovel from "../WarningApprovel";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { Rate } from "antd";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage, STRINGS } from "../../../../../utils/base";
import { NavLink, useNavigate } from "react-router-dom";

import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { taskDictionary } from "../../localization";
import { getPriorityLabel } from "../../utils/enum/enum";

function TaskListItem({ item }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction } = dictionaryList[userLanguage];
  const { taskDictionaryList } = taskDictionary[userLanguage];
  const { labels } = taskDictionaryList;
  const Navigate = useNavigate();
  const {
    subject,
    description,
    referenceNo,
    rating,
    priority,
    startDate,
    endDate,
    progress,
    members = [],
    creator,
  } = item;

  let classes = "card-list-item ";
  classes += Direction === "rtl" ? "rtl" : "ltr";
  const { color, label } = getPriorityLabel(labels, priority);

  return (
    <div className={classes} onClick={() => Navigate("taskDetail/" + item.id)}>
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
            <Rate allowHalf defaultValue={rating} disabled />
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

            <div className="right"></div>
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
            <div className="cardSectionItem">
              <div className="cardSection__title">{labels.predecessor}</div>
              <div className="cardSection__body">Predecessor</div>
            </div>
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

          <div>
            <Progress strokeColor="#1b5669" percent={progress} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskListItem;
