import { useEffect, useState } from 'react';
import TopBar from '../../../sharedComponents/topBar/topBar';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../layout/header';
import {
  ContBody,
  TabbableContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer';
import { Table } from '../../../sharedComponents/customTable';
import { ROUTES } from '../../../../utils/routes';
import { getAllAssetItems } from '../../createAssets/store/action';
import AssetsList from './assetsList';
import { TableColumn } from './tableColumn';

const Index = () => {
  const dispatch = useDispatch();

  const { assetItemList } = useSelector((state) => state.AssetItemSlice);
  console.log(assetItemList, 'index.js list');

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(0);
  const [viewType, setViewType] = useState('List');

  const items = [
    {
      name: 'Assets',
      to: `${ROUTES.ASSETS.DEFAULT}`,
      renderButton: [1],
    },
  ];

  const filterButtons = [
    {
      name: 'Assets For Items',
      onClick: () => setFilterType(0),
    },
    {
      name: 'Created My be',
      onClick: () => setFilterType(1),
    },
    {
      name: 'Assets For Items Approvals',
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
    dispatch(getAllAssetItems({ payloadData, filterType, search }));
  }, [filterType, search]);

  const render = {
    List: <AssetsList data={assetItemList} />,
    Table: (
      <Table columns={TableColumn()} dragable={true} data={assetItemList} />
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
