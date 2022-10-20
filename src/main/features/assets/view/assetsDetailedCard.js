import { useEffect } from 'react';
import { Tag } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  ItemHeader,
  SingleItem,
} from '../../../sharedComponents/Card/CardStyle';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';
import SublineDesigWithTime from '../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime';
import UserInfo from '../../../sharedComponents/UserShortInfo/UserInfo';
import RemarksApproval from '../../../sharedComponents/AppComponents/Approvals/view/index';
import { ApprovalsModule } from '../../../sharedComponents/AppComponents/Approvals/enums';
import { getAssetItemDetailById } from '../../createAssets/store/action';
import Avatar from '../../../sharedComponents/Avatar/avatar';

const AssetsDetailCard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.id) dispatch(getAssetItemDetailById(props.id));
    console.log(props.id, 'getAssetItemDetailById props.id');
  }, [props.id]);

  const assetItemByUserId = useSelector((state) => state.AssetItemSlice);
  if (!assetItemByUserId) return <></>;
  console.log(
    assetItemByUserId.assetItemByUserId?.creator?.image,
    'assetItemByUserId.assetItemByUserId.creator.image'
  );
  return (
    <SingleItem onClick={props.onClick}>
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={
              assetItemByUserId.assetItemByUserId.image
                ? assetItemByUserId.assetItemByUserId.image
                : `https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\45f43115-c12f-4fc4-82ec-e570fbc13a70.jpeg`
            }
            name={assetItemByUserId.assetItemByUserId.name}
            Subline={
              <SublineDesigWithTime
                designation={assetItemByUserId.assetItemByUserId.designation}
                // time={moment(creator.createDate).fromNow()}
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
            {assetItemByUserId.assetItemByUserId.category}
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Value</div>
          <div className="cardSection__body">
            {assetItemByUserId.assetItemByUserId.value}
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Name</div>
          <div className="cardSection__body">
            {assetItemByUserId.assetItemByUserId.name}
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
        module={ApprovalsModule?.assetApproval}
        onStatusChanged={() => {}}
      />
    </SingleItem>
  );
};

export default AssetsDetailCard;
