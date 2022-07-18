import { AutoComplete, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useEffect, useState } from 'react';
// import CustomizedSnackbars from '../../../snackbar/CustomizedSnackbars';
// import { API } from '../../../utils/services';
// import { STRINGS } from '../../../utils/base';
// import DeleteIcon from '@material-ui/icons/DeleteForever';

const CreateEntryItem = ({ index, accounts, handleChange, handleRemoveRow }) => {

  const onChangeAccount = (accId) => {
    handleChange(accId, "accountId", index)
  };
  const onDr_Cr_Change = (typeId) => {
    handleChange(typeId, "dr_cr", index)
  };

  const handleInputChange = (e) => {
    handleChange(e.target.value, e.target.name, index)
  }

  return (
    <tr>
      <td>
        {index + 1}
      </td>
      <td>
        <Select
          showSearch
          optionFilterProp="children"
          onChange={onChangeAccount}
          style={{ width: "100%" }}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
          {
            accounts.map((item) => <Option value={item.id}>{item.name}</Option>)
          }
        </Select>
      </td>
      <td>
        <input name="chequeNo" onChange={handleInputChange} />
      </td>
      <td>
        <input name="naration" onChange={handleInputChange} />
      </td>
      <td>
        <input name="amount" onChange={handleInputChange} />
      </td>
      <td>
        <Select
          optionFilterProp="children"
          onChange={onDr_Cr_Change}
          style={{ width: "100%" }}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
          {
            [{ label: "Dr", value: 1 }, { label: "Cr", value: 2 }].map(({ label, value }) => <Option value={value}>{label}</Option>)
          }
        </Select>
      </td>
      <td onClick={() => handleRemoveRow(index)} >
        {/* <DeleteIcon /> */}
      </td>
    </tr>
  )
}
export default CreateEntryItem;