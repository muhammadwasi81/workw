import { Button, Progress, Tag } from "antd";
import React, { useContext } from "react";
// import WarningApprovel from "../WarningApprovel";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { Rate } from "antd";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage, STRINGS } from "../../../../../utils/base";
import { NavLink } from "react-router-dom";
import { taskDictionary } from "../../localization";

const dummyMember = [
  {
    profile_picture:
      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
    name: "Abu Bakar",
  },
  {
    profile_picture:
      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
    name: "Abu Bakar",
  },
  {
    profile_picture:
      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
    name: "Abu Bakar",
  },
  {
    profile_picture:
      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
    name: "Abu Bakar",
  },
  {
    profile_picture:
      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
    name: "Abu Bakar",
  },
];

function TaskListItem() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction } = dictionaryList[userLanguage];
  const { taskDictionaryList } = taskDictionary[userLanguage];
  const { labels } = taskDictionaryList;

  let classes = "card-list-item ";
  classes += Direction === "rtl" ? "rtl" : "ltr";
  return (
    <div className={classes}>
      <div className="card-item-header">
        <div className="left">
            <UserInfo
              avatarSrc=""
              name="Abu Bakar"
              Subline={
                <SublineDesigWithTime
                  designation="ReactJs Developer"
                  time="2 days ago"
                />
              }
            />
        </div>

        <div className="right">
          <div className="rating">
            <Rate allowHalf defaultValue={2.5} />
          </div>
          <div className="labels">
            <span className="taskID">TSK-0000001</span>
            <span className="priority high">{labels.high}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="card-item-body-main">
          <div className="card-item-body">
            <div className="left">
              <div className="card-Title-1">
                Lorem ipsum dolor sit amet adipisicing elit.
              </div>
              <p className="card-desc-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                quos aut! Cumque minus reprehenderit vero exercitationem
                repellat quae voluptatibus! Tempore odit minima
              </p>
            </div>

            <div className="right"></div>
          </div>

          <div className="card-column-view">
            <div className="card-column-item">
              <div className="column-item-head"> {labels.assignTo} </div>
              <div className="SummaryMembers">
                <div className="mem">
                  {dummyMember.map((val, i) => {
                    if (i > 2) return "";
                    return val.profile_picture ? (
                      <div
                        key={`grpmem${i}`}
                        className="us-img"
                        style={{
                          backgroundImage: `url(${val.profile_picture})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                        }}
                      />
                    ) : (
                      <div key={`grpmem${i}`} className="us-img">
                        {getNameForImage(val.name)}
                      </div>
                    );
                  })}
                  {dummyMember ? (
                    dummyMember.length > 2 ? (
                      <div className="us-img">
                        {dummyMember && dummyMember.length - 2}+
                      </div>
                    ) : (
                      ""
                    )
                  ) : null}
                </div>
              </div>
            </div>

            <div className="column-item-head">
              <span>{labels.predecessor}</span>
              <div className="st-tag"> Helpers UI </div>
            </div>

            <div className="column-item-head">
              <span>{labels.startDate}</span>
              <div className="st-tag"> Mon, Oct 14, 2021 </div>
            </div>

            <div className="column-item-head">
              <span>{labels.endtDate}</span>
              <div className="st-tag"> Mon, Oct 14, 2021 </div>
            </div>
          </div>

          <div>
            <Progress strokeColor="#1b5669" percent={80} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskListItem;
