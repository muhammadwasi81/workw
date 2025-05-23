import React, { useContext, useState } from 'react';
import { ROUTES } from '../../../utils/routes';
import { LanguageChangeContext } from '../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../utils/localization/languages';
import {
  ContBody,
  TabbableContainer,
} from '../../sharedComponents/AppComponents/MainFlexContainer';
import { PlusOutlined } from '@ant-design/icons';
import EmployeeRoutes from './routes/employeeRoutes';
import { buttonsEnum } from './enum/enum';
import Header from '../../layout/header';
import { FeaturePermissionEnum } from '../../../utils/Shared/enums/featuresEnums';
import { useSelector } from 'react-redux';

const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const label = dictionaryList[userLanguage];
  const {user} = useSelector((state) => state.userSlice);
  const userPermissions = user.permissions

  const items = [
    {
      name: label.appHeader.employee.employees,
      to: ROUTES.EMPLOYEES.EMPLOYEELINK,
      renderButton: buttonsEnum.employee,
    },
  ];
  const buttons = [
    {
      buttonText: sharedLabels.AddEmployee,
      onClick: () => {},
      to: ROUTES.EMPLOYEES.ADD,
      icon: <PlusOutlined />,
    },
  ];
  return (
    <TabbableContainer>
      <Header items={items} buttons={userPermissions.includes(FeaturePermissionEnum.CreateEmployees) ? buttons : []} />
      <ContBody>
        <EmployeeRoutes />
      </ContBody>
    </TabbableContainer>
  );
};

export default Index;
