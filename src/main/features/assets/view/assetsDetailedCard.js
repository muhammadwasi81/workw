import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ItemHeader,
  SingleItem,
} from '../../../sharedComponents/Card/CardStyle';
import moment from 'moment';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';
import SublineDesigWithTime from '../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime';
import UserInfo from '../../../sharedComponents/UserShortInfo/UserInfo';
import RemarksApproval from '../../../sharedComponents/AppComponents/Approvals/view/index';
import { ApprovalsModule } from '../../../sharedComponents/AppComponents/Approvals/enums';
import { getAssetItemDetailById } from '../../createAssets/store/action';
import Avatar from '../../../sharedComponents/Avatar/avatar';
import TagAvatar from './../../../sharedComponents/Avatar/TagAvatar';

const AssetsDetailCard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.id) dispatch(getAssetItemDetailById(props.id));
  }, [props.id]);

  const assetItemByUserId = useSelector((state) => state.AssetItemSlice);
  if (!assetItemByUserId) return <></>;

  const creator = {
    createDate: moment(),
  };

  return (
    <SingleItem onClick={props.onClick}>
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={
              assetItemByUserId.assetItemByUserId.creator?.image
                ? assetItemByUserId.assetItemByUserId.creator?.image
                : `https://58.65.211.234:4436/Resources/cfe50d8d-7c47-4abb-9154-661daf129cec/Images/45f43115-c12f-4fc4-82ec-e570fbc13a70.jpeg`
            }
            name={assetItemByUserId.assetItemByUserId.creator?.name}
            Subline={
              <SublineDesigWithTime
                designation={
                  assetItemByUserId.assetItemByUserId.creator?.designation
                }
                time={moment(creator.createDate).fromNow()}
              />
            }
          />
        </div>
        <div className="right">
          <StatusTag className="IdTag">
            {assetItemByUserId.assetItemByUserId.status}
          </StatusTag>
        </div>
      </ItemHeader>
      <div className="cardSections" style={{ marginTop: '20px' }}>
        <div className="cardSectionItem">
          <div className="cardSection__title">Category</div>
          <div className="cardSection__body">
            {assetItemByUserId.assetItemByUserId.category
              ? assetItemByUserId.assetItemByUserId.category
              : 'N/A'}{' '}
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Value</div>
          <div className="cardSection__body">
            {assetItemByUserId.assetItemByUserId.value}
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Handover</div>
          <div className="cardSection__body">
            <TagAvatar
              text={
                assetItemByUserId.assetItemByUserId.handover?.name
                  ? assetItemByUserId.assetItemByUserId.handover?.name
                  : 'Not Assigned'
              }
              img={
                assetItemByUserId.assetItemByUserId.handover?.image
                  ? assetItemByUserId.assetItemByUserId.handover?.image
                  : 'https://konnect.im/upload/2022/10/88c35581-97aa-4e88-be91-584a667fd5eb.jpg'
              }
            />
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Approvers</div>
          <Avatar
            isAvatarGroup={true}
            heading={'approvers'}
            membersData={
              assetItemByUserId.assetItemByUserId.approvers
                ? assetItemByUserId.assetItemByUserId.approvers
                : []
            }
          />
        </div>
      </div>

      <RemarksApproval
        data={assetItemByUserId.assetItemByUserId.approvers}
        title="Approvals"
        module={ApprovalsModule?.ItemApproval}
        onStatusChanged={() => {}}
      />
    </SingleItem>
  );
};

export default AssetsDetailCard;
