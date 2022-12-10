import { useState, useEffect, useContext } from "react";
import { Table } from "../../../sharedComponents/customTable";
import Header from "../../../layout/header";
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from "../../../../utils/routes";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import TopBar from "../../../sharedComponents/topBar/topBar";
import { getAllAssetItems } from "../../createAssets/store/action";
import { TableColumn } from "./tableColumn";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import AssetComposer from "../../assets/view/composer/assetAllocationComposer";
import { handleOpenComposer } from "../../assets/store/slice";
import { assestsListDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { assestsListDictionary, Direction } = assestsListDictionaryList[
    userLanguage
  ];
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { assetDrawerOpen, assetItemList, success } = useSelector(
    (state) => state.AssetItemSlice
  );
  console.log(assetDrawerOpen, "assetsTableList");

  const items = [
    {
      name: assestsListDictionary.assetsList,
      to: `${ROUTES.ASSETS_TABLE_LIST.DEFAULT}`,
      renderButton: [1],
    },
  ];

  const onSearch = (value) => setSearch(value);

  const payloadData = {
    pageNo: 1,
    pageSize: 20,
    search: "",
  };

  useEffect(() => {
    dispatch(getAllAssetItems({ payloadData, search }));
  }, [search]);

  const render = {
    Table: (
      <Table
        columns={TableColumn(assestsListDictionary)}
        dragable={true}
        data={assetItemList}
      />
    ),
  };

  const buttons = [
    {
      buttonText: assestsListDictionary.assetsAllocation,
      render: (
        <SideDrawer
          success={success}
          isAccessDrawer={true}
          openDrawer={success}
          children={<AssetComposer />}
          title={assestsListDictionary.addAssetsAllocation}
          buttonText={assestsListDictionary.assetsAllocation}
        />
      ),
    },
  ];

  return (
    <TabbableContainer>
      <Header items={items} buttons={buttons} />
      <TopBar onSearch={onSearch} />
      <ContBody>{render["Table"]}</ContBody>
    </TabbableContainer>
  );
};

export default Index;
