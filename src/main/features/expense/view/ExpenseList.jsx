import React, { useContext } from "react";
import { ExpenseDictionary } from "../localization";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { BiWorld } from "react-icons/bi";
import moment from "moment";
import { expenseCategory } from "../enums/expenseCategory";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { getStatusLabelAndColor } from "../../../sharedComponents/AppComponents/Approvals/enums";
import { ApprovalDictionary } from "../../../sharedComponents/AppComponents/Approvals/localization";
import Attachments from "../../travel/view/UI/Attachments";
import { referenceHandler } from "./utils";
import "../style/style.css";

function ExpenseList({
  onExpense = () => {},
  expense,
  updateStatus,
  isDetail = false,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList, Direction } = ExpenseDictionary[userLanguage];
  const { status: statusLabels } = ApprovalDictionary[userLanguage];
  if (!Object || !Object?.keys(expense)?.length > 0) return null;
  const {
    creator: { name, image, designation },
    id,
    expenseDate,
    referenceNo,
    status,
    description,
    amount,
    categoryId,
    creator,
    header,
    approvers,
    executors,
    financers,
    attachments,
  } = expense;

  const { labels } = ExpenseDictionaryList;
  let classes = "expenseCard ";
  classes += Direction === "rtl" ? "rtl" : "";
  const category = expenseCategory.filter((cate) => cate.id === categoryId)[0];
  const { label, color } = getStatusLabelAndColor("", statusLabels)[
    updateStatus || status
  ];

  return (
    <div className={classes} onClick={() => onExpense(id)}>
      <div className="expenseCard__header">
        <div className="left">
          <UserInfo
            avatarSrc={image}
            name={name}
            status={creator.userActiveStatus}
            profileId={creator.id}
            Subline={
              <SublineDesigWithTime
                designation={designation}
                time={moment(expenseDate).fromNow()}
                icon={<BiWorld />}
              />
            }
          />
        </div>
        <div className="right">
          <div className="primaryTag">{referenceNo}</div>
          <div className="secondaryTag" style={{ background: color }}>
            {label}
          </div>
        </div>
      </div>
      <div className="expenseCard__body">
        <p className="expenseCard__para">{description}</p>
        <div className="!w-max m-4 ml-auto attachmentBox">
          <Attachments
            data={attachments}
            key={{ data: attachments }}
            toShow={1}
            onClick={() => {}}
            size={"50px"}
          />
        </div>
        <div className="expensedetail">
          <div className="expensedetail__header">
            <div className="left">
              <span className="primaryTag">
                {category.image}
                {category.name}
              </span>
              {/* <span className="secondaryTag">{label}</span> */}
              {expense.referenceType !== 1 ? (
                <div className="referenceType bg-gray-300 rounded-md h-[34px] w-[80px] border border-[#526bb1] text-center text-[#526bb1]">
                  <span className="text-gray-500 text-xs">
                    {referenceHandler(expense.referenceType) || "N/A"}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="right">
              <p>Rs. {amount}</p>
            </div>
          </div>
          <div className="expensedetail__footer">
            <div className="left">
              <span>{labels.expenseDate}</span>
              <span> {moment(expenseDate).format("DD MMM YYYY")}</span>
            </div>
            <div className="right">
              <span>{labels.header}:</span>
              <span> {header}</span>
            </div>
          </div>
        </div>
      </div>
      {!isDetail ? (
        <div className="expenseCard__footer">
          <div className="card-column-view">
            <div className="card-column-item">
              <div className="column-item-head"> {labels.approvers} </div>
              <div className="SummaryMembers">
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={approvers}
                  text={"Danish"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              </div>
            </div>
            <div className="card-column-item">
              <div className="column-item-head"> {labels.executor} </div>
              <div className="SummaryMembers">
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={executors}
                  text={"Danish"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              </div>
            </div>
            <div className="card-column-item">
              <div className="column-item-head"> {labels.finance} </div>
              <div className="SummaryMembers">
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={financers}
                  text={"Danish"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              </div>
            </div>
            <div className="card-column-item">
              {/* <div className="column-item-head">{labels.type}</div> */}
              {/* <div className="referenceType bg-gray-300 rounded-md h-[34px] w-[80px] px-2">
                {referenceHandler(expense.referenceType) || "N/A"}
              </div> */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ExpenseList;
