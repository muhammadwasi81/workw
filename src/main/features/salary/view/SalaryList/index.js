import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../../layout/header';
import {
  ContBody,
  TabbableContainer,
<<<<<<< HEAD
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button } from "antd";
import { ROUTES } from "../../../../../utils/routes";
import SalaryList from "./salaryList";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllEmployeeSalary } from "../../store/actions";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { Table } from "../../../../sharedComponents/customTable";
import { useSelector } from "react-redux";
import { salaryTableColumn } from "./tableColumns";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import {salaryDictionary} from "../../../salary/localization/index";
=======
} from '../../../../sharedComponents/AppComponents/MainFlexContainer';
import { Button } from 'antd';
import { ROUTES } from '../../../../../utils/routes';
import SalaryList from './salaryList';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllEmployeeSalary } from '../../store/actions';
import TopBar from '../../../../sharedComponents/topBar/topBar';
import { Table } from '../../../../sharedComponents/customTable';
import { useSelector } from 'react-redux';
import { salaryTableColumn } from './tableColumns';
>>>>>>> 31585a075a8e6a8d20f6191883a2aa64ee8ca313

function Salaries() {

  const { userLanguage } = useContext(LanguageChangeContext);
  const { salary_Dictionary } = salaryDictionary[userLanguage];

  const listData = useSelector((state) => state.salarySlice.salaryList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState(0);
  const [viewType, setViewType] = useState('List');
  const [search, setSearch] = useState('');

  const items = [
    {
<<<<<<< HEAD
      name: salary_Dictionary.Salary,
     
=======
      name: 'Salary',
>>>>>>> 31585a075a8e6a8d20f6191883a2aa64ee8ca313
      to: `${ROUTES.SALARY.ROOT}`,
      renderButton: [1],
    },
  ];
  const buttons = [
    {
      buttonText: '',
      render: (
<<<<<<< HEAD
        <Button className="ThemeBtn" onClick={() => navigate("create")}>
          {" "}
          {salary_Dictionary.CreateSalary}{" "}
        
=======
        <Button className="ThemeBtn" onClick={() => navigate('create')}>
          {' '}
          Create Salary{' '}
>>>>>>> 31585a075a8e6a8d20f6191883a2aa64ee8ca313
        </Button>
      ),
    },
  ];
  const filterButtons = [
    {
<<<<<<< HEAD
      name: salary_Dictionary.Salaries,
      
      onClick: () => setFilterType(0),
    },
    {
      name: salary_Dictionary.CreatedByMe,
     
      onClick: () => setFilterType(1),
    },
    {
      name: salary_Dictionary.ForApproval,
    
=======
      name: 'Salaries',
      onClick: () => setFilterType(0),
    },
    {
      name: 'Created By Me',
      onClick: () => setFilterType(1),
    },
    {
      name: 'For Approval',
>>>>>>> 31585a075a8e6a8d20f6191883a2aa64ee8ca313
      onClick: () => setFilterType(2),
    },
  ];
  const onSearch = (value) => setSearch(value);
  const onSegment = (value) => setViewType(value);
  useEffect(() => {
    dispatch(
      getAllEmployeeSalary({
        filterType,
        search,
      })
    );
  }, [filterType, search]);

  const render = {
    List: <SalaryList data={listData} />,
    Table: (
      <Table columns={salaryTableColumn()} dragable={true} data={listData} />
    ),
  };
  return (
    <TabbableContainer>
      <Header items={items} buttons={buttons} />
      <TopBar
        onSearch={onSearch}
        buttons={filterButtons}
        segment={{
          onSegment,
<<<<<<< HEAD
          label1: salary_Dictionary.List ,           
          label2: salary_Dictionary.Table,          
=======
          label1: 'List',
          label2: 'Table',
>>>>>>> 31585a075a8e6a8d20f6191883a2aa64ee8ca313
        }}
      />
      <ContBody>{render[viewType]}</ContBody>
    </TabbableContainer>
  );
}

export default Salaries;
