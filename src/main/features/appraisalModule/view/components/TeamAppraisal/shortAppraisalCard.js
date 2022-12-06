import React, { useContext } from "react";
import { SingleItem } from "../../../../../sharedComponents/Card/CardStyle";
import { Avatar, Card, Button } from "antd";
import "../../style.css";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { appraisalDictionaryList } from "../../../localization/index";

const ShortAppraisalCard = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appraisalDictionary } = appraisalDictionaryList[userLanguage];
  const { viewAppraisals } = appraisalDictionary;
  return (
    <>
      <SingleItem className="cursor-pointer">
        <div className="flex" style={{ gridColumnGap: "14px" }}>
          <Avatar size={64} src="https://joeschmoe.io/api/v1/random" />
          <span className="flex flex-col justify-center">
            <span className="font-bold " style={{ color: "#40a9ff" }}>
              Humayoun Shah
            </span>
            <span className="text-xs font-thin" style={{ color: "#757D86" }}>
              Software Engineer
            </span>
          </span>
        </div>
        <div className="flex justify-end">
          <button className="viewAppraisalBtn drop-shadow">
            {viewAppraisals}
          </button>
        </div>
      </SingleItem>
    </>
  );
};

export default ShortAppraisalCard;
