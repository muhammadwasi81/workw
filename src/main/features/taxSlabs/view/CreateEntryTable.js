import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const CreateEntryItem = ({ index, handleChange, handleRemoveRow, value }) => {

  const handleInputChange = (e) => {
    handleChange(e.target.value, e.target.name, index)
  }

  return (
    <tr>
      {/* <td>
        {index + 1}
      </td> */}
      <td>
        <input name="name" type="text" width="100%" onChange={handleInputChange}
          value={value.name} />
      </td>
      <td>
        <input type="number" className='w-full' name="min" onChange={handleInputChange}
          value={value.min} />
      </td>
      <td>
        <input name="max" type="number" onChange={handleInputChange}
          value={value.max} />
      </td>
      <td>
        <input name="percentage" type="number" max="100" onChange={handleInputChange}
          value={value.percentage} />
      </td>
      <td>
        <input name="previousCharge" type="number" onChange={handleInputChange}
          value={value.previousCharge} />
      </td>
      <td onClick={() => handleRemoveRow(index)} >
        <DeleteOutlined />
      </td>
    </tr>
  )
}
export default CreateEntryItem;