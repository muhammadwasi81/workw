import { Avatar, Tag } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { LinkOutlined } from "@ant-design/icons";
import { jobsDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function DetailView() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { jobsDictionary } = jobsDictionaryList[userLanguage];
  //call career by id
  return (
    <div className="approvalDetail flex-1 p-[5px]">
      <div className="item-card careersQuickDetail">
        <div className="careersShortCard cursor-pointer !flex !flex-row gap-2">
          <div>
            <Avatar
              size={45}
              src={
                "https://media-exp1.licdn.com/dms/image/C4E0BAQFDGDEYJfvahA/company-logo_100_100/0/1651291774461?e=1672272000&v=beta&t=POP4Vrc5oo1ovQWEdHnlWBjhEktimNJDwCsi0SaPOTk"
              }
            />
          </div>
          <div className="flex-1">
            <div className="text-[16px] font-bold text-sky-900">
              Senior React.js Developer
            </div>
            <div className="font-bold">Miletap</div>
            <div className="text-xs">
              Karachi, Pakistan - {moment("09-22-2022").fromNow()}
            </div>
          </div>
          <div className="linkDiv">
            <Tag className="LinkTag ThemeBtn">{"Apply Now"}</Tag>
            <Tag className="LinkTag ThemeBtn">
              <LinkOutlined /> {jobsDictionary.copyLink}
            </Tag>
          </div>
        </div>

        <div className="mt-5">
          <div className="font-bold">{jobsDictionary.jobDesc}</div>
          <div>
            We are looking for a React Native developer interested in building
            performant mobile apps on both the iOS and Android platforms. You
            will be responsible for architecting and building these
            applications, as well as coordinating with the teams responsible for
            other layers of the product infrastructure. well as coordinating
            with the teams responsible for other layers of the product
            infrastructure. Building a product is a highly collaborative effort,
            and as such, a strong team player with a commitment to perfection is
            required.
          </div>
        </div>

        <div className="mt-5">
          <div className="font-bold">{jobsDictionary.skillsRequired}</div>
          <div>
            <Tag className="LinkTag">{"React.js"}</Tag>
            <Tag className="LinkTag">{"React Native"}</Tag>
            <Tag className="LinkTag">{"Node.js"}</Tag>
            <Tag className="LinkTag">{"Mongo db"}</Tag>
            <Tag className="LinkTag">{"Express.js"}</Tag>
            <Tag className="LinkTag">{"Next.js"}</Tag>
          </div>
        </div>

        <div className="cardSections mt-10">
          <div className="cardSectionItem">
            <div className="cardSection__title">{jobsDictionary.salaryFor}</div>
            <div className="cardSection__body">{"user.name"}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {jobsDictionary.effectiveDate}
            </div>
            <div className="cardSection__body">
              {moment("09-22-2022").format("Do MMM YY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {jobsDictionary.basicSalary}
            </div>
            <div className="cardSection__body">{"basicSalary"}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {jobsDictionary.salaryFor}
            </div>
            <div className="cardSection__body">{"user.name"}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {jobsDictionary.effectiveDate}
            </div>
            <div className="cardSection__body">
              {moment("09-22-2022").format("Do MMM YY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {jobsDictionary.basicSalary}
            </div>
            <div className="cardSection__body">{"basicSalary"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailView;
