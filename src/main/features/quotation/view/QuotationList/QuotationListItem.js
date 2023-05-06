import { useContext } from "react";
import {
  ItemHeader,
  SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import AvatarOld from "../../../../sharedComponents/Avatar/avatarOLD";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { quotationDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import CardProfileTopView from "../../../travel/view/ListView/CardProfileTopView";

function QuotationListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { quotationDictionary, Direction } = quotationDictionaryList[
    userLanguage
  ];
  const {
    creator,
    status = 1,
    referenceNo = "SAR-10001",
    createDate,
    id,
    name,
    phoneNumber,
    email,
    approvers,
  } = props.item;

  console.log(props.item, "***");

  return (
    <>
      <SingleItem
        className="Card3 formShortCard"
        onClick={() => props.onClick(id)}
      >
        <ItemHeader>
          <CardProfileTopView
            profileImgSrc={
              <AvatarOld
                width={40}
                height={40}
                src={creator.image}
                name={creator.name}
                round
              />
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
        <div className="cardSections mt-2">
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {quotationDictionary.clientsName}
            </div>
            <div className="cardSection__body">{name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {quotationDictionary.clientsEmail}
            </div>
            <div className="cardSection__body">{email}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {quotationDictionary.phoneNumber}
            </div>
            <div className="cardSection__body">{phoneNumber}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {quotationDictionary.approvers}
            </div>
            <div className="cardSection__body">
              {approvers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Approvers"}
                  membersData={approvers}
                  // image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default QuotationListItem;
