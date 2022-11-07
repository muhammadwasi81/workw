import { useState, useEffect } from 'react';
import { Table } from '../../../sharedComponents/customTable';
import Header from '../../../layout/header';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from '../../../../utils/routes';
import {
  ContBody,
  TabbableContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer';
import TopBar from '../../../sharedComponents/topBar/topBar';
import { getAllAssetItems } from '../../createAssets/store/action';
import { TableColumn } from './tableColumn';

const Index = () => {
  const dispatch = useDispatch();
  const { assetItemList } = useSelector((state) => state.AssetItemSlice);
  const [search, setSearch] = useState('');

  const items = [
    {
      name: 'Assets List',
      to: `${ROUTES.ASSETS_TABLE_LIST.DEFAULT}`,
      renderButton: [1],
    },
  ];

  const onSearch = (value) => setSearch(value);

  const payloadData = {
    pageNo: 1,
    pageSize: 20,
    search: '',
  };

  useEffect(() => {
    dispatch(getAllAssetItems({ payloadData, search }));
  }, [, search]);

  const render = {
    Table: (
      <Table columns={TableColumn()} dragable={true} data={assetItemList} />
    ),
  };

  return (
    <TabbableContainer>
      <Header items={items} />
      <TopBar onSearch={onSearch} />
      <ContBody>{render['Table']}</ContBody>
    </TabbableContainer>
  );
};

export default Index;
