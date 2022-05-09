import { UploadOutlined } from "@ant-design/icons";
import {
  Select,
  Input,
  DatePicker,
} from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import * as S from "../Styles/employee.style";
const { Option } = Select;
const { RangePicker } = DatePicker;
const columns = [
  {
    title: "degree",
    dataIndex: "degree",
    key: "degree",
  },
  {
    title: "board",
    dataIndex: "board",
    key: "board",
  },
  {
    title: "start",
    dataIndex: "start",
    key: "start",
  },
  {
    title: "end",
    dataIndex: "end",
    key: "end",
  },
];
const validateMessages = {
  required: "${label} is required!",
};
const EmergencyForm = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employees, Direction } = dictionaryList[userLanguage];
  const value = employees.EmergencyForm;

  const [emergenctContact, setEmergencyContact] = useState({
    name: "",
    number: "",
    address: "",
    relation: "",
  });

  return (
    <>
      <S.ContentDivider orientation={Direction==='ltr'? "left" : "right"}>{value.EmergencyInfo}</S.ContentDivider>

      <S.FormContainer name="emergencyForm">
        <S.EFormItem
          rules={[{ required: true }]}
          name="designation"
          label={value.Designation}
          direction={Direction}
        >
          <Input placeholder="Contact Name"></Input>
        </S.EFormItem>
        <S.EFormItem
          rules={[{ required: true }]}
          name="Contact Number"
          label={value.EmergencyContactAddress}
          direction={Direction}

        >
          <Input placeholder="contactaddress"></Input>
        </S.EFormItem>
        <S.EFormItem
          rules={[{ required: true }]}
          name="Emergency Contact Relation"
          label={value.EmergencyContactNumber}
          direction={Direction}

        >
          <Input placeholder="Emergency Contact Relation"></Input>
        </S.EFormItem>

        <S.EFormItem
          rules={[{ required: true }]}
          name="emergencycontactrelation"
          label={value.EmergencyContactRelation}
          direction={Direction}

        >
          <S.CustomSelect size="large" placeholder="Select One">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.EFormItem>
      </S.FormContainer>
    </>
  );
};

export default EmergencyForm;
