import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useContext } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { voucherDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

const CreateEntryItem = ({
  index,
  accounts,
  handleChange,
  handleRemoveRow,
  value,
}) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { vouncherDictionary, Direction } = voucherDictionaryList[userLanguage];

  const onChangeAccount = (accId) => {
    handleChange(accId, "accountId", index);
  };
  const onDr_Cr_Change = (typeId) => {
    handleChange(typeId, "dr_cr", index);
  };

  const handleInputChange = (e) => {
    handleChange(e.target.value, e.target.name, index);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Select
          showSearch
          optionFilterProp="children"
          onChange={onChangeAccount}
          value={value.accountId}
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {accounts.map((item) => (
            <Option value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </td>
      <td>
        <input
          name="chequeNo"
          onChange={handleInputChange}
          value={value.chequeNo}
        />
      </td>
      <td>
        <input
          className="w-full"
          name="naration"
          onChange={handleInputChange}
          value={value.naration}
        />
      </td>
      <td>
        <input
          name="amount"
          onChange={handleInputChange}
          value={value.amount}
        />
      </td>
      <td>
        <Select
          optionFilterProp="children"
          onChange={onDr_Cr_Change}
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          value={value.dr_cr}
        >
          {[
            { label: vouncherDictionary.Dr, value: 1 },
            { label: vouncherDictionary.Cr, value: 2 },
          ].map(({ label, value }) => (
            <Option value={value}>{label}</Option>
          ))}
        </Select>
      </td>
      <td onClick={() => handleRemoveRow(index)}>
        {/* <DeleteIcon /> */}
        <DeleteOutlined />
      </td>
    </tr>
  );
};
export default CreateEntryItem;
