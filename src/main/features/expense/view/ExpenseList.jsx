import React, { useContext } from "react";
import { PieChartOutlined, GlobalOutlined } from "@ant-design/icons";
import { getNameForImage } from "../../../../utils/base";
import { ExpenseDictionary } from "../localization";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
function ExpenseList({ onExpense }) {
  const dummyMember = [
    {
      profile_picture:
        "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
      name: "Abu Bakar",
    },
    {
      profile_picture:
        "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
      name: "Abu Bakar",
    },
    {
      profile_picture:
        "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
      name: "Abu Bakar",
    },
    {
      profile_picture:
        "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
      name: "Abu Bakar",
    },
    {
      profile_picture:
        "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
      name: "Abu Bakar",
    },
  ];
  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList, Direction } = ExpenseDictionary[userLanguage];

  const { labels } = ExpenseDictionaryList;
  let classes = "expenseCard ";
  classes += Direction === "rtl" ? "rtl" : "";
  return (
    <div className={classes} onClick={() => onExpense(1)}>
      <div className="expenseCard__header">
        <div className="left">
          <UserInfo
            avatarSrc=""
            name="Abu Bakar"
            Subline={
              <SublineDesigWithTime
                designation="ReactJs Developer"
                time="2 days ago"
                icon={<GlobalOutlined />}
              />
            }
          />
        </div>
        <div className="right">
          <div className="primaryTag">Exp-000085</div>
          <div className="secondaryTag">{labels.inProcess}</div>
        </div>
      </div>
      <div className="expenseCard__body">
        <p className="expenseCard__para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          fuga tempora et deleniti ex ab eos neque quae libero! Cumque officia
          labore, corrupti animi iste quis veritatis quibusdam consequatur
          possimus!
        </p>
        <div className="expensedetail">
          <div className="expensedetail__header">
            <div className="left">
              <span className="primaryTag">
                <PieChartOutlined />
                {labels.transport}
              </span>
              <span className="secondaryTag">{labels.inProcess}</span>
            </div>
            <div className="right">
              <p>Rs. 10000</p>
            </div>
          </div>
          <div className="expensedetail__footer">
            <div className="left">
              <span>{labels.expenseDate}</span>
              <span> Thu,Oct 14 ,2021</span>
            </div>
            <div className="right">
              <span>{labels.header}:</span>
              <span> CEO Office</span>
            </div>
          </div>
        </div>
      </div>
      <div className="expenseCard__footer">
        <div className="card-column-view">
          <div className="card-column-item">
            <div className="column-item-head"> {labels.approvers} </div>
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
            <div className="column-item-head"> {labels.executor} </div>
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
            <div className="column-item-head"> {labels.finance} </div>
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
    </div>
  );
}

export default ExpenseList;
