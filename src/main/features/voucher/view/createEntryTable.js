import React, { useEffect, useState } from 'react';
// import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import VoucherFooter from './components/VoucherFooter';
import CreateEntryHead from './components/createEntryTableHead';
import CreateEntryItem from './components/createEntryItem';
import { DatePicker, Select } from 'antd';
import { Option } from 'antd/lib/mentions';

const CreateEntryTable = ({ defaultRows }) => {
  const defaultEntry = {
    accountId: "",
    chequeNo: "",
    naration: "",
    amount: "",
    dr_cr: ""
  }
  const initialEntries = Array(defaultRows).fill(defaultEntry);
  const [allAccounts, setAllAccounts] = useState([]);
  const [entries, setEntries] = useState(initialEntries);
  useEffect(() => {
    // API.FINANCE.CHART_OF_ACCOUNT.getAllChartOfAccount()
    //   .then(({ status, data, error }) => {
    //     if (status) {
    //       setAllAccounts(data)
    //     }
    //     else alert(error)
    //   })
  }, []);
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
    // let tempEntries =
    console.log(value, name, index)
  }
  return (
    <div className='createEntryTable' >
      <div style={{display:"flex", width:"300px", justifyContent:"space-between", margin:"10px"}} >
        <div>
          <Select
            showSearch
            optionFilterProp="children"
            // onChange={()=>{}}
            style={{ width: "150px" }}
            placeholder="Voucher Type"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {
              [{ label: "Payment Voucher", value: 1 }, { label: "Receipt Voucher", value: 2 }, { label: "Other Voucher", value: 3 }].map((item) =>
               <Option value={item.value}>{item.label}</Option>)
            }
          </Select>
        </div>
        <div>
        <DatePicker />
        </div>
      </div>
      <table>
        <CreateEntryHead />
        <tbody>
          {
            entries.map((item, ind) => {
              return <CreateEntryItem
                index={ind}
                accounts={allAccounts}
                handleChange={handleChange}
                handleRemoveRow={handleRemoveRow}
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
      <VoucherFooter />
    </div>
  )
}
export default CreateEntryTable;