import React, { useContext } from "react";
import { ExpenseDictionary } from "../localization";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { BiWorld } from "react-icons/bi";
import moment from "moment";
import { statusEnum } from "../enums";
import { expenseCategory } from "../enums/expenseCategory";
import Avatar from "../../../sharedComponents/Avatar/avatar";

function ExpenseList({ onExpense, expense }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList, Direction } = ExpenseDictionary[userLanguage];
  if (!Object || !Object?.keys(expense).length > 0) return null;
  const {
    creator: { name, image, designation },
    id,
    expenseDate,
    referenceNo,
    status,
    description,
    amount,
    categoryId,
    header,
    approvers,
    executors,
    financers,
  } = expense;
  const { labels } = ExpenseDictionaryList;
  let classes = "expenseCard ";
  classes += Direction === "rtl" ? "rtl" : "";
  const category = expenseCategory.filter((cate) => cate.id === categoryId)[0];
  return (
    <div className={classes} onClick={() => onExpense(id)}>
      <div className="expenseCard__header">
        <div className="left">
          <UserInfo
            avatarSrc={image}
            name={name}
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
          <div className="secondaryTag">
            {statusEnum.Approvers[status - 1].label}
          </div>
        </div>
      </div>
      <div className="expenseCard__body">
        <p className="expenseCard__para">{description}</p>
        <div className="expensedetail">
          <div className="expensedetail__header">
            <div className="left">
              <span className="primaryTag">
                {category.image}
                {category.name}
              </span>
              <span className="secondaryTag">
                {statusEnum.Approvers[status - 1].label}
              </span>
            </div>
            <div className="right">
              <p>Rs. {amount}</p>
            </div>
          </div>
          <div className="expensedetail__footer">
            <div className="left">
              <span>{labels.expenseDate}</span>
              <span> {moment(expenseDate).format("ddd,MMM DD,YYYY")}</span>
            </div>
            <div className="right">
              <span>{labels.header}:</span>
              <span> {header}</span>
            </div>
          </div>
        </div>
      </div>
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
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;
