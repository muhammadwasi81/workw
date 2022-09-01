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
    startDate,
    endDate,
    progress,
    members = [],
    creator,
  } = item;

  let classes = "card-list-item ";
  classes += Direction === "rtl" ? "rtl" : "ltr";
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
            <Rate allowHalf defaultValue={rating} />
          </div>
          <div className="labels">
            <span className="taskID">{referenceNo}</span>
            <span className="priority high">{labels.high}</span>
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

          <div className="card-column-view">
            <div className="card-column-item">
              <div className="column-item-head"> {labels.assignTo} </div>
              <div className="SummaryMembers">
                <div className="mem">
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={"Members"}
                    membersData={members}
                    image={"https://joeschmoe.io/api/v1/random"}
                  />
                </div>
              </div>
            </div>
            <div className="column-item-head">
              <span>{labels.predecessor}</span>
              <div className="st-tag"> Helpers UI </div>
            </div>

            <div className="column-item-head">
              <span>{labels.startDate}</span>
              <div className="st-tag">
                {moment(startDate).format("MMM Do YYYY")}{" "}
              </div>
            </div>

            <div className="column-item-head">
              <span>{labels.endtDate}</span>
              <div className="st-tag">
                {" "}
                {moment(endDate).format("MMM Do YYYY")}
              </div>
            </div>

            <div className="column-item-head"></div>
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
