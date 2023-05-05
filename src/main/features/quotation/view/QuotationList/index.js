import { useContext, useEffect, useState } from "react";
import Header from "../../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button } from "antd";
import { ROUTES } from "../../../../../utils/routes";
import QuotationList from "./quotationList";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllQuotation } from "../../store/actions";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import { useSelector } from "react-redux";
import TableViewComponent from "./TableViewComponent";
import { quotationDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import CreateQoutationVoucher from "../CreateQuotation/createSalaryVoucher";
import CustomModal from "../../../workboard/Modal/CustomModal";

function Quotations({ referenceId, referenceType }) {
  const location = useLocation();
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
  const showModal = () => setOpenModal(true);
  const buttons = [
    {
      buttonText: quotationDictionary.createQuotation,
      render: (
        <Button
          className="ThemeBtn"
          onClick={() => {
            if (location.pathname !== "/quotation") {
              showModal();
            } else {
              navigate("create");
            }
          }}
        >
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
        referenceId,
        referenceType,
      })
    );
  }, [filterType, search]);

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
      <CustomModal
        isModalVisible={openModal}
        footer={null}
        width={"80%"}
        className="quotationModal"
        onCancel={() => {
          setOpenModal(false);
        }}
        children={<CreateQoutationVoucher />}
      />
    </>
  );
}

export default Quotations;
