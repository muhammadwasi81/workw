import React, { useState, useContext } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { EditOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { getNameForImage } from "../../../../utils/base";
import { useNavigate } from "react-router-dom";
import "../Styles/team.css";

const TeamCard = ({ teams: { image, name, designation, email, id } }) => {
  const navigate = useNavigate();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  return (
    <>
      <div className="teamCard">
        <div className="teamCard__header">
          <div className="teamCard__header--img">
            <Avatar className="" src={image ? image : ""}>
              {getNameForImage(name ? name : "Unknown User")}
            </Avatar>
          </div>
        </div>
        <div className="teamCard__body">
          <p>{name}</p>
          <span>{designation || "No Desigation"}</span>
          <span>{email || "No email"}</span>
          <div className="buttonGroup">
            <Button
              // icon={<EditOutlined />}
              className="ThemeBtn"
              onClick={() => {
                navigate(`info/attendence/${id}`);
              }}
            >
              Detail
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TeamCard;
