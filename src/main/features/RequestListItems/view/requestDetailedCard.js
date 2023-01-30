import { useEffect, useContext } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  ItemHeader,
  SingleItem,
} from '../../../sharedComponents/Card/CardStyle';
import SublineDesigWithTime from '../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime';
import UserInfo from '../../../sharedComponents/UserShortInfo/UserInfo';
import { getRequestListItemsById } from '../store/action';
import RemarksApproval from '../../../sharedComponents/AppComponents/Approvals/view';
import { ApprovalsModule } from '../../../sharedComponents/AppComponents/Approvals/enums';
import { Tag, Skeleton } from 'antd';
import Avatar from '../../../sharedComponents/Avatar/avatar';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';
import { requestListDictionaryList } from '../localization/index';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';

const RequestDetailCard = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { requestListDictionary } = requestListDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const { requestItemDetail } = useSelector((state) => state.requestItemSlice);
  console.log(requestItemDetail, 'requestItemDetail');
  useEffect(() => {
    if (props.id) dispatch(getRequestListItemsById(props.id));
  }, [props.id]);

  const creator = {
    businessId: 'cfe50d8d-7c47-4abb-9154-661daf129cec'
      ? 'cfe50d8d-7c47-4abb-9154-661daf129cec'
      : '',
    designation: '',
    email: 'owais@miletap.com',
    id: '77546782-aa7a-4984-9388-5fd044c0fb11',
    image:
      'https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\45f43115-c12f-4fc4-82ec-e570fbc13a70.jpeg',
    name: 'Owais Shaikh',
    type: 1,
    userTypeId: 2,
    createDate: moment(),
  };

  if (requestItemDetail.loadingData) return <Skeleton />;
  console.log(requestItemDetail.loadingData, 'loading data');

  return (
    <SingleItem onClick={props.onClick}>
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={
              requestItemDetail.creator?.image
                ? requestItemDetail.creator?.image
                : 'https://58.65.211.234:4436/Resources/cfe50d8d-7c47-4abb-9154-661daf129cec/Images/45f43115-c12f-4fc4-82ec-e570fbc13a70.jpeg'
            }
            name={requestItemDetail.creator?.name}
            Subline={
              <SublineDesigWithTime
                designation={
                  requestItemDetail.creator?.designation
                    ? requestItemDetail.creator?.designation
                    : ''
                }
                time={moment(creator.createDate).fromNow()}
              />
            }
          />
        </div>
        <div className="right">
          <Tag className="IdTag">{requestItemDetail.referenceNo}</Tag>
          <StatusTag status={requestItemDetail.status}></StatusTag>
        </div>
      </ItemHeader>
      <div className="cardSections" style={{ marginTop: '20px' }}>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {requestListDictionary.categoryName}
          </div>
          <div className="cardSection__body">{requestItemDetail.category}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {' '}
            {requestListDictionary.quantity}
          </div>
          <div className="cardSection__body">{requestItemDetail.quantity}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {' '}
            {requestListDictionary.approvers}
          </div>
          <div className="cardSection__body">
            <Avatar
              isAvatarGroup={true}
              heading={'approvers'}
              membersData={
                requestItemDetail.approvers ? requestItemDetail.approvers : []
              }
            />
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {' '}
            {requestListDictionary.assetController}
          </div>
          <div className="cardSection__body">
            <Avatar
              isAvatarGroup={true}
              heading={'approvers'}
              membersData={
                requestItemDetail.assetController
                  ? requestItemDetail.assetController
                  : []
              }
            />
          </div>
        </div>
      </div>
      <RemarksApproval
        data={requestItemDetail.approvers}
        title={requestListDictionary.approvals}
        module={ApprovalsModule.RequestForItemApproval}
        onStatusChanged={() => {}}
      />
    </SingleItem>
  );
};

export default RequestDetailCard;
