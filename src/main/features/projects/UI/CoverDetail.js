import React, { useContext } from "react";
import { CalendarOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { BiWorld } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import WhiteCard from "./WhiteCard";
import moment from "moment";
import { projectsDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ProjectSummary from "../view/ProjectSummary";
import "./style.css";

function CoverDetail({ detail }) {
  console.log(detail, "detail");
  const { userLanguage } = useContext(LanguageChangeContext);
  const { projectsDictionary } = projectsDictionaryList[userLanguage];
  const { labels } = projectsDictionary;

  return (
    <WhiteCard className={"z-10 sticky top-0 w-full mt-[-87px] shadow-md"}>
      <div className="flex w-full justify-between text-base items-center">
        <div className="flex flex-col text-base">
          <span className="text-black text-base font-bold">{detail?.name}</span>
          <span className="text-gray-500 text-sm font-bold flex items-center gap-1">
            {detail?.privacyId === 1 ? (
              <Popover
                content={labels.publicProject}
                className="cursor-pointer"
              >
                <BiWorld />
              </Popover>
            ) : (
              <Popover
                content={labels.privateProject}
                className="cursor-pointer"
              >
                <FaLock />
              </Popover>
            )}

            {detail?.description}
          </span>
        </div>
        <ProjectSummary />
        <div>
          <div className="text-black text-sm font-bold flex items-center gap-2 ">
            <Popover content={`Created by: ${detail?.creator?.name}`}>
              <InfoCircleOutlined className="cursor-pointer" />
            </Popover>
            <span>
              {labels.createdBy}: {detail?.creator.name}
            </span>
          </div>
          <div className="font-bold flex items-center gap-2">
            <CalendarOutlined />
            <p className="!mb-0 text-sm">
              {labels.createdAt}:&nbsp;
              {moment(detail?.createDate).format("MMMM D, YYYY")}
            </p>
          </div>
        </div>
      </div>
    </WhiteCard>
  );
}

export default CoverDetail;
