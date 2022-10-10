import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import { calculateAllowance } from '../../../salary/utils/constant';
import CustomSelect from '../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';

const CreateAssetsItem = ({
  index,
  accounts,
  handleRemoveRow,
  handleChange,
  handleRowChange,
  value,
  allowanceData = [],
  employeesShortData = [],
  employeesData = [],
  fetchEmployees = () => {},
  fetchEmployeesShort = () => {},
}) => {
  const onEmployeeSelect = (row) => {
    let { gradeId, grade, id } = row[0];
    let { totalAllowance, totalDeductions, details } = calculateAllowance(
      allowanceData,
      gradeId,
      value.basicSalary
    );
    let tempValue = {
      ...value,
      userId: id,
      details,
      grade,
      gradeId,
      allowance: totalAllowance,
      deduction: totalDeductions,
      netSalary: value.basicSalary + totalAllowance - totalDeductions,
    };
    handleRowChange(
      {
        ...tempValue,
      },
      index
    );
  };

  const inventoryHandler = (accId) => {
    console.log(`eewewe`);
    handleChange(accId, 'accountId', index);
  };
  const onDr_Cr_Change = (typeId) => {
    handleChange(typeId, 'dr_cr', index);
  };

  const handleInputChange = (e) => {
    handleChange(e.target.value, e.target.name, index);
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <input
          name="inventoryName"
          onChange={handleInputChange}
          value={value.inventoryName}
        />
      </td>
      <td>
        <input
          name="inventoryValue"
          onChange={handleInputChange}
          value={value.inventoryValue}
        />
      </td>
      <td>
        <input
          className="w-full"
          name="serialNo"
          onChange={handleInputChange}
          value={value.serialNo}
        />
      </td>
      <td>
        <Select
          optionFilterProp="children"
          onChange={inventoryHandler}
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          value={value.inventoryCategory}
        >
          {[
            { label: 'Graphic', value: 1 },
            { label: 'Mouse', value: 2 },
            { label: 'Keyboard', value: 3 },
            { label: 'Charger', value: 4 },
            { label: 'MacBook', value: 5 },
            { label: 'Cable', value: 6 },
            { label: 'Laptop', value: 7 },
            { label: 'USB', value: 8 },
            { label: 'Mobile', value: 9 },
            { label: 'Headphones', value: 10 },
          ].map(({ label, value }) => (
            <Option value={value}>{label}</Option>
          ))}
        </Select>
      </td>
      <td>
        <Select
          optionFilterProp="children"
          onChange={inventoryHandler}
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          value={value.inventoryType}
        >
          {[
            { label: 'Non Consumable', value: 1 },
            { label: 'Consumable', value: 2 },
          ].map(({ label, value }) => (
            <Option value={value}>{label}</Option>
          ))}
        </Select>
      </td>
      {/* TODO: SALARY WALA */}
      <td>
        <CustomSelect
          style={{ marginBottom: '0px' }}
          data={employeesShortData}
          selectedData={(value, row) => onEmployeeSelect(row)}
          canFetchNow={employeesShortData && employeesShortData.length > 0}
          fetchData={fetchEmployeesShort}
          sliceName="employeeShort"
          placeholder={'Employee'}
          isObject={true}
          size={'medium'}
          loadDefaultData={false}
          formItem={false}
          optionComponent={(opt) => {
            return (
              <>
                <Avatar
                  name={opt.name}
                  src={opt.image}
                  round={true}
                  width={'30px'}
                  height={'30px'}
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
      <td className="removeMargin">
        <CustomSelect
          style={{ marginBottom: '0px' }}
          data={employeesData}
          selectedData={(value, row) =>
            handleChange(
              row.map((item) => ({ approverId: item.id })),
              'approvers',
              index
            )
          }
          canFetchNow={employeesData && employeesData.length > 0}
          fetchData={fetchEmployees}
          placeholder={'Approvers'}
          mode={'multiple'}
          isObject={true}
          size="small"
          loadDefaultData={false}
          formItem={false}
          optionComponent={(opt) => {
            return (
              <>
                <Avatar
                  name={opt.name}
                  src={opt.image}
                  round={true}
                  width={'30px'}
                  height={'30px'}
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
    </tr>
  );
};

export default CreateAssetsItem;
