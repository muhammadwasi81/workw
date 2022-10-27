import { Button, Image, Tag } from "antd";
import React, { useContext, useEffect } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
// import Avatar from "../../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { getQuotationById } from "../../store/actions";
import { useSelector } from "react-redux";
import AllowanceDetail from "./allowanceDetail";
import RemarksApproval from "../../../../sharedComponents/AppComponents/Approvals/view";
import { ApprovalsModule } from "../../../../sharedComponents/AppComponents/Approvals/enums";

function QuotationDetailCard(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.id) dispatch(getQuotationById(props.id));
  }, [props.id]);

  const quotationDetail = useSelector(
    (state) => state.quotationSlice.quotationDetail
  );
  if (!quotationDetail) return <></>;

  const {
    creator,
    details,
    email,
    name,
    phoneNumber,
    quotationDate,
    approvers,
    createDate,
  } = quotationDetail;
  console.log(quotationDetail, "Quotation detail");
  return (
    <>
      <SingleItem onClick={props.onClick}>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator?.image}
              name={creator?.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator.designation ? creator.designation : ""}
                  time={moment(createDate).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">TSK-000022</Tag>
            <StatusTag status={1}></StatusTag>
          </div>
        </ItemHeader>
        {/* <div className="description w-full pt-3 pb-5 h-[100px]">
          {description.length > 0 ? (
            <p>{description}</p>
          ) : (
            <p> No description </p>
          )}
        </div> */}
        <div className="mt-6 mb-6">
          {/* <Table dataSource={data} columns={columns} /> */}
          <table className="w-full text-center">
            <tr
              style={{ backgroundColor: "#526bb1", color: "#fff" }}
              // className="decoration-white"
            >
              <th>Description</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th></th>
            </tr>
            {/**
     //Map data of row wise from data     
  */}{" "}
            {details.map((el, i) => {
              return (
                <tr
                  className="text-center text-sm"
                  style={{ borderBottom: "0.5px solid rgb(207 199 199 / 85%)" }}
                >
                  <td>{el.item}</td>
                  <td>{el.price}</td>
                  <td>{el.quantity}</td>
                  <td>{el.tax}</td>
                </tr>
              );
            })}
          </table>
        </div>

        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">Client's name</div>
            <div className="cardSection__body">{name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Client's Email</div>
            <div className="cardSection__body">{email}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Phone Number</div>
            <div className="cardSection__body">{phoneNumber}</div>
          </div>
        </div>

        <AllowanceDetail details={details} />

        <RemarksApproval
          data={approvers}
          title="Approvals"
          module={ApprovalsModule.quotation}
          onStatusChanged={() => {}}
        />
      </SingleItem>
    </>
  );
}

export default QuotationDetailCard;
