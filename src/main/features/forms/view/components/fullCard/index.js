import React from "react";
import "./style.css";
import pdfIcon from "../../../../../../content/NewContent/Documents/file/PDF_DOC.svg";
import menuIcon from "../../../../../../content/NewContent/Documents/3dots.svg";
import favorateIcon from "../../../../../../content/NewContent/Documents/favorate.svg";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../../sharedComponents/Card/CardStyle";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import moment from "moment";
import { Button, Tag } from "antd";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import { dummyMember } from "../../../../task/view/TaskList/listItem";
import { getNameForImage } from "../../../../../../utils/base";

const DocFullCard = ({ icon, name, description }) => {
  return (
    <SingleItem>
      <ItemHeader>
        <div className={"item-header"}>
          <div className="left">
            <UserInfo
              avatarSrc={
                "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
              }
              name={"Abu Bakar"}
              Subline={
                <SublineDesigWithTime
                  designation={"Reactjs Developer"}
                  time={moment().format("DD/MM/YYYY")}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">TRA-000085</Tag>
            <StatusTag status={"In Proccess"}></StatusTag>
          </div>
        </div>
      </ItemHeader>

      <div className="doc_detail_body">
        <div className="doc_detail_content">
          <div className="doc_detail_body_head">
            <div className="doc_detail_title">New Dummy Documents</div>
            <div>
              <Button className="ThemeBtn">Download</Button>
            </div>
          </div>
          <div className="doc_detail_desc">
            <p>
              Test 123 Test 123 Test 123 Test 123 Test 123 Test 123 Test 123
              Test 123 Test 123 Test 123 Test 123 Test 123 Test 123 Test 123
              Test 123 Test 123 Test 123 Test 123
            </p>
          </div>

          <div className="card-column-view">
            <div className="card-column-item">
              <div className="column-item-head"> {"Approvers"} </div>
              <div className="SummaryMembers">
                <div className="mem">
                  {dummyMember.map((val, i) => {
                    if (i > 2) return "";
                    return val.profile_picture ? (
                      <div
                        key={`grpmem${i}`}
                        className="us-img"
                        style={{
                          backgroundImage: `url(${val.profile_picture})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                        }}
                      />
                    ) : (
                      <div key={`grpmem${i}`} className="us-img">
                        {getNameForImage(val.name)}
                      </div>
                    );
                  })}
                  {dummyMember ? (
                    dummyMember.length > 2 ? (
                      <div className="us-img">
                        {dummyMember && dummyMember.length - 2}+
                      </div>
                    ) : (
                      ""
                    )
                  ) : null}
                </div>
              </div>
            </div>

            <div className="card-column-item">
              <div className="column-item-head"> {"Downloaders"} </div>
              <div className="SummaryMembers">
                <div className="mem">
                  {dummyMember.map((val, i) => {
                    if (i > 2) return "";
                    return val.profile_picture ? (
                      <div
                        key={`grpmem${i}`}
                        className="us-img"
                        style={{
                          backgroundImage: `url(${val.profile_picture})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                        }}
                      />
                    ) : (
                      <div key={`grpmem${i}`} className="us-img">
                        {getNameForImage(val.name)}
                      </div>
                    );
                  })}
                  {dummyMember ? (
                    dummyMember.length > 2 ? (
                      <div className="us-img">
                        {dummyMember && dummyMember.length - 2}+
                      </div>
                    ) : (
                      ""
                    )
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="doc_detail_media">
          {/* <img src={DummyImage} alt="" /> */}
        </div>
      </div>
    </SingleItem>
  );
};

export default DocFullCard;
