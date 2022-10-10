import { Button, DatePicker, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllEmployees,
  getAllEmployeeShort,
} from '../../../../utils/Shared/store/actions';
import { getAllAllowance } from '../../allowance/store/actions';
import { getAllChartOfAccount } from '../../chartOfAccount/store/actions';
import { addVoucher } from '../../voucher/store/actions';
import { voucherTypes, VOUCHER_ENUM } from '../../voucher/utils/constant';
import VoucherPrint from '../../voucher/view/voucherPrintModal';
import CustomModal from '../../workboard/Modal/CustomModal';
import AssetsFooter from './components/AssetsFooter';
import CreateAssetsItem from './components/CreateAssetsItem';
import CreateAssetHead from './components/CreateAssetTableHead';

//TODO:// LATER ON WE HAVE DIFFERENT DATA
const CreateAssetsEntryTable = () => {
  // TODO:// EMPLOYEES KA FILHALL
  const [fetchEmployeesData, setFetchEmployeesData] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const employeesData = useSelector((state) => state.sharedSlice.employees);
  const employeesShortData = useSelector(
    (state) => state.sharedSlice.employeeShort
  );
  console.log(employeesShortData, 'employeesShortData');
  useEffect(() => {
    if (isFirstTime && employeesData.length > 0) {
      setFetchEmployeesData(employeesData);
      setIsFirstTime(false);
    }
  }, [employeesData]);

  useEffect(() => {
    fetchEmployees();
    fetchEmployeesShort();
    fetchAllowance();
  }, []);

  const handleRowChange = (data, index) => {
    let tempEntries = [...entries];
    tempEntries[index] = data;
    setEntries(tempEntries);
  };

  const fetchEmployees = (text = '', pgNo = 1) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const fetchEmployeesShort = (text = '', pgNo = 1) => {
    dispatch(getAllEmployeeShort({ text, pgNo, pgSize: 20 }));
  };
  const fetchAllowance = () => {
    dispatch(getAllAllowance());
  };
  // TODO:// *** END OF EMPLOYEES KA FILHALL

  const defaultRows = 12;
  const defaultEntry = {
    accountId: '',
    chequeNo: '',
    naration: '',
    amount: '',
    dr_cr: '',
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
  const allowanceData = useSelector((state) => state.allowanceSlice.allowances);
  const success = useSelector((state) => state.voucherSlice.success);
  const AllVouchers = useSelector((state) => state.voucherSlice.voucherList);

  const dispatch = useDispatch();
  // TODO:// Total dr will be changed with the total difference
  const totalDr = entries
    .filter((it) => it.dr_cr === VOUCHER_ENUM.DR_CR.DR)
    .reduce((a, b) => a + Number(b.amount), 0);

  // TODO:// Total dr will be changed with the total difference
  const totalCr = entries
    .filter((it) => it.dr_cr === VOUCHER_ENUM.DR_CR.CR)
    .reduce((a, b) => a + Number(b.amount), 0);

  useEffect(() => {
    dispatch(getAllChartOfAccount());
  }, []);

  useEffect(() => {
    console.log(success, 'success');
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
              placeholder="Voucher Type"
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
      </div>
      <div className="bg-white p-4 rounded-md overflow-x-auto">
        <table>
          <CreateAssetHead />
          <tbody>
            {entries.map((item, ind) => {
              return (
                <CreateAssetsItem
                  key={ind}
                  index={ind}
                  accounts={allAccounts}
                  handleChange={handleChange}
                  handleRemoveRow={handleRemoveRow}
                  value={item}
                  // for now to show data for testing
                  handleRowChange={handleRowChange}
                  fetchEmployees={fetchEmployees}
                  fetchEmployeesShort={fetchEmployeesShort}
                  employeesData={fetchEmployeesData}
                  employeesShortData={employeesShortData}
                  allowanceData={allowanceData}
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
            Clear
          </Button>
          <Button className="ThemeBtn mr-2" onClick={handleSubmit}>
            Save
          </Button>
        </div>
        <AssetsFooter dr={totalDr} cr={totalCr} />
        <CustomModal
          isModalVisible={isOpenModal}
          onCancel={() => setIsOpenModal(false)}
          width={'70%'}
          title="Assets Detail"
          footer={null}
          children={
            <VoucherPrint id={AllVouchers[AllVouchers.length - 1]?.id} />
          }
        />
      </div>
    </div>
  );
};

export default CreateAssetsEntryTable;
