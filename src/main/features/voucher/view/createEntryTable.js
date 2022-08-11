import React, { useEffect, useState } from 'react';
// import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import VoucherFooter from './components/VoucherFooter';
import CreateEntryHead from './components/createEntryTableHead';
import CreateEntryItem from './components/createEntryItem';
import { Button, DatePicker, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { VOUCHER_ENUM } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChartOfAccount } from '../../chartOfAccount/store/actions';
import { addVoucher } from '../store/actions';
import moment from 'moment';

const CreateEntryTable = ({ defaultRows }) => {
  const defaultEntry = {
    accountId: "",
    chequeNo: "",
    naration: "",
    amount: "",
    dr_cr: ""
  }
  const defaultForm = {
    voucherDate: moment(),
    voucherType: 1,
  }
  const initialEntries = Array(defaultRows).fill(defaultEntry);
  const [entries, setEntries] = useState(initialEntries);
  const [form, setForm] = useState(defaultForm);
  const allAccounts = useSelector(state => state.chartOfAccountsSlice.listData);
  const success = useSelector(state => state.voucherSlice.success);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChartOfAccount())
  }, []);
  useEffect(() => {
    console.log(success,"success")
    if (success){
      // setEntries([])
      setEntries(Array(defaultRows).fill(defaultEntry))
    }
  }, [success])

  const handleAddRow = () => {
    setEntries([...entries, defaultEntry])
  }
  const handleRemoveRow = (index) => {
    console.log(index)
    let filteredRows = [...entries];
    filteredRows.splice(index, 1);
    setEntries(filteredRows)
  }
  const handleChange = (value, name, index) => {
    let tempEntries = [...entries];
    tempEntries[index] = {
      ...tempEntries[index],
      [name]: value
    };
    setEntries(tempEntries)
  }
  const handleSubmit = () => {
    let payload = {
      voucherDate: "2022-07-26T10:52:18.654Z",
      voucherType: 1,
      details: entries.filter(item => item.accountId)
        .map((entry) => ({
          accountId: entry.accountId,
          dbAmount: entry.dr_cr === VOUCHER_ENUM.DR_CR.DR ? entry.amount : 0,
          crAmount: entry.dr_cr === VOUCHER_ENUM.DR_CR.CR ? entry.amount : 0,
          narration: entry.narration,
          chequeNo: entry.chequeNo
        }))
    }
    dispatch(addVoucher(payload))
  }

  const totalDr = entries.filter(it => it.dr_cr === VOUCHER_ENUM.DR_CR.DR)
    .reduce((a, b) => a + Number(b.amount), 0);
  const totalCr = entries.filter(it => it.dr_cr === VOUCHER_ENUM.DR_CR.CR)
    .reduce((a, b) => a + Number(b.amount), 0);
  return (
    <div className='createEntryTable' >
      <div className='flex justify-between items-center my-2 bg-white px-4 py-2 rounded-md' >
        <div className='flex w-[320px] justify-between'>
          <div>
            <Select
              showSearch
              optionFilterProp="children"
              value={form.voucherType}
              onChange={(value) => console.log(value)}
              // style={{ width: "150px" }}
              placeholder="Voucher Type"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {
                [{ label: "Payment Voucher", value: 1 }, { label: "Receipt Voucher", value: 2 }, { label: "Other Voucher", value: 3 }].map((item) => <Option value={item.value}>{item.label}</Option>)
              }
            </Select>
          </div>
          <div >
            <DatePicker
              value={form.voucherDate}
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        {/* <div>
          <Button className='ThemeBtn' onClick={handleSubmit} >
            Submit
          </Button>
        </div> */}
      </div>

      <div className='bg-white p-4 rounded-md' >
        <table>
          <CreateEntryHead />
          <tbody>
            {
              entries.map((item, ind) => {
                return <CreateEntryItem
                  key={ind}
                  index={ind}
                  accounts={allAccounts}
                  handleChange={handleChange}
                  handleRemoveRow={handleRemoveRow}
                  value={item}
                />
              })
            }
          </tbody>
        </table>

        <div>
          <div className='defaultBtn addRowBtn' onClick={handleAddRow} >
            +
          </div>
        </div>
      </div>

      <div className='bg-white p-4 rounded-md flex w-full justify-between mt-5' >

        <div>
          <Button className='ThemeBtn mr-2' onClick={()=>setEntries(Array(defaultRows).fill(defaultEntry))} >
            Clear
          </Button>
          <Button className='ThemeBtn mr-2' onClick={handleSubmit} >
            Save
          </Button>
          <Button className='ThemeBtn mr-2' onClick={handleSubmit} >
            Save & Print
          </Button>
        </div>

        <VoucherFooter
          dr={totalDr}
          cr={totalCr}
        />

      </div>

    </div>
  )
}
export default CreateEntryTable;