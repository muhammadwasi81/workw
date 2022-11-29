import React from "react";
import { useDispatch } from "react-redux";
//import { rewardDictionaryList } from "../localization/index";
//import { loanDictionaryList } from "./localization/index";
//import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../sharedComponents/Card/CardStyle";
import Avatar from "../../sharedComponents/Avatar/avatar";
import AvatarOld from "../../sharedComponents/Avatar/avatarOLD";
import CardProfileTopView from "../travel/view/ListView/CardProfileTopView";

function ListItem(props) {
  const { onListItem = () => {} } = props;
  //const { userLanguage } = useContext(LanguageChangeContext);
  //const { Direction, rewardDictionary } = loanDictionaryList[userLanguage];
  // console.log("props for list item", props.item);
  const dispatch = useDispatch();
  // const { designation, name, image } = props.item.user || [];
  const {
    description,
    referenceNo,
    approvers,
    createDate,
    creator,
    userId,
    user,
    deductionPerMonth,
    deadline,
    status,
    amount,
  } = props.item || null;

  console.log(approvers);
  return (
    <>
      <SingleItem
        onClick={() => {
          onListItem(props.item.id);
        }}
      >
        <ItemHeader>
          <CardProfileTopView
            profileImgSrc={
              <AvatarOld
                width={40}
                height={40}
                src={user.image}
                name={user.name}
                round
              ></AvatarOld>
            }
            createDate={createDate}
            isPublic={true}
            name={creator && creator.name}
            destination={
              creator && creator.designation
                ? creator.designation
                : "Not Designated"
            }
            refNo={referenceNo}
            status={status}
            profileImgSize={40}
          />
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description w-full pt-3 pb-5 h-[100px]">
            <p> {description ? description : "No description"} </p>
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">Deduction per month</div>
            <div className="cardSection__body">
              {deductionPerMonth ? deductionPerMonth : ""}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Deadline</div>
            <div className="cardSection__body">
              {deadline
                ? moment(deadline).format("ddd,MMM DD,YYYY")
                : moment().format("ddd,MMM DD,YYYY")}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Amount</div>
            <div className="cardSection__body"> {amount ? amount : ""}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
            <div className="cardSection__body">
              {approvers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={approvers ? approvers : []}
                  text={"Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
