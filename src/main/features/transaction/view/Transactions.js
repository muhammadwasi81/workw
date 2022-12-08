import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import Header from "../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Table } from "../../../sharedComponents/customTable";
import { getAllVoucher } from "../../voucher/store/actions";
import VoucherPrint from "../../voucher/view/voucherPrintModal";
import CustomModal from "../../workboard/Modal/CustomModal";
import { transactionColumn } from "./columns";
import ReportFilter from "./Filter";
import { transactionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
const Transactions = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { transactionsDictionary, Direction } = transactionDictionaryList[
    userLanguage
  ];
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  const voucherList = useSelector((state) => state.voucherSlice.voucherList);
  const loader = useSelector((state) => state.voucherSlice.loader);
  const [currentId, setCurrentId] = useState(STRINGS.DEFAULTS.guid);
  // useEffect(() => {

  // }, [])
  const handleClickPrint = (id) => {
    setCurrentId(id);
    setIsOpenModal(true);
  };
  const handleFilter = (filter) => {
    dispatch(getAllVoucher(filter));
  };

  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: transactionsDictionary.createTransactions,
            to: ROUTES.FINANCE.TRANSACTION.ROOT,
          },
        ]}
      />
      <ReportFilter handleChange={handleFilter} />

      <ContBody>
        <div className="bg-white p-4 rounded-md overflow-x-auto">
          <Table
            columns={transactionColumn(
              handleClickPrint,
              transactionsDictionary
            )}
            dragable={true}
            // handleChange={handleChange}
            // onPageChange={onPageChange}
            // onRow={onRow}
            data={voucherList}
            // status={travelStatus}
            loading={true}
            // success={success}
            // onActionClick={onActionClick}
          />
        </div>
        <CustomModal
          isModalVisible={isOpenModal}
          onCancel={() => setIsOpenModal(false)}
          width={"70%"}
          title={transactionsDictionary.voucherDetail}
          footer={null}
          children={<VoucherPrint id={currentId} />}
          className={""}
        />
      </ContBody>
    </TabbableContainer>
  );
};
export default Transactions;
