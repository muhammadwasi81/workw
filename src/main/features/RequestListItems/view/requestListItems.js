import React from 'react';
import {
  ItemHeader,
  SingleItem,
} from '../../../sharedComponents/Card/CardStyle';
import UserInfo from '../../../sharedComponents/UserShortInfo/UserInfo';
import moment from 'moment';
import SublineDesigWithTime from '../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime';
import { Tag } from 'antd';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';
import Avatar from '../../../sharedComponents/Avatar/avatarOLD';

const RequestListItems = (props) => {
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
    approvers = [{}],
    status = 1,
    createDate = moment(),
  } = props.item;

  const { categoryId, quantity, referenceNo, id } = props.item;

  return (
    <SingleItem onClick={() => props.onClick(id)}>
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={creator.image}
            name={creator.name}
            Subline={
              <SublineDesigWithTime
                designation={creator.designation ? creator.designation : ''}
                time={moment(createDate).fromNow()}
              />
            }
          />
        </div>
        <div className="right">
          <Tag className="IdTag">{creator.referenceNo}</Tag>
          <StatusTag status={status}></StatusTag>
        </div>
      </ItemHeader>
      <div className="cardSections" style={{ marginTop: '30px' }}>
        <div className="cardSectionItem">
          <div className="cardSection__title">Category Name</div>
          <div className="cardSection__body">{categoryId}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Qty</div>
          <div className="cardSection__body">{quantity}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Ref No</div>
          <div className="cardSection__body">{referenceNo}</div>
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
  );
};

export default RequestListItems;
