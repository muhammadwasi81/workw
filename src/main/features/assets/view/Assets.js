import { useEffect, useState, useContext } from 'react';
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
import {
  handleOpenDeAllocComposer,
  handleAllocOpenComposer,
} from '../../createAssets/store/slice';
import { assetsDictionaryList } from '../localization/index';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';

const Assets = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { assetsDictionary } = assetsDictionaryList[userLanguage];
  const dispatch = useDispatch();

  const { assetItemList, drawerDeAllocOpen, drawerAllocOpen } = useSelector(
    (state) => state.AssetItemSlice
  );

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(0);
  const [viewType, setViewType] = useState('List');

  const items = [
    {
      name: assetsDictionary.assetsAllocation,
      to: `${ROUTES.ASSETS.ROOT}`,
      renderButton: [1, 2],
    },
  ];

  const filterButtons = [
    {
      name: assetsDictionary.allocationForMe,
      onClick: () => setFilterType(0),
    },
    {
      name: assetsDictionary.allocationApprovals,
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
      buttonText: assetsDictionary.assetsAllocation,
      render: (
        <SideDrawer
          title={assetsDictionary.addAssetsAllocation}
          buttonText={assetsDictionary.addAssetsAllocation}
          handleClose={() => dispatch(handleAllocOpenComposer(false))}
          handleOpen={() => dispatch(handleAllocOpenComposer(true))}
          isOpen={drawerAllocOpen}
          children={<AssetComposer />}
        />
      ),
    },
    {
      buttonText: assetsDictionary.deAllocation,
      render: (
        <SideDrawer
          title={assetsDictionary.deAllocation}
          buttonText={assetsDictionary.deAllocation}
          handleClose={() => dispatch(handleOpenDeAllocComposer(false))}
          handleOpen={() => dispatch(handleOpenDeAllocComposer(true))}
          isOpen={drawerDeAllocOpen}
          children={<AssetDeAllocationComposer />}
        />
      ),
    },
  ];

  const render = {
    List: <AssetsList data={assetItemList} />,
    Table: (
      <Table
        columns={TableColumn(assetsDictionary)}
        dragable={true}
        data={assetItemList ? assetItemList : []}
      />
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

export default Assets;
