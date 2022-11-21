import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
// import { dictionaryList } from "../../../../utils/localization/languages";
import { companyDictionaryList } from "../localization/index";
import { Avatar, Button } from "antd";
import { getNameForImage } from "../../../../../utils/base";
import { useNavigate } from "react-router-dom";
import "../Styles/company.css";

const CompanyCard = ({ teams: { image, name, designation, email, id } }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { companyDictionary } = companyDictionaryList[userLanguage];
  const labels = companyDictionary.sharedLabels;

  const navigate = useNavigate();
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
                navigate(`info/basicInfo/${id}`);
              }}
            >
              {labels.detail}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CompanyCard;
