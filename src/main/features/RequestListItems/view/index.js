import { useEffect, useState, useContext } from "react";
import TopBar from "../../../sharedComponents/topBar/topBar";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Table } from "../../../sharedComponents/customTable";
import { getAllRequestListItems } from "../store/action";
import { ROUTES } from "../../../../utils/routes";
import RequestList from "./requestList";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import RequestListComposer from "./composer/RequestListComposer";
import { ListTableColumn } from "./tableColumn";
import { Skeleton } from "antd";
import { handleOpenComposer } from "../store/slice";
import { requestListDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, requestListDictionary } = requestListDictionaryList[
    userLanguage
  ];
  const dispatch = useDispatch();

  const { loader, requestItems, drawerOpen } = useSelector(
    (state) => state.requestItemSlice
  );
  console.log(requestItems, "drawerOpen");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState(0);
  const [viewType, setViewType] = useState("List");

  const items = [
    {
      name: requestListDictionary.requestForItems,
      to: `${ROUTES.REQUEST_LIST_ITEM.DEFAULT}`,
      renderButton: [1],
    },
  ];

  const filterButtons = [
    {
      name: requestListDictionary.requestForItems,
      onClick: () => setFilterType(0),
    },
    {
      name: requestListDictionary.createdByMe,
      onClick: () => setFilterType(1),
    },
    {
      name: requestListDictionary.requestForItemsApprovals,
      onClick: () => setFilterType(2),
    },
  ];
  const onSearch = (value) => setSearch(value);
  const onSegment = (value) => setViewType(value);

  const payloadData = {
    pageNo: 1,
    pageSize: 20,
    search: "",
    sortBy: 1,
    filterType: filterType,
  };

  useEffect(() => {
    dispatch(getAllRequestListItems({ payloadData, filterType, search }));
  }, [filterType, search]);

  const buttons = [
    {
      buttonText: requestListDictionary.createRequest,
      render: (
        <SideDrawer
          title={requestListDictionary.createRequest}
          buttonText={requestListDictionary.createRequest}
          handleClose={() => dispatch(handleOpenComposer(false))}
          handleOpen={() => dispatch(handleOpenComposer(true))}
          isOpen={drawerOpen}
          children={<RequestListComposer />}
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
            label1: "List",
            label2: "Table",
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
