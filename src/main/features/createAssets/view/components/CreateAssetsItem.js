import { Select } from "antd";
import React, { useContext } from "react";
import { Option } from "antd/lib/mentions";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { warningDictionaryList } from "../../../allowance/warning/localization";
import { UploadOutlined } from "@ant-design/icons";
import "../styles.css";
import { createAssetsDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

const CreateAssetsItem = ({
  index,
  handleChange,
  handleImageUpload,
  value,
  employeesShortData = [],
  employeesData = [],
  data,
  fetchEmployees = () => {},
  fetchEmployeesShort = () => {},
}) => {
  const onChangeCategory = (categoryId, index) => {
    console.log(categoryId, `categoryId`);
    handleChange(categoryId, "category", index);
  };

  const onChangeType = (type, index) => {
    console.log(`onChangeType`);

    handleChange(type, "type", index);
  };

  const handleInputChange = (e) => {
    handleChange(e.target.value, e.target.name, index);
  };
  const { userLanguage } = useContext(LanguageChangeContext);
  const { createAssetsDictionary, Direction } = createAssetsDictionaryList[
    userLanguage
  ];
  return (
    <tr className="tableWrapper">
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
          type={"number"}
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
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          value={value.category}
        >
          {data.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </td>
      <td>
        <Select
          optionFilterProp="children"
          onChange={(val) => onChangeType(val, index)}
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          value={value.type}
        >
          {[
            { label: createAssetsDictionary.nonConsumable, value: 1 },
            { label: createAssetsDictionary.consumable, value: 2 },
            { label: createAssetsDictionary.service, value: 3 },
          ].map(({ label, value }) => (
            <Option value={value}>{label}</Option>
          ))}
        </Select>
      </td>
      <td className="uploadWrapper">
        <SingleUpload
          handleImageUpload={handleImageUpload}
          img="Add Image"
          uploadButton={<UploadOutlined />}
          uploadText={warningDictionaryList.upload}
        />
      </td>
      <td>
        <CustomSelect
          style={{ marginBottom: "0px" }}
          data={employeesShortData}
          selectedData={(value) => handleChange(value[0], "handoverId", index)}
          canFetchNow={employeesShortData && employeesShortData.length > 0}
          fetchData={fetchEmployeesShort}
          sliceName="employeeShort"
          placeholder={createAssetsDictionary.employee}
          isObject={true}
          size={"medium"}
          loadDefaultData={false}
          formItem={false}
          optionComponent={(opt) => {
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
          name="handover"
          showSearch={true}
        />
      </td>
      <td className="removeMargin">
        <CustomSelect
          style={{ marginBottom: "0px" }}
          data={employeesData}
          selectedData={(value, row) =>
            handleChange(
              row.map((item) => ({ approverId: item.id })),
              "approvers",
              index
            )
          }
          canFetchNow={employeesData && employeesData.length > 0}
          fetchData={fetchEmployees}
          placeholder={createAssetsDictionary.approvers}
          mode={"multiple"}
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
    </tr>
  );
};

export default CreateAssetsItem;
