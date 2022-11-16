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
import SideDrawer from '../../../sharedComponents/Drawer/SideDrawer';
import AssetComposer from './composer/assetAllocationComposer';
import AssetDeAllocationComposer from './composer/deAllocationComposer';
import { Skeleton } from 'antd';
import { handleOpenComposer } from '../store/slice';
import { handleDeAllocationComposer } from '../../createAssets/store/slice';

const Index = () => {
  const dispatch = useDispatch();

  const { inventoryDrawerOpen } = useSelector(
    (state) => state.inventoryAssetSlice
  );
  console.log(inventoryDrawerOpen, 'inventoryDrawerOpen');

  const { assetItemList, assetDrawerOpen } = useSelector(
    (state) => state.AssetItemSlice
  );
  console.log(assetDrawerOpen, 'assetDrawerOpen');

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(0);
  const [viewType, setViewType] = useState('List');

  const items = [
    {
      name: 'Assets Allocation',
      to: `${ROUTES.ASSETS.DEFAULT}`,
      renderButton: [1, 2],
    },
  ];

  const filterButtons = [
    {
      name: 'Allocation For Me',
      onClick: () => setFilterType(0),
    },
    {
      name: 'Allocation Approvals',
      onClick: () => setFilterType(1),
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

  const buttons = [
    {
      buttonText: 'Assets Allocation',
      render: (
        <SideDrawer
          title={'Create Assets'}
          buttonText={'Add Assets Allocation'}
          handleClose={() => dispatch(handleOpenComposer(false))}
          handleOpen={() => dispatch(handleOpenComposer(true))}
          isOpen={inventoryDrawerOpen}
          children={<AssetComposer />}
        />
      ),
    },
    {
      buttonText: 'De-allocation',
      render: (
        <SideDrawer
          title={'De-Allocated Assets'}
          buttonText={'De-Allocation'}
          handleClose={() => dispatch(handleDeAllocationComposer(false))}
          handleOpen={() => dispatch(handleDeAllocationComposer(true))}
          isOpen={assetDrawerOpen}
          children={<AssetDeAllocationComposer />}
        />
      ),
    },
  ];

  const render = {
    List: <AssetsList data={assetItemList} />,
    Table: (
      <Table columns={TableColumn()} dragable={true} data={assetItemList} />
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
        {/* {loader || inventoryLoader ? (
          <>
            <Skeleton avatar paragraph={{ rows: 4 }} />
          </>
        ) : ( */}
        <ContBody>{render[viewType]}</ContBody>
        {/* )} */}
      </TabbableContainer>
    </>
  );
};

export default Index;
