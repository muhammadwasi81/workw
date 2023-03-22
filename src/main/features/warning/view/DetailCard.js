import React, { useContext, useEffect, useState } from 'react';
import { Button, Tag, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { warningDictionaryList } from '../localization/index';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import UserInfo from '../../../sharedComponents/UserShortInfo/UserInfo';
import SublineDesigWithTime from '../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';
import DefaultAttachment from '../../../../content/NewContent/warning/warningsDefaultAttachment.svg';
import Avatar from '../../../sharedComponents/Avatar/avatar';
import moment from 'moment';
import {
  ItemContent,
  ItemHeader,
} from '../../../sharedComponents/Card/CardStyle';
import RemarksApproval from '../../../sharedComponents/AppComponents/Approvals/view';
import {
  ApprovalsModule,
  ApprovalStatus,
} from '../../../sharedComponents/AppComponents/Approvals/enums';
import { cancelWarning, GetWarningById } from '../store/actions';
import { useDispatch } from 'react-redux';
import ConfirmationRemarkModal from '../../../sharedComponents/ConfirmationRemarkModal/ConfirmationRemarkModal';

function DetaileCard(props) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { warningDictionary } = warningDictionaryList[userLanguage];
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const { user } = useSelector((state) => state.userSlice);
  const [isOpen, setIsOpen] = useState(false);

  let userId = user.id;

  const { warningDetail, loadingData } = useSelector(
    (state) => state.warningSlice
  );
  console.log(warningDetail, 'warning detaill');
  let {
    InProcess,
    Approved,
    Declined,
    Resend,
    Inactive,
    NotRequired,
    Cancelled,
    ApprovalRequired,
    Hold,
    NoStatus,
  } = ApprovalStatus;

  useEffect(() => {
    props.id && dispatch(GetWarningById(props.id));
  }, [props.id]);

  const {
    creator,
    description,
    image = DefaultAttachment,
    category,
    status,
    createDate,
    members = [],
    approvers,
    referenceNo,
    id,
  } = warningDetail === null ? '' : warningDetail;

  const isTablet = useMediaQuery({ maxWidth: 800 });

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onFinish = (values) => {
    let id = warningDetail.id;
    let reason = values.remarks;
    setIsOpen(false);
    // dispatch(cancelReward({ id: id, reason: reason }));
  };

  if (loadingData) return <Skeleton />;

  return (
    <>
      {warningDetail && warningDetail.id && (
        <div className="detailedCard" id={props.id}>
          <ItemHeader>
            <div className="left">
              <UserInfo
                avatarSrc={creator && creator.image}
                name={creator && creator.name}
                Subline={
                  <SublineDesigWithTime
                    designation={
                      creator && creator.designation ? creator.designation : ''
                    }
                    time={moment
                      .utc(createDate)
                      .local()
                      .fromNow()}
                  />
                }
              />
            </div>
            <div className="right">
              <Tag className="IdTag">{referenceNo}</Tag>
              <StatusTag status={status}></StatusTag>
              {userId === creator && creator.id ? (
                status != Declined && status != Resend && status != Approved ? (
                  <Button
                    className="ThemeBtn"
                    onClick={(e) => handleCancel(e, id)}
                  >
                    Cancel
                  </Button>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
            </div>
          </ItemHeader>
          <ItemContent className="flex">
            <div className="description w-full">
              <p>{description}</p>
            </div>
          </ItemContent>
          <div className="cardSections">
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {warningDictionary.category}
              </div>
              <div className="cardSection__body">
                <Tag className="IdTag">
                  {category ? category : 'Default Category'}
                </Tag>
              </div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {warningDictionary.warningTo}
              </div>
              <div className="cardSection__body">
                {members && (
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={'Members'}
                    membersData={members}
                    text={'Members'}
                    image={'https://joeschmoe.io/api/v1/random'}
                  />
                )}
              </div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {warningDictionary.approvers}
              </div>
              <div className="cardSection__body">
                {approvers && (
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={'Approvers'}
                    membersData={approvers}
                    text={'Approvers'}
                    image={'https://joeschmoe.io/api/v1/random'}
                  />
                )}
              </div>
            </div>
          </div>
          <RemarksApproval
            module={ApprovalsModule.WarningApproval}
            reference={warningDetail.id}
            status={status}
            onStatusChanged={(status) => {
              setUpdatedStatus((prev) => {
                return { ...prev, ...status };
              });
            }}
            data={approvers}
            title="Approvers"
          />
        </div>
      )}
      <ConfirmationRemarkModal
        isOpen={isOpen}
        onCancel={onClose}
        onFinish={onFinish}
      />
    </>
  );
}

export default DetaileCard;
