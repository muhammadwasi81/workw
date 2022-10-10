import { Image, Tag } from "antd";
import "../style.css";
import React, { useContext } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import RemarksApproval from "../../../../sharedComponents/AppComponents/Approvals/view";
import Header from "../../../../layout/header";
//import { ContBody, TabbableContainer } from "../../../../.../sharedComponents/AppComponents/MainFlexContainer";
import { ContBody } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import moment from "moment";
import { Button } from "antd";
// import { SearchOutlined } from '@ant-design/icons';
// import { Button, Tooltip } from 'antd';
///import 'antd/dist/antd.css';
import { Collapse } from "antd";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
const { Panel } = Collapse;
// import {
//   ItemContent,
//   ItemHeader,
//   SingleItem,
// } from "../../../../sharedComponents/Card/CardStyle";

function ListItem(props) {
  return (
    <>
      <Header></Header>
      {/* <Collapse>
      <Panel></Panel>
    </Collapse> */}

      {/* <Tooltip title="search">
      <Button shape="circle" icon={<SearchOutlined />} />
    </Tooltip>   */}
      {/* <ContBody>
        <CreateSalaryVoucher defaultRows={12} />
    </ContBody> */}
      <div className="requisation-container">
        <CardWrapper>
          <div className="left">
            <UserInfo
              avatarSrc={""}
              name={"Daniyal Khan"}
              Subline={
                <SublineDesigWithTime
                  designation={"Default Designation"}
                  time={moment().format("DD/MM/YYYY")}
                />
              }
            />
            <div className="left-container">
              <Button type="primary" className="approve-btn">
                Approvers
              </Button>
              <Button type="primary" className="copy-btn">
                Copy Link
              </Button>
              <Button type="primary" className="copy-btn">
                {" "}
                Link
              </Button>
            </div>
          </div>
          {/* <div className="cardSections">
           <div className="cardSectionItem">
            </div>
          </div>
           */}

          {/* <div className="cardSection__body">
              <Avatar
                //isAvatarGroup={true}
                heading={"approvers"}
                //membersData={approvers ? approvers : []}
              />
            </div> */}
        </CardWrapper>
      </div>
    </>
  );
}

export default ListItem;
