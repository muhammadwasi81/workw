import React, { useContext, useState } from "react";
import * as S from "../Styles/employee.style";
import { Button, Form } from "antd";
import EmployeeForm from "./employeeForm";
import EducationForm from "./educationForm";
import EmergencyForm from "./emergencyForm";
import ExperienceForm from "./experienceForm";
import BankForm from "./bankDetailForm";
import "../Styles/employee.css";
import { useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";

const EmployeeFormContainer = (props) => {
  const [form] = Form.useForm();
  const { loader: imgLoader } = useSelector((state) => state.sharedSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const [educationInfo, setEducationInfo] = useState([]);
  const [experienceInfo, setExperienceInfo] = useState([]);
  const [bankInfo, setBankInfo] = useState([]);
  const [emergencyInfo, setEmergencyInfo] = useState([]);
  const { loader: employeeLoader } = useSelector(
    (state) => state.employeeSlice
  );

  const validateMessages = {
    required: "Field is required!",
    types: {
      text: "${label} is not a valid name!",
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    console.log(educationInfo, "EDUCATION!!!")
    const completeValues = {
      ...values,
      educations: educationInfo,
      experiences: experienceInfo,
      bankDetails: bankInfo,
      emergencyContacts: emergencyInfo,
    };

    // setEducationInfo([]);
    // setExperienceInfo([]);
    // setEmergencyInfo([]);
    // setBankInfo([]);
    console.log("Received values of form: ", completeValues);
    props.handleSubmit(completeValues);
    form.resetFields();
  };

  return (
    <S.Container
      form={props.form}
      onFinish={onFinish}
      name="EmployeeFormConatiner"
      validateMessages={validateMessages}
      scrollToFirstError={true}
      initialValues={{ titleId: 1 }}
    >
      <EmployeeForm handleImageUpload={props.handleImageUpload} />
      <EducationForm
        educationInfo={educationInfo}
        onEducationInfo={setEducationInfo}
      />
      <ExperienceForm
        experienceInfo={experienceInfo}
        onExperienceInfo={setExperienceInfo}
      />
      <EmergencyForm
        onEmergencyInfo={setEmergencyInfo}
        emergencyInfo={emergencyInfo}
      />
      <BankForm onBankInfo={setBankInfo} bankInfo={bankInfo} />

      <div className="employeeSubmitButton">
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          loading={imgLoader || employeeLoader}
          className="ThemeBtn"
        >
          {sharedLabels.Submit}
        </Button>
      </div>
    </S.Container>
  );
};

export default EmployeeFormContainer;
