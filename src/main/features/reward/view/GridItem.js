import { Button, Tag } from "antd";
import React, {useContext} from "react";
import Avatar from '../../../../components/SharedComponent/Avatar/avatar'
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Approval from "../../../../components/SharedComponent/AppComponents/Approval/Approval";
import UserInfo from "../../../../components/SharedComponent/UserShortInfo/UserInfo";
import SublineDesigWithTime from '../../../../components/SharedComponent/UserShortInfo/SubLine/DesigWithTime';

 
function GridItem() {
  const {userLanguage} = useContext(LanguageChangeContext);
  const {sharedLabels, Direction} = dictionaryList[userLanguage];

  return (
    <div className="grid-item">
      <div className="grid-header">
        <div className="left">
          <UserInfo
            avatarSrc="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
            name="Salman Ahmed"
            Subline={<SublineDesigWithTime designation="ReactJs Developer" time="2 days ago" />}
          />
        </div>
        <div className="right">
          <Tag className="IdTag">TRA-000085</Tag>
            <Button className="ThemeBtn">{sharedLabels.inprogress}</Button>
        </div>
      </div>
      <div className="grid-content warning-content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quos
          aut! Cumque minus reprehenderit vero exercitationem repellat quae
          voluptatibus! Tempore odit minima
        </p>
        <h3>Warnig For</h3>
        <h4>Anus Ali</h4>
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

export default GridItem;
