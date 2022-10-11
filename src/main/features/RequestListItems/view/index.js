import { useEffect, useState } from 'react';
import TopBar from '../../../sharedComponents/topBar/topBar';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../layout/header';
import {
  ContBody,
  TabbableContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer';
import { Table } from '../../../sharedComponents/customTable';
import { salaryTableColumn } from '../../salary/view/SalaryList/tableColumns';
import { getAllEmployeeSalary } from '../../salary/store/actions';
import { ROUTES } from '../../../../utils/routes';
import RequestList from './requestList';

const Index = () => {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.salarySlice.salaryList);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(0);
  const [viewType, setViewType] = useState('List');

  const items = [
    {
      name: 'Request List Items',
      to: `${ROUTES.REQUEST_LIST_ITEM}`,
      renderButton: [1],
    },
  ];

  const filterButtons = [
    {
      name: 'Request For Items',
      onClick: () => setFilterType(0),
    },
    {
      name: 'Request For Items Approvals',
      onClick: () => setFilterType(1),
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
    List: <RequestList data={listData} />,
    Table: (
      <Table columns={salaryTableColumn()} dragable={true} data={listData} />
    ),
  };

  return (
    <>
      <TabbableContainer>
        <Header items={items} />
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
    </>
  );
};

export default Index;
