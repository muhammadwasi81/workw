import { useEffect } from 'react';
import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import CustomSelect from '../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAssetCategories } from '../../../assetsCategory/store/actions';
import SingleUpload from '../../../../sharedComponents/Upload/singleUpload';
import { warningDictionaryList } from '../../../allowance/warning/localization';
import { UploadOutlined } from '@ant-design/icons';
import '../style.css';

const CreateAssetsItem = ({
  index,
  handleChange,
  handleImageUpload,
  value,
  employeesShortData = [],
  employeesData = [],
  fetchEmployees = () => {},
  fetchEmployeesShort = () => {},
}) => {
  const dispatch = useDispatch();
  const { assetsData } = useSelector((state) => state.assetsCategorySlice);

  useEffect(() => {
    dispatch(getAllAssetCategories());
  }, []);

  const onChangeCategory = (categoryId, index) => {
    console.log(categoryId, `categoryId`);
    handleChange(categoryId, 'category', index);
  };

  const onChangeType = (type, index) => {
    console.log(`onChangeType`);
    handleChange(type, 'type', index);
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
          type={'number'}
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
          onChange={(val) => onChangeCategory(val, index)}
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          value={value.category}
        >
          {assetsData.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </td>
      <td>
        {/* TODO: Types */}
        <Select
          optionFilterProp="children"
          onChange={(val) => onChangeType(val, index)}
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          value={value.type}
        >
          {[
            { label: 'Non-Consumable', value: 1 },
            { label: 'Consumable', value: 2 },
            { label: 'Service', value: 3 },
          ].map(({ label, value }) => (
            <Option value={value}>{label}</Option>
          ))}
        </Select>
      </td>
      {/* TODO: IMAGE */}
      <td>
        <SingleUpload
          handleImageUpload={handleImageUpload}
          img="Add Image"
          style={{ height: '50px', width: '100%' }}
          uploadButton={<UploadOutlined />}
          uploadText={warningDictionaryList.upload}
        />
      </td>
      <td>
        <CustomSelect
          style={{ marginBottom: '0px' }}
          data={employeesShortData}
          // selectedData={(value, row) => onEmployeeSelect(row)}
          selectedData={(value, row) =>
            handleChange(
              row.map((item) => ({ handoverId: item.id })),
              'approvers',
              index
            )
          }
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
