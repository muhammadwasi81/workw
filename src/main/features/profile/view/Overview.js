import OverviewDetail from '../UI/OverviewDetail';
import {
  FaGraduationCap,
  FaPhoneAlt,
  FaHandshake,
  FaBirthdayCake,
} from 'react-icons/fa';
import { BsBriefcaseFill, BsHeartFill } from 'react-icons/bs';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Skeleton } from 'antd';
import MartialStatus from './martialStatus';

const Overview = () => {
  const { employees, loader } = useSelector(
    (state) => state.employeeProfileSlice
  );
  console.log(employees, 'overview inside');

  return (
    <div className="flex flex-col p-3 gap-5 !text-[#85878B] pb-10">
      {loader ? (
        <Skeleton />
      ) : (
        <>
          <OverviewDetail
            icon={<FaGraduationCap />}
            heading={'Studied A- Levels at'}
            text={employees?.education ? employees?.education : 'No Education'}
          />
          <OverviewDetail
            icon={<BsBriefcaseFill />}
            heading={'Designation'}
            text={employees?.designation || 'No Designation'}
          />
          <OverviewDetail
            icon={<MdEmail />}
            heading={'Email'}
            text={
              employees?.personalEmail
                ? employees.personalEmail
                : 'john@test.com'
            }
          />
          <OverviewDetail
            icon={<BsHeartFill />}
            heading={'Relationship'}
            text={MartialStatus(employees?.maritalStatusId)}
          />

          <OverviewDetail
            icon={<MdLocationOn />}
            heading={'Lives in'}
            text={employees?.city || 'No City'}
          />

          <OverviewDetail
            icon={<FaPhoneAlt />}
            heading={'Contact'}
            text={employees?.phoneNo ? employees?.phoneNo : 'No Phone Number'}
          />

          <OverviewDetail
            icon={<FaHandshake />}
            heading={'Joining'}
            text={
              moment(employees?.joinDate).format('DD-MM-YYYY')
                ? moment(employees?.joinDate).format('DD-MM-YYYY')
                : 'No BirthDay'
            }
          />

          <OverviewDetail
            icon={<FaBirthdayCake />}
            heading={'BirthDay'}
            text={
              moment(employees?.birthDate).format('DD-MM-YYYY')
                ? moment(employees?.birthDate).format('DD-MM-YYYY')
                : 'No BirthDay'
            }
          />
        </>
      )}
    </div>
  );
};

export default Overview;
