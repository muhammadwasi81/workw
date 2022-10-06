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
import { getEmployeeSalaryDetail } from '../../salary/store/actions';
import RemarksApproval from '../../../sharedComponents/AppComponents/Approvals/view/index';
import { ApprovalsModule } from '../../../sharedComponents/AppComponents/Approvals/enums';

const AssetsDetailCard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.id) dispatch(getEmployeeSalaryDetail(props.id));
  }, [props.id]);

  const salaryDetail = useSelector((state) => state.salarySlice.salaryDetail);
  if (!salaryDetail) return <></>;
  const {
    creator,
    basicSalary,
    details,
    netSalary,
    description = 'Salary Description here',
    approvers = [{}],
    status = 1,
    referenceNo = 'SAR-10001',
    createDate = moment(),
    effectiveDate = moment(),
    user,
  } = salaryDetail;

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
        <div className="right">
          <Tag className="IdTag">{referenceNo}</Tag>
          <StatusTag status={status}></StatusTag>
        </div>
      </ItemHeader>
      <div className="description w-full pt-3 pb-5 h-[100px]">
        {description.length > 0 ? (
          <p>{description}</p>
        ) : (
          <p> No description </p>
        )}
      </div>

      <div className="cardSections">
        <div className="cardSectionItem">
          <div className="cardSection__title">Salary For</div>
          <div className="cardSection__body">{user.name}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Effective Date</div>
          <div className="cardSection__body">
            {moment(effectiveDate).format('Do MMM YY')}
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Basic Salary</div>
          <div className="cardSection__body">{basicSalary}</div>
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

export default AssetsDetailCard;
