import { Button, Progress, Tag } from "antd";
import React, { useContext } from "react";
// import WarningApprovel from "../WarningApprovel";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { Rate } from "antd";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage, STRINGS } from "../../../../utils/base";
import { NavLink } from "react-router-dom";

const dummyMember = [
  {
    profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
    name: "Abu Bakar",
  },
  {
    profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
    name: "Abu Bakar",
  },
  {
    profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
    name: "Abu Bakar",
  },
  {
    profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
    name: "Abu Bakar",
  },
  {
    profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
    name: "Abu Bakar",
  },
];

function AssignedByMe() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction } = dictionaryList[userLanguage];

  return (
    <div className="card-list-item mt-40 flex assignedByme">
      <div className="card-item-header">
        <div className="left">
          <div className="card-Title-1">Design a Task Board Page For Konnect!</div>
          <p className="card-desc-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quos aut! Cumque minus reprehenderit vero exercitationem repellat quae
            voluptatibus! Tempore odit minima
          </p>
        </div>

        <div className="right">
          <div className="status">
            <Button className="ThemeBtn">{sharedLabels.inprogress}</Button>
            <Button className="highPriorityBtn">{"High"}</Button>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ width: "175px", marginTop: "12px" }}>
              <div className="ratingTitle"> Rating</div>
              <div>
                {" "}
                <Rate allowHalf defaultValue={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavLink to={`${STRINGS.ROUTES.TASK.DETAIL}/${"test"}`}>
        <div>
          <div className="card-item-body-main">
            <div className="card-item-body">
              <div className="left"></div>

              <div className="right"></div>
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
                    {dummyMember ? dummyMember.length > 2 ? <div className="us-img">{dummyMember && dummyMember.length - 2}+</div> : "" : null}
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

export default AssignedByMe;
