import React, { useEffect, useState, useContext } from "react";
// import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import VoucherFooter from "./components/VoucherFooter";
import CreateEntryHead from "./components/createEntryTableHead";
import CreateEntryItem from "./components/createEntryItem";
import { Button, DatePicker, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { voucherTypes, VOUCHER_ENUM } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllChartOfAccount } from "../../chartOfAccount/store/actions";
import { addVoucher } from "../store/actions";
import moment from "moment";
import CustomModal from "../../workboard/Modal/CustomModal";
import VoucherPrint from "./voucherPrintModal";
import { responseMessageType } from "../../../../services/slices/notificationSlice";
import { voucherDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const CreateEntryTable = ({ defaultRows }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { vouncherDictionary, Direction } = voucherDictionaryList[userLanguage];
  const defaultEntry = {
    accountId: "",
    chequeNo: "",
    naration: "",
    amount: "",
    dr_cr: "",
  };
  const defaultForm = {
    voucherDate: moment(),
    voucherType: 1,
  };
  const initialEntries = Array(defaultRows).fill(defaultEntry);
  const [entries, setEntries] = useState(initialEntries);
  const [form, setForm] = useState(defaultForm);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isRequestPrint, setIsRequestPrint] = useState(false);
  const allAccounts = useSelector(
    (state) => state.chartOfAccountsSlice.listData
  );
  const success = useSelector((state) => state.voucherSlice.success);
  const AllVouchers = useSelector((state) => state.voucherSlice.voucherList);
  const loader = useSelector((state) => state.voucherSlice.loader);
  const dispatch = useDispatch();
  const totalDr = entries
    .filter((it) => it.dr_cr === VOUCHER_ENUM.DR_CR.DR)
    .reduce((a, b) => a + Number(b.amount), 0);
  const totalCr = entries
    .filter((it) => it.dr_cr === VOUCHER_ENUM.DR_CR.CR)
    .reduce((a, b) => a + Number(b.amount), 0);

  useEffect(() => {
    dispatch(getAllChartOfAccount());
  }, []);
  useEffect(() => {
    console.log(success, "success");
    if (success) {
      setEntries(Array(defaultRows).fill(defaultEntry));
      isRequestPrint && setIsOpenModal(true);
    }
  }, [success]);

  const handleAddRow = () => {
    setEntries([...entries, defaultEntry]);
  };

  const handleRemoveRow = (index) => {
    console.log(index);
    let filteredRows = [...entries];
    filteredRows.splice(index, 1);
    setEntries(filteredRows);
  };

  const handleChange = (value, name, index) => {
    let tempEntries = [...entries];
    tempEntries[index] = {
      ...tempEntries[index],
      [name]: value,
    };
    setEntries(tempEntries);
  };
  const createPayload = () => {
    let payload = {
      voucherDate: form.voucherDate,
      voucherType: form.voucherType,
      totalDr,
      totalCr,
      details: entries
        .filter((item) => item.accountId)
        .map((entry) => ({
          accountId: entry.accountId,
          dbAmount: entry.dr_cr === VOUCHER_ENUM.DR_CR.DR ? entry.amount : 0,
          crAmount: entry.dr_cr === VOUCHER_ENUM.DR_CR.CR ? entry.amount : 0,
          narration: entry.naration,
          chequeNo: entry.chequeNo,
        })),
    };
    return payload;
  };

  const handleSubmit = () => {
    let payload = createPayload();
    dispatch(addVoucher(payload));
  };

  return (
    <div className="createEntryTable">
      <div className="flex justify-between items-center my-2 bg-white px-4 py-2 rounded-md">
        <div className="flex w-[320px] justify-between">
          <div>
            <Select
              showSearch
              optionFilterProp="children"
              value={form.voucherType}
              onChange={(value) => setForm({ ...form, voucherType: value })}
              // style={{ width: "150px" }}
              placeholder={vouncherDictionary.vouncherType}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {voucherTypes.map((item) => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </Select>
          </div>
          <div>
            <DatePicker
              value={form.voucherDate}
              onChange={(value) => setForm({ ...form, voucherDate: value })}
            />
          </div>
        </div>
        {/* <div>
          <Button className='ThemeBtn' onClick={handleSubmit} >
            Submit
          </Button>
        </div> */}
      </div>

      <div className="bg-white p-4 rounded-md overflow-x-auto">
        <table>
          <CreateEntryHead />
          <tbody>
            {entries.map((item, ind) => {
              return (
                <CreateEntryItem
                  key={ind}
                  index={ind}
                  accounts={allAccounts}
                  handleChange={handleChange}
                  handleRemoveRow={handleRemoveRow}
                  value={item}
                />
              );
            })}
          </tbody>
        </table>
        <div>
          <div
            className="defaultBtn addRowBtn cursor-pointer"
            onClick={handleAddRow}
          >
            +
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md flex w-full justify-between mt-5 sticky bottom-2">
        <div>
          <Button
            className="ThemeBtn mr-2"
            onClick={() => setEntries(Array(defaultRows).fill(defaultEntry))}
          >
            {vouncherDictionary.clear}
          </Button>
          <Button
            className="ThemeBtn mr-2"
            onClick={handleSubmit}
            loading={loader}
          >
            {vouncherDictionary.save}
          </Button>
          <Button
            className="ThemeBtn mr-2"
            onClick={() => {
              handleSubmit();
              setIsRequestPrint(true);
            }}
          >
            {vouncherDictionary.savePrint}
          </Button>
        </div>

        <VoucherFooter dr={totalDr} cr={totalCr} />
        <CustomModal
          isModalVisible={isOpenModal}
          onCancel={() => setIsOpenModal(false)}
          width={"70%"}
          title={vouncherDictionary.voucherDetail}
          footer={null}
          children={
            <VoucherPrint id={AllVouchers[AllVouchers.length - 1]?.id} />
          }
          className={""}
        />
      </div>
    </div>
  );
};
export default CreateEntryTable;
