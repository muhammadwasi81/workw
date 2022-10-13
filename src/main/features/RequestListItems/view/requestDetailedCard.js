import { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  ItemHeader,
  SingleItem,
} from '../../../sharedComponents/Card/CardStyle';
import StatusTag from '../../../sharedComponents/Tag/StatusTag';
import SublineDesigWithTime from '../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime';
import UserInfo from '../../../sharedComponents/UserShortInfo/UserInfo';
import { getRequestListItemsById } from '../store/action';
import RemarksApproval from '../../../sharedComponents/AppComponents/Approvals/view';
import { ApprovalsModule } from '../../../sharedComponents/AppComponents/Approvals/enums';

const RequestDetailCard = (props) => {
  const dispatch = useDispatch();
  const { requestItems } = useSelector((state) => state.requestItemSlice);
  console.log(requestItems, 'Add requestItem');

  useEffect(() => {
    if (props.id) dispatch(getRequestListItemsById(props.id));
    console.log(props.id, 'props.id');
  }, [props.id]);

  const salaryDetail = useSelector((state) => state.salarySlice.salaryDetail);
  if (!salaryDetail) return <></>;

  if (!requestItems) return <></>;

  const { creator, createDate = moment(), approvers = [{}] } = salaryDetail;
  const requestItem = requestItems.find((item) => item.id === props.id);

  return (
    <SingleItem onClick={props.onClick}>
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
      </ItemHeader>
      <div className="cardSections">
        <div className="cardSectionItem">
          <div className="cardSection__title">Category</div>
          <div className="cardSection__body">{requestItem.categoryId}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Quantity</div>
          <div className="cardSection__body">{requestItem.quantity}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Ref No</div>
          <div className="cardSection__body">{requestItem.referenceNo}</div>
        </div>
      </div>

      <RemarksApproval
        data={approvers}
        title="Approvals"
        module={ApprovalsModule.SalaryApproval}
        onStatusChanged={() => {}}
      />
    </SingleItem>
  );
};

export default RequestDetailCard;
