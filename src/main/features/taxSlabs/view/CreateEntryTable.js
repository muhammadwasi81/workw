import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const CreateEntryItem = ({ index, accounts, handleChange, handleRemoveRow, value }) => {

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
      {/* <td>
        {index + 1}
      </td> */}
      <td>
        <input name="chequeNo" onChange={handleInputChange}
          value={value.chequeNo} />
      </td>
      <td>
        <input className='w-full' name="naration" onChange={handleInputChange}
          value={value.naration} />
      </td>
      <td>
        <input name="amount" onChange={handleInputChange}
          value={value.amount} />
      </td>
      <td>
        <input name="amount" onChange={handleInputChange}
          value={value.amount} />
      </td>
      <td>
        <input name="amount" onChange={handleInputChange}
          value={value.amount} />
      </td>
      <td onClick={() => handleRemoveRow(index)} >
        <DeleteOutlined />
      </td>
    </tr>
  )
}
export default CreateEntryItem;