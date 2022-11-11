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

const Index = () => {
  const dispatch = useDispatch();
  const { loader, assetItemList, drawerOpen } = useSelector(
    (state) => state.AssetItemSlice
  );

  console.log(drawerOpen, 'drawerOpen');
  const { success } = useSelector((state) => state.inventoryAssetSlice);

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
      name: 'Allocation For be',
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
          success={success}
          isAccessDrawer={true}
          openDrawer={success}
          children={<AssetComposer />}
          title="Add Assets Allocation"
          buttonText="Assets Allocation"
        />
      ),
    },
    {
      buttonText: 'De-allocation',
      render: (
        <SideDrawer
          success={drawerOpen}
          isAccessDrawer={true}
          openDrawer={drawerOpen}
          children={<AssetDeAllocationComposer />}
          title="De-Allocated Assets"
          buttonText="De-Allocation"
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
        {loader ? (
          <>
            <Skeleton avatar paragraph={{ rows: 4 }} />
          </>
        ) : (
          <ContBody>{render[viewType]}</ContBody>
        )}
      </TabbableContainer>
    </>
  );
};

export default Index;
