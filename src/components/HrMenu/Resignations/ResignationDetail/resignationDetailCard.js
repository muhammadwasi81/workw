import { Button, Tag } from "antd";
import React, { useContext } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../SharedComponent/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../SharedComponent/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage, STRINGS } from "../../../../utils/base";
import { NavLink } from "react-router-dom";
import AttachmentGridView from "../../../SharedComponent/AttachmentGridView";
import { ItemContent } from "../../../SharedComponent/ShortCard/ShortCardStyle";
import Approval from "../../../SharedComponent/AppComponents/Approval/Approval";

const dummyMember = [{
  profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
  name: "Abu Bakar"
},
{
  profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
  name: "Abu Bakar"
},
{
  profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
  name: "Abu Bakar"
},
{
  profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
  name: "Abu Bakar"
},
{
  profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
  name: "Abu Bakar"
},]

function ResignationDetailCard({name}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction } = dictionaryList[userLanguage];

  return (
    <div className="card-list-item mt-40 flex marginTop20">
        <div className="card-item-header">
        <div className="left">
          <UserInfo
            avatarSrc="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
            name={name}
            Subline={<SublineDesigWithTime designation="ReactJs Developer" time="2 days ago" />}
          />
        </div>
        <div className="middle">
        </div>
        <div className="right">
          <Tag className="refrenceTag">TRA-000085</Tag>
          <Button className="highPriorityBtn">{sharedLabels.cancel}</Button>
          <Button className="ThemeBtn">{sharedLabels.inprogress}</Button>
        </div>
        </div>
        <div className="card-item-body-main">
            <div className="card-Title-1" >
                {sharedLabels.description}
            </div>
            <p className="card-desc-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quos
                aut! Cumque minus reprehenderit vero exercitationem repellat quae
                voluptatibus! Tempore odit minima  Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Nisi, quos aut! Cumque minus reprehenderit vero exercitationem
                repellat quae voluptatibus! Tempore odit minima  repellat quae voluptatibus! Tempore
                odit minima Cumque minus reprehenderit vero exercitationem
                repellat quae voluptatibus! Tempore odit minima  repellat quae voluptatibus! Tempore.
            </p>
        </div>
        <div className="card-footer">
            <ItemContent>
                <h4><b>{sharedLabels.reason} :</b> <span>Relocation</span></h4>
            </ItemContent>
            <Approval 
                username="Salman Ahmed"
                userdesignation="React Js Internee"
                status={sharedLabels.inProcess}   
            />
        </div>
    </div>
  );
}

export default ResignationDetailCard;
