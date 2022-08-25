import { DatePicker, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { getAllEmployees } from '../../../../../../utils/Shared/store/actions';
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
const CreateEntryItem = ({
  index,
  handleChange,
  handleRowChange,
  handleRemoveRow,
  value,
  fetchEmployees = () => { },
  employeesData = [],
  fetchEmployeesShort = () => { },
  employeesShortData = []
}) => {

  const handleInputChange = (e) => {
    handleChange(e.target.value, e.target.name, index)
  }
  const onEmployeeSelect = (row) => {
    console.log(row, "row")
    let {gradeId, grade} = row[0];
    handleRowChange({
      ...value,
      grade
    }, index)
  }

  return (
    <tr>
      <td>
        {index + 1}
      </td>
      <td className="text-center salaryDatePicker" >
        <DatePicker
          value={value.effectiveDate}
          onChange={(value) => handleChange(value, "effectiveDate", index)}
        />
      </td>
      <td>
        <CustomSelect
          style={{ marginBottom: "0px" }}
          data={employeesShortData}
          selectedData={(value, row) => onEmployeeSelect(row) }
          canFetchNow={employeesShortData && employeesShortData.length > 0}
          fetchData={fetchEmployeesShort}
          sliceName="employeeShort"
          placeholder={"Employee"}
          isObject={true}
          size={"medium"}
          loadDefaultData={false}
          formItem={false}
          optionComponent={opt => {
            return (
              <>
                <Avatar
                  name={opt.name}
                  src={opt.image}
                  round={true}
                  width={"30px"}
                  height={"30px"}
                />
                {opt.name}
              </>
            );
          }}
          dataVal={[]}
          name="Employee"
          showSearch={true}
        />
      </td>
      <td>
      <input value={value.grade} disabled={true} />
      </td>
      <td>
        <input name="basicSalary" onChange={handleInputChange}
          value={value.basicSalary} />
      </td>
      <td>
        <input value={value.allowance} disabled={true} />
      </td>
      <td>
      <input value={value.netSalary} disabled={true} />
      </td>
      <td className='removeMargin'>
        <CustomSelect
          style={{ marginBottom: "0px" }}
          data={employeesData}
          selectedData={(value, row) => {console.log(row) }}
          canFetchNow={employeesData && employeesData.length > 0}
          fetchData={fetchEmployees}
          placeholder={"Approvers"}
          mode={"multiple"}
          isObject={true}
          size="small"
          loadDefaultData={false}
          optionComponent={opt => {
            return (
              <>
                <Avatar
                  name={opt.name}
                  src={opt.image}
                  round={true}
                  width={"30px"}
                  height={"30px"}
                />
                {opt.name}
              </>
            );
          }}
          dataVal={[]}
          name="approvers"
          showSearch={true}
        />
      </td>
      <td>
        <input name="description" onChange={handleInputChange}
          value={value.description} />
      </td>

      <td onClick={() => handleRemoveRow(index)} >
        {/* <DeleteIcon /> */}
        <DeleteOutlined />
      </td>
    </tr>
  )
}
export default CreateEntryItem;