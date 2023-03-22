import React, { useContext, useEffect, useState } from "react";
import Header from "../../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button, Modal } from "antd";
import { ROUTES } from "../../../../../utils/routes";
import QuotationList from "./quotationList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllQuotation } from "../../store/actions";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { Table } from "../../../../sharedComponents/customTable";
import { useSelector } from "react-redux";
import TableView from "./TableViewComponent";
import { quotationTableColumn } from "./tableColumns";
import TableViewComponent from "./TableViewComponent";
import { quotationDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function Quotations() {
  const listData = useSelector((state) => state.quotationSlice.quotationList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState(0);
  const [viewType, setViewType] = useState("Table");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { quotationDictionary, Direction } = quotationDictionaryList[
    userLanguage
  ];

  const items = [
    {
      name: quotationDictionary.quotation,
      to: `${ROUTES.QUOTATION.ROOT}`,
      renderButton: [1],
    },
  ];
  const buttons = [
    {
      buttonText: quotationDictionary.createQuotation,
      render: (
        <Button className="ThemeBtn" onClick={() => navigate("create")}>
          {" "}
          {quotationDictionary.createQuotation}
        </Button>
      ),
    },
  ];
  const filterButtons = [
    {
      name: quotationDictionary.quotations,
      onClick: () => setFilterType(0),
    },
    {
      name: quotationDictionary.createdByMe,
      onClick: () => setFilterType(1),
    },
    {
      name: quotationDictionary.forApproval,
      onClick: () => setFilterType(2),
    },
  ];
  const onSearch = (value) => setSearch(value);
  const onSegment = (value) => setViewType(value);
  useEffect(() => {
    dispatch(
      getAllQuotation({
        filterType,
        search,
      })
    );
  }, [filterType, search]);

  const onRow = () => {
    console.log("on row click");
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const render = {
    List: <QuotationList data={listData} />,
    Table: <TableViewComponent data={listData} />,
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
            label1: quotationDictionary.table,
            label2: quotationDictionary.list,
          }}
        />
        <ContBody>{render[viewType]}</ContBody>
      </TabbableContainer>
      {/* {openModal && (
        <Modal
          visible={openModal}
          onCancel={handleCancel}
          footer={null}
          width={"50%"}
        >
          <div>data</div>
        </Modal>
      )} */}
    </>
  );
}

export default Quotations;
