import { Image, Tag } from "antd";
import React, { useContext } from "react";
// import { customApprovalDictionaryList } from "../localization/index";
// import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../../../utils/base";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import { PieChartOutlined, GlobalOutlined } from "@ant-design/icons";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../../../sharedComponents/Avatar/avatar";
import ProImage from "../../../../../../content/NewContent/careers/proImage.svg";
import { LinkOutlined } from "@ant-design/icons";
import "../../styles/style.css";


function Card(props) {

  return (
    <>
      <SingleItem>
        <div className="careersDetailCard" >
          <div className="cardLabel" >
            Job Details
          </div>

          <div className="careersSections">
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
              <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
               <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
               <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
               <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
               <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
               <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
               <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
               <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
               <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
          </div>



        </div>




      </SingleItem>
    </>
  );
}

export default Card;
