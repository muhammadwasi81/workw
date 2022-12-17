import { DatePicker, Input, Select } from 'antd';
import React, { useContext } from 'react';
import { default as imageupload } from '../util/imageupload.svg';
import { useMediaQuery } from 'react-responsive';
import * as S from '../Styles/employee.style';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../utils/localization/languages';
const { Option } = Select;

const EmployeeForm = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employees, Direction } = dictionaryList[userLanguage];
  const value = employees.EmployeeForm;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const selectBefore = (
    <S.CustomSelect size="large" defaultValue="Mr">
      <Option value="Mr">Mr</Option>
      <Option value="Ms://">Ms</Option>
    </S.CustomSelect>
  );
  return (
    <>
      {/* <Divider orientation="left">Basic Info</Divider> */}
      <S.BasicForm>
        <S.FormItem name="upload" area="true">
          <S.ImageUpload>
            <S.ImageButton
              size="large"
              icon={
                <img
                  style={{ width: '90px', height: '90px' }}
                  src={imageupload}
                  alt="img-upload"
                />
              }
            >
              {value.AddImage}
            </S.ImageButton>
          </S.ImageUpload>
        </S.FormItem>
        <S.FormItem
          direction={Direction}
          name="First Name"
          label={value.FirstName}
          rules={[
            {
              required: true,
            },
          ]}

          // direction={Direction}
        >
          <Input addonBefore={selectBefore} placeholder="Enter First Name" />
        </S.FormItem>
        <S.FormItem
          name="lastname"
          label={value.LastName}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input placeholder="Enter Last Name" />
        </S.FormItem>
        <S.FormItem
          name="fathername"
          label={value.FatherName}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input placeholder="Enter Father Name" />
        </S.FormItem>

        <S.FormItem
          name="email"
          label={value.Email}
          rules={[{ required: true }, { type: 'email' }]}
          direction={Direction}
        >
          <Input placeholder="Enter Email" />
        </S.FormItem>

        <S.FormItem
          name="personalemail"
          label={value.PersonalEmail}
          rules={[{ required: true }, { type: 'email' }]}
          direction={Direction}
        >
          <Input placeholder="Enter Personal Email" />
        </S.FormItem>
        <S.FormItem
          name="CNICnumber"
          label={value.CNICNumber}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input placeholder="Enter CNIC Number" />
        </S.FormItem>
        <S.FormItem
          name="address"
          label={value.Address}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input placeholder="Enter Address" />
        </S.FormItem>
        <S.FormItem
          name="phonenumber"
          label={value.PhoneNumber}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <Input placeholder="Enter Phone Number" />
        </S.FormItem>

        <S.FormItem
          name="designation"
          label={value.Designation}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect size="large" placeholder="Select Designation">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="manager"
          label={value.Manager}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect size="large" placeholder="Select Manager">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="grades"
          label={value.Grades}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect size="large" placeholder="Select Grades">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="department"
          label={value.Department}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect size="large" placeholder="Select Department">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="country"
          label={value.Country}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect size="large" placeholder="Select Country">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="city"
          label={value.City}
          direction={Direction}
          rules={[{ required: true }]}
        >
          <S.CustomSelect size="large" placeholder="Select City">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="languages"
          label={value.Languages}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect
            size="large"
            placeholder="Select Languages"
            mode="multiples"
          >
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="probationperiod"
          label={value.ProbationPeriod}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect size="large" placeholder="In days">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="dateofbirth"
          label={value.DateOfBirth}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <DatePicker placeholder="Select Date" />
        </S.FormItem>
        <S.FormItem
          name="dateofjoining"
          label={value.DateOfJoining}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <DatePicker placeholder="Select Date" />
        </S.FormItem>
        <S.FormItem
          name="gender"
          label={value.Gender}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect size="large" placeholder="Select Gender">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="maritalstatus"
          label={value.MaritalStatus}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect size="large" placeholder="Select Marital Status">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
        <S.FormItem
          name="officeshift"
          label={value.OfficeShift}
          rules={[{ required: true }]}
          direction={Direction}
        >
          <S.CustomSelect size="large" placeholder="Select Shift">
            <Option value="Mr">Mr</Option>
            <Option value="Ms">Ms</Option>
          </S.CustomSelect>
        </S.FormItem>
      </S.BasicForm>
    </>
  );
};

export default EmployeeForm;
