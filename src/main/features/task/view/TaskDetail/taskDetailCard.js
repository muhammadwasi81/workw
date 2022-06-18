import { Button, Progress } from "antd";
import React, { useContext } from "react";
// import WarningApprovel from "../WarningApprovel";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { Rate } from "antd";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage, STRINGS } from "../../../../../utils/base";
import { NavLink } from "react-router-dom";
import AttachmentGridView from "../../../../sharedComponents/AttachmentGridView";

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

function TaskDetailCard() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction } = dictionaryList[userLanguage];

  return (
    <div className="card-list-item mt-40 flex">
      <div className="card-item-header">
        <div className="left">
          <UserInfo
            avatarSrc="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
            name="Abu Bakar"
            Subline={
              <SublineDesigWithTime
                designation="ReactJs Developer"
                time="2 days ago"
              />
            }
          />
        </div>
        <div className="middle"></div>
        <div className="right">
          <span style={{ marginRight: "20px" }}>
            {" "}
            <Rate allowHalf defaultValue={2.5} />{" "}
          </span>
          <Button className="ThemeBtn">{sharedLabels.inprogress}</Button>
          <Button className="highPriorityBtn">{"High"}</Button>
        </div>
      </div>
      <NavLink to={`${STRINGS.ROUTES.TASK.DETAIL}/${"test"}`}>
        <div>
          <div className="card-item-body-main">
            <div className="card-item-body task-detail-body">
              <div className="left">
                <div className="card-Title-1">
                  Lorem ipsum dolor sit amet adipisicing elit.
                </div>
                <p className="card-desc-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                  quos aut! Cumque minus reprehenderit vero exercitationem
                  repellat quae voluptatibus! Tempore odit minima Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Nisi, quos aut!
                  Cumque minus reprehenderit vero exercitationem repellat quae
                  voluptatibus! Tempore odit minima repellat quae voluptatibus!
                  Tempore odit minima Cumque minus reprehenderit vero
                  exercitationem repellat quae voluptatibus! Tempore odit minima
                  repellat quae voluptatibus! Tempore odit minima odit minima
                  repellat quae voluptatibus! Tempore odit minima Cumque minus
                  reprehenderit vero exercitationem repellat quae voluptatibus!
                  Tempore odit minima repellat quae voluptatibus! Tempore odit
                  minima
                </p>
              </div>

              <div className="right">
                <div className="attachment-cont">
                  <AttachmentGridView
                    attachments={[
                      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
                      "https://konnect.im/upload/2021/12/4bb74a28-c7d0-4357-a1ea-3acafec8f6d2.jpeg",
                      "https://konnect.im/upload/2021/12/23f92d8b-5ce5-4326-b0d1-4871d0f28efe.jpg",
                      "https://konnect.im/upload/2022/1/54b45eb3-a8a6-40a5-b35d-65c8ebfefbe1.jpeg",
                      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
                      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
                      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
                      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
                      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
                      "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="card-column-view">
              <div className="card-column-item">
                <div className="column-item-head"> Assign to </div>
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
              <div>
                <div className="column-item-head"> Predecessor </div>
                <div className="st-tag"> Helpers UI </div>
              </div>
              <div>
                <div className="column-item-head"> Start Date </div>
                <div className="st-tag"> Mon, Oct 14, 2021 </div>
              </div>
              <div>
                <div className="column-item-head"> End Date </div>
                <div className="st-tag"> Mon, Oct 14, 2021 </div>
              </div>
            </div>

            <div>
              <Progress strokeColor="#1b5669" percent={80} />
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default TaskDetailCard;
