import { useSelector } from 'react-redux';

const MartialStatus = () => {
  const { employees } = useSelector((state) => state.employeeProfileSlice);
  if (employees.maritalStatusId === 1) {
    return <div>Single</div>;
  }
  if (employees.maritalStatusId === 2) {
    return <div>Engaged </div>;
  }
  if (employees.maritalStatusId === 3) {
    return <div>Married </div>;
  }
  if (employees.maritalStatusId === 4) {
    return <div>Divorced </div>;
  }
  if (employees.maritalStatusId === 5) {
    return <div>Widowed</div>;
  }
  if (employees.maritalStatusId === 6) {
    return <div>Widower</div>;
  }
  if (employees.maritalStatusId === 7) {
    return <div>PreferNotToSay </div>;
  }
};

export default MartialStatus;
