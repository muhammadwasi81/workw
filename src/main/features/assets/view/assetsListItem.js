import moment from 'moment';
import Avatar from '../../../sharedComponents/Avatar/avatar';
import {
  ItemHeader,
  SingleItem,
} from '../../../sharedComponents/Card/CardStyle';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';
import SublineDesigWithTime from '../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime';
import UserInfo from '../../../sharedComponents/UserShortInfo/UserInfo';

const AssetsListItem = (props) => {
  const {
    creator = {
      businessId: 'cfe50d8d-7c47-4abb-9154-661daf129cec',
      designation: '',
      email: 'owais@miletap.com',
      id: '77546782-aa7a-4984-9388-5fd044c0fb11',
      image:
        'https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\45f43115-c12f-4fc4-82ec-e570fbc13a70.jpeg',
      name: 'Owais Shaikh',
      type: 1,
      userTypeId: 2,
    },
    createDate = moment(),
    category,
    name,
    id,
    approvers = [{}],
    value,
  } = props.item;

  return (
    <>
      <SingleItem onClick={() => props.onClick(id)}>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={
                creator?.image
                  ? creator?.image
                  : 'https://58.65.211.234:4436/Resources/cfe50d8d-7c47-4abb-9154-661daf129cec/Images/45f43115-c12f-4fc4-82ec-e570fbc13a70.jpeg'
              }
              name={creator?.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator?.designation ? creator?.designation : ''}
                  time={moment(createDate).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <StatusTag status={creator.status}></StatusTag>
          </div>
        </ItemHeader>
        <div className="cardSections" style={{ marginTop: '30px' }}>
          <div className="cardSectionItem">
            <div className="cardSection__title">Category Name</div>
            <div className="cardSection__body">
              {category ? category : 'N/A'}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Qty</div>
            <div className="cardSection__body">{value}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Name</div>
            <div className="cardSection__body">{name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Approvers</div>
            <div className="cardSection__body">
              <Avatar
                isAvatarGroup={true}
                heading={'approvers'}
                membersData={approvers ? approvers : []}
              />
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
};

export default AssetsListItem;
