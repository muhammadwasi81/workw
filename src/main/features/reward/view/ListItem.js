import { Button, Tag } from "antd";
import React, {useContext} from "react";
import Avatar from '../../../../components/SharedComponent/Avatar/avatar'
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Approval from "../../../../components/SharedComponent/AppComponents/Approval/Approval";
import UserInfo from "../../../../components/SharedComponent/UserShortInfo/UserInfo";
import SublineDesigWithTime from '../../../../components/SharedComponent/UserShortInfo/SubLine/DesigWithTime';

 
function RewardListItem(props) {
  const {userLanguage} = useContext(LanguageChangeContext);
  const {sharedLabels, Direction} = dictionaryList[userLanguage];

  return (
    <div className="list-item">
      <div className="item-header">
        <div className="left">
          <UserInfo
            avatarSrc="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
            name={props.name}
            Subline={<SublineDesigWithTime designation={"ReactJs Developer"} time="2 days ago" />}
          />
        </div>
        <div className="right">
          <Tag className="IdTag">TRA-000085</Tag>
            {
              props.status
            }
        </div>
      </div>
      <div className="item-content warning-content">
        <p>
          {props.description}
        </p>
        <h3>Reward For</h3>
        {
          props.members
        }
      </div>
      <div className="warning-approvers">
            <Approval 
                username="Salman Ahmed"
                userdesignation="React Js Internee"
                status={sharedLabels.inprogress}   
            />
      </div>
    </div>
  );
}

export default RewardListItem;
