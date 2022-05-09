import { Select } from "antd";
import React, { useContext } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import * as S from "../Styles/employee.style";
const { Option } = Select;

const validateMessages = {
  required: "${label} is required!",
};
const UserRightForm = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employees, Direction } = dictionaryList[userLanguage];
  const value = employees.UserForm;
  return (
    <>
      <S.ContentDivider orientation={Direction === "ltr" ? "left" : "right"}>
        {value.UserRights}
      </S.ContentDivider>

      <S.FormContainer>
        <S.EFormItem
          direction={Direction}
          rules={[{ required: true }]}
          name="usertype"
          label={value.UserType}
        >
          <S.CustomSelect size="large" placeholder="Select User Type">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.EFormItem>
        <S.EFormItem
          rules={[{ required: true }]}
          name="userrole"
          label={value.UserRole}
          direction={Direction}

        >
          <S.CustomSelect size="large" placeholder="Select User Role">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.EFormItem>
      </S.FormContainer>
    </>
  );
};

export default UserRightForm;
