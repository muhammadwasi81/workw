import { useEffect, useState } from 'react';
import TopBar from '../../../sharedComponents/topBar/topBar';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../layout/header';
import {
  ContBody,
  TabbableContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer';
import { Table } from '../../../sharedComponents/customTable';
import { getAllRequestListItems } from '../store/action';
import { ROUTES } from '../../../../utils/routes';
import RequestList from './requestList';
import SideDrawer from '../../../sharedComponents/Drawer/SideDrawer';
import RequestListComposer from './composer/RequestListComposer';
import { ListTableColumn } from './tableColumn';

const Index = () => {
  const dispatch = useDispatch();

  const { requestItems, success } = useSelector(
    (state) => state.requestItemSlice
  );
  console.log(requestItems, 'Add requestItem index.js');

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(0);
  const [viewType, setViewType] = useState('List');
  const items = [
    {
      name: 'Request List Items',
      to: `${ROUTES.REQUEST_LIST_ITEM.DEFAULT}`,
      renderButton: [1],
    },
  ];

  const filterButtons = [
    {
      name: 'Request For Items',
      onClick: () => setFilterType(0),
    },
    {
      name: 'Created My be',
      onClick: () => setFilterType(1),
    },
    {
      name: 'Request For Items Approvals',
      onClick: () => setFilterType(2),
    },
  ];
  const onSearch = (value) => setSearch(value);
  const onSegment = (value) => setViewType(value);

  const payloadData = {
    pageNo: 1,
    pageSize: 20,
    search: '',
  };

  useEffect(() => {
    dispatch(getAllRequestListItems({ payloadData, filterType, search }));
  }, [filterType, search]);

  const buttons = [
    {
      buttonText: 'Create Request',
      render: (
        <SideDrawer
          success={success}
          isAccessDrawer={true}
          openDrawer={success}
          children={<RequestListComposer />}
          title="Create Request"
          buttonText="Create Request"
        />
      ),
    },
  ];

  const render = {
    List: <RequestList data={requestItems} />,
    Table: (
      <Table columns={ListTableColumn()} dragable={true} data={requestItems} />
    ),
  };

  return (
    <>
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
    </>
  );
};

export default Index;
