import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "antd";
import EducationForm from "./educationForm";
import EmergencyForm from "./emergencyForm";
import ExperienceForm from "./experienceForm";
import BankForm from "./bankDetailForm";
import "../Styles/employee.css";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import BasicInfo from "./basicForm";
import { useDispatch } from "react-redux";
import { getCountries } from "../../../../utils/Shared/store/actions";
import { employeeDictionaryList } from "../localization";
import { addEmployee } from "../store/actions";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { useSelector } from "react-redux";

const EmployeeFormContainer = () => {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employeesDictionary } = employeeDictionaryList[userLanguage];
  const [profileImage, setProfileImage] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const { loader } = useSelector((state) => state.employeeSlice);
  const image = {
    image: {
      id: defaultUiid,
      file: profileImage?.[0]?.originFileObj,
    },
  };
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  const handleIsSubmit = () => {
    setIsSubmit(true);
  };
  const onSubmit = (forms) => {
    const bankDetails = forms.bankDetails.values();
    const workInfo = forms.workInfo.values();
    const emergencyInfo = forms.emergencyInfo.values();
    const educationDetails = forms.educationDetails.values();
    const basicDetails = forms.basicInfo.values();

    const employeeData = {
      ...image,
      ...basicDetails,
      educations: [...educationDetails],
      experiences: [...workInfo],
      bankDetails: [...bankDetails],
      emergencyContacts: [...emergencyInfo],
    };

    dispatch(
      addEmployee({
        data: employeeData,
        resetAllFields: forms,
        handleIsSubmit: handleIsSubmit,
      })
    );
  };

  return (
    <div className="addEmployeeForm">
      <Form.Provider
        onFormFinish={async (name, { values, forms }) => {
          try {
            const isValidation = await forms.basicInfo.validateFields();
            if (isValidation) {
              onSubmit(forms);
            }
          } catch (e) {}
          
        }}
      >
        <Form>
          <BasicInfo
            profileImage={profileImage}
            handleImageUpload={(value) => setProfileImage(value)}
          />
          <EducationForm isSubmit={isSubmit} />
          <ExperienceForm isSubmit={isSubmit} />
          <EmergencyForm isSubmit={isSubmit} />
          <BankForm isSubmit={isSubmit} />
          <Button
            loading={loader}
            size="large"
            type="primary"
            htmlType="submit"
            className="ThemeBtn"
          >
            {employeesDictionary.AddEmployee}
          </Button>
        </Form>
      </Form.Provider>
    </div>
  );
};

export default EmployeeFormContainer;
