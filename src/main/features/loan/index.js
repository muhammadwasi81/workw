import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TabbableContainer, ContBody } from "../../layout/GridStyle";
import Header from "../../layout/header";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { LoanDictionary } from "./localization";
import TopBar from "../../sharedComponents/topBar/topBar";
import { toggleCreateComposer } from "./store/slice";
import Composer from "./composer";
import "./style.css";
import styled from "styled-components";
import ListView from "./ListView";
import ListBoxes from "./ListBoxes";
import DetailedView from "./DetailedView";
import { CloseDetailView } from "../../../store/appReducer/loanSlice";
import { Table } from "../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import { LoanFilterTypeEnum } from "./enum/index";
import getStoredState from "redux-persist/es/getStoredState";
import { getAllLoans } from "./store/actions";
import { Drawer, Button } from "antd";
import { ROUTES } from "../../../utils/routes";
import SideDrawer from "../../sharedComponents/Drawer/SideDrawer";
import { handleOpenComposer } from "./store/slice";

function Index() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { loanDictionaryList, Direction } = LoanDictionary[userLanguage];
  const dispatch = useDispatch();
  const { loanList, listItem, isCreateComposer, drawerOpen } = useSelector(
    (state) => state.loanSlice
  );

  const [tableView, setTableView] = useState(false);
  const [viewType, setViewType] = useState("List");
  const [search, setSearch] = useState("");

  // const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  // const [detailViewIsVisible, setDetailViewIsVisible] = useState(true);

  const items = [
    {
      name: "Loans",
      to: `${ROUTES.LOAN.LOAN}`,
      renderButton: [1],
    },
  ];

  useEffect(() => {
    dispatch(getAllLoans(filter));
  }, [filter]);

  const closeDetailView = () => {
    dispatch(CloseDetailView());
    // setDetailViewIsVisible(false);
  };

  const onSearch = (value) => setFilter({ ...filter, search: value });
  const onSegment = (value) => setViewType(value);

  return (
    <TabbableContainer>
      <Header
        items={items}
        buttons={[
          {
            buttonText: loanDictionaryList.createLoan,
            render: (
              <SideDrawer
                title={loanDictionaryList.createLoan}
                buttonText={loanDictionaryList.createLoan}
                handleClose={() => dispatch(handleOpenComposer(false))}
                handleOpen={() => dispatch(handleOpenComposer(true))}
                isOpen={drawerOpen}
                children={<Composer />}
              />
            ),
          },
        ]}
      />
      <TopBar
        onSearch={onSearch}
        buttons={[
          {
            name: "Loans",
            onClick: () => setFilter({ filterType: LoanFilterTypeEnum.All }),
          },
          {
            name: "For Approval",
            onClick: () =>
              setFilter({
                filterType: LoanFilterTypeEnum.ForApproval,
              }),
          },
          {
            name: "Loans To Me",
            onClick: () =>
              setFilter({
                filterType: LoanFilterTypeEnum.CreatedByMeAndLoanOfMe,
              }),
          },
        ]}
        // filter={{
        // 	onFilter: () => {},
        // }}
        segment={{
          onSegment: (value) => {
            if (value === "Table") {
              setTableView(true);
              console.log(tableView);
            } else {
              setTableView(false);
            }
          },
          label1: "List",
          label2: "Table",
        }}
      />

      <ContBody className="!block">
        {tableView && (
          <Table
            columns={tableColumn()}
            dragable={true}
            data={loanList ? loanList : []}
          />
        )}

        {/* {!tableView && <ListBoxes />} */}

        {!tableView && <ListView filter={filter} />}
        {/* 
        {render[view]}
        {render[viewType]} */}
      </ContBody>
      {/* {listItem && (
				<DetailedView onClose={closeDetailView} visible={listItem} />
			)} */}

      <Drawer
        title={
          <h1
            style={{
              fontSize: "20px",
              margin: 0,
              textAlign: Direction === "ltr" ? "" : "end",
            }}
          >
            {loanDictionaryList.createLoan}
          </h1>
        }
        placement={Direction === "rtl" ? "left" : "right"}
        width="768"
        onClose={() => {
          dispatch(toggleCreateComposer());
        }}
        visible={isCreateComposer}
        destroyOnClose={true}
        className="detailedViewComposer drawerSecondary"
      >
        <Composer />
      </Drawer>
    </TabbableContainer>
  );
}

export default Index;
