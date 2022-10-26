import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../../layout/header';
import {
  ContBody,
  TabbableContainer,
} from '../../../../sharedComponents/AppComponents/MainFlexContainer';
import { Button } from 'antd';
import { ROUTES } from '../../../../../utils/routes';
import QuotationList from './quotationList';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllEmployeeSalary } from '../../store/actions';
import TopBar from '../../../../sharedComponents/topBar/topBar';
import { Table } from '../../../../sharedComponents/customTable';
import { useSelector } from 'react-redux';
import { quotationTableColumn } from './tableColumns';

function Quotations() {
  const listData = useSelector((state) => state.quotationSlice.quotationList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState(0);
  const [viewType, setViewType] = useState('List');
  const [search, setSearch] = useState('');

  const items = [
    {
      name: 'Qoutation',
      to: `${ROUTES.QOUTATION.ROOT}`,
      renderButton: [1],
    },
  ];
  const buttons = [
    {
      buttonText: '',
      render: (
        <Button className="ThemeBtn" onClick={() => navigate('create')}>
          {' '}
          Create Quotation{' '}
        </Button>
      ),
    },
  ];
  const filterButtons = [
    {
      name: 'Quotations',
      onClick: () => setFilterType(0),
    },
    {
      name: 'Created By Me',
      onClick: () => setFilterType(1),
    },
    {
      name: 'For Approval',
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
    List: <QuotationList data={listData} />,
    Table: (
      <Table columns={quotationTableColumn()} dragable={true} data={listData} />
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
          label1: 'List',
          label2: 'Table',
        }}
      />
      <ContBody>{render[viewType]}</ContBody>
    </TabbableContainer>
  );
}

export default Quotations;
