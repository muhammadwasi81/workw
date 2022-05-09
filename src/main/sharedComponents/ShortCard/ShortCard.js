import { Button, Tag } from "antd";
import React, {useContext} from "react";
import Avatar from "../../SharedComponent/Avatar/avatar";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { 
    SingleItem,
    ItemHeader,
    ItemContent,
    ItemProfile,
    ItemInfo
 }
 from "../ShortCard/ShortCardStyle";

const ShortCard = ({ name, designation, time, reason, refrence }) => {

    const {userLanguage} = useContext(LanguageChangeContext);
    const {sharedLabels, Direction} = dictionaryList[userLanguage];

  return (
    <>
       <SingleItem>
            <ItemHeader>
                <ItemProfile>
                    <Avatar
                        src={
                        "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
                        }
                        className="addPostAvatar"
                        width={35}
                        height={35}
                        round={true}
                    />
                    <ItemInfo>
                        <h4>{name}</h4>
                        <div className="details">
                        <span className="designation">{designation}</span>
                        <span className="dot"></span>
                        <span className="time"> {time}</span>
                        </div>
                    </ItemInfo>
                </ItemProfile>
                    <Button size="small" className="ThemeBtn">{sharedLabels.inprogress}</Button>
            </ItemHeader>
            <ItemContent>
                <h4><b>{sharedLabels.reason} :</b> <span>{reason}</span></h4>
                <h4><b>{sharedLabels.refrence} :</b> <Tag>{refrence}</Tag></h4>
            </ItemContent>
        </SingleItem>
    </>
  )
}

export default ShortCard;
