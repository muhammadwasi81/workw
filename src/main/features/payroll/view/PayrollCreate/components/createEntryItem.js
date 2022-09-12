import { DatePicker, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { getAllEmployees } from '../../../../../../utils/Shared/store/actions';
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { ALLOWANCE_ENUM } from '../../../../allowance/view/enum';

const CreateEntryItem = ({
  index,
  handleChange,
  value
}) => {

  return (
    <tr>
     <td className='!py-[2px]'>1</td>
     <td>Abu Bakar</td>
     <td>1250000</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
     <td>100</td>
    </tr>
  )
}
export default CreateEntryItem;