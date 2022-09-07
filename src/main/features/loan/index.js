import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TabbableContainer, ContBody } from "../../layout/GridStyle";
import Header from "../../layout/header";
import SideDrawer from "../../sharedComponents/Drawer/SideDrawer";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { loanDictionaryList } from "./localization";
import TopBar from "../../sharedComponents/topBar/topBar";
import Composer from "./composer";
// import "./style.css";
import styled from "styled-components";
import ListView from "./ListView";
import ListBoxes from "./ListBoxes";
import DetailedView from "./DetailedView";
import { CloseDetailView } from "../../../store/appReducer/loanSlice";
import { Table } from "../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import { LoanFilterTypeEnum } from "./enum/index";
//import { getAllRewards } from "./store/actions";

function Index() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { loanDictionary } = loanDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const { listItem } = useSelector((state) => state.loanSlice);

  const [tableView, setTableView] = useState(false);
  // const [view, setView] = useState("List");

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  // const [detailViewIsVisible, setDetailViewIsVisible] = useState(true);

  // useEffect(() => {
  //   dispatch(getAllRewards(filter));
  // }, [filter]);

  const closeDetailView = () => {
    dispatch(CloseDetailView());
    // setDetailViewIsVisible(false);
  };

  // const render = {
  //   List: <ListView filter={filter} />,
  //   Table: (
  //     <Table
  //       columns={tableColumn()}
  //       dragable={true}
  //       //data={"Daniyal"}
  //     />
  //   ),
  // };

  return (
    <TabbableContainer>
      <Header
        buttons={[
          {
            buttonText: "Create Loan",
            // onClick: () => setVisible(true),
            render: (
              <SideDrawer
                title={loanDictionary.createLoan}
                buttonText={loanDictionary.createLoan}
                isAccessDrawer={false}
              >
                <Composer />
              </SideDrawer>
            ),
          },
        ]}
      />
      <TopBar
        onSearch={(value) => {
          console.log(value);
        }}
        buttons={[
          {
            name: "Loans",
            onClick: () => setFilter({ filterType: LoanFilterTypeEnum.All }),
          },
          {
            name: "For Approval",
            onClick: () =>
              setFilter({ filterType: LoanFilterTypeEnum.ForApproval }),
          },
          {
            name: "Loans To Me",
            onClick: () =>
              setFilter({
                filterType: LoanFilterTypeEnum.CreatedByMeAndLoanOfMe,
              }),
          },
        ]}
        filter={{
          onFilter: () => {},
        }}
        segment={{
          onSegment: (value) => {
            if (value === "Table") {
              setTableView(true);
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
            //data={"Daniyal"}
          />
        )}

        {!tableView && <ListBoxes />}

        {!tableView && <ListView filter={filter} />}
        {/* {render[view]} */}
      </ContBody>
      {listItem && (
        <DetailedView onClose={closeDetailView} visible={listItem} />
      )}
    </TabbableContainer>
  );
}

export default Index;
