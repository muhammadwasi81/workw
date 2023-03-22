import { Image, Tag } from 'antd';
import React, { useContext } from 'react';
import { customApprovalDictionaryList } from '../localization/index';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import UserInfo from '../../../sharedComponents/UserShortInfo/UserInfo';
import SublineDesigWithTime from '../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';
import customApprovalIcon from '../../../../content/svg/menu/newNavBarIcon/Custom Approval.svg';
import { PieChartOutlined } from '@ant-design/icons';
import Avatar from '../../../sharedComponents/Avatar/avatar';
import Attachments from '../../travel/view/UI/Attachments';
import './style/customApproval.css';

import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from '../../../sharedComponents/Card/CardStyle';
import moment from 'moment';
import { Category } from 'emoji-mart';
import { AttachmentType } from '../../documents/constant';

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[
    userLanguage
  ];

  const {
    creator,
    description,
    image = customApprovalIcon,
    approvers = [],
    status,
    referenceNo,
    category,
    value,
    createDate,
    attachments,
    subject,
  } = props.item;
  console.log(creator.image, 'name of creator');
  console.log(attachments, 'attatchments!!');
  return (
    <>
      <SingleItem>
        <div
          className="new"
          id={props.id}
          onClick={() => {
            props.getCustomApprovalId(props.id);
          }}
        ></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator.designation ? creator.designation : ''}
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
          </div>
        </ItemHeader>
        <ItemContent className="item-content flex">
          <div className="description custom-description">
            <p>{description}</p>
          </div>
          <div className="!w-max m-4 ml-auto attachmentBox">
            <Attachments
              data={attachments}
              key={{ data: attachments }}
              toShow={1}
              onClick={() => {}}
              size={'60px'}
            />
            {/* {attachments.map((i) => {
              return <img width={"100%"} src={i.path} />;
            })} */}
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {customApprovalDictionary.subject}
            </div>
            <div className="cardSection__body layout">{subject}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {customApprovalDictionary.category}
            </div>
            <div className="cardSection__body">{category}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {customApprovalDictionary.amount}
            </div>
            <div className="cardSection__body">{value}</div>
          </div>
          {/* <div className="cardSectionItem">
          <div className="cardSection__title">{customApprovalDictionary.days}</div>
          <div className="cardSection__body">{customApprovalDictionary.days}</div>
        </div> */}
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {customApprovalDictionary.approvers}
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
      </SingleItem>
    </>
  );
}

export default ListItem;
