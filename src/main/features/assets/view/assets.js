import { useEffect, useState } from 'react';
import TopBar from '../../../sharedComponents/topBar/topBar';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../layout/header';
import AssetsList from './assetsList';
import {
  ContBody,
  TabbableContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer';
import { Table } from '../../../sharedComponents/customTable';
import { salaryTableColumn } from '../../salary/view/SalaryList/tableColumns';
import { getAllEmployeeSalary } from '../../salary/store/actions';
import { ROUTES } from '../../../../utils/routes';

const Assets = () => {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.salarySlice.salaryList);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(0);
  const [viewType, setViewType] = useState('List');

  const items = [
    {
      name: 'Salary',
      to: `${ROUTES.ASSETS}`,
      renderButton: [1],
    },
  ];

  const filterButtons = [
    {
      name: 'Assets',
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
    List: <AssetsList data={listData} />,
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

export default Assets;
