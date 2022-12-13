import EmployeeList from './employeeList';
import React, { useEffect } from 'react';
import { EmployeePanelContainer } from '../styles/employee.style';
import EmployeeRoutes from '../EmployeeUpdateRoutes/routes';
import { useParams } from 'react-router-dom';
import { getUserBasicInfo } from '../../../../basicInfo/store/actions';
import { resetBasicdetails } from '../../../store/slice';
import { useDispatch } from 'react-redux';

const EmployeesUpdate = () => {
  const { '*': id } = useParams();
  console.log(id, 'ID');
  const userId = id.split('/')[1];
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(id, 'ID Gareebon');

    dispatch(getUserBasicInfo(userId));

    return () => {
      dispatch(resetBasicdetails());
    };
  }, []);
  return (
    <>
      <EmployeePanelContainer>
        <EmployeeList id={id} />
        <EmployeeRoutes />
      </EmployeePanelContainer>
    </>
  );
};

export default EmployeesUpdate;
