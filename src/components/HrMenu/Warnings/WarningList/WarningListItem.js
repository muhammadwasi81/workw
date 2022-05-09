import { Button, Tag } from "antd";
import React, {useContext} from "react";
import Avatar from "../../../SharedComponent/Avatar/avatar";
import WarningApprovel from "../WarningApprovel";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

 
function WarningListItem() {
  const {userLanguage} = useContext(LanguageChangeContext);
  const {warnings, Direction} = dictionaryList[userLanguage];

  return (
    <div className="card-list-item">
      <div className="card-item-header">
        <div className="left">
          <Avatar
            src={
              "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
            }
            className="addPostAvatar"
            name={"AbuBakar"}
            width={44}
            height={44}
            round={true}
          />
          <div className="avatar-name">
            <div className="name">Abbu Bakkar</div>
            <div className="details">
              <span className="designation">Ui/Ux</span>
              <span className="dot"></span>
              <span className="time">2 days ago</span>
            </div>
          </div>
        </div>

        <div className="right">
          <Tag className="IdTag">TRA-000085</Tag>
            <Button className="ThemeBtn">{warnings.inprogress}</Button>
        </div>
      </div>
      <div className="card-item-content card-content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quos
          aut! Cumque minus reprehenderit vero exercitationem repellat quae
          voluptatibus! Tempore odit minima
        </p>
        <h3>Warnig For</h3>
        <h4>Anus Ali</h4>
      </div>
      <div>
            <WarningApprovel />
      </div>
    </div>
  );
}

export default WarningListItem;
