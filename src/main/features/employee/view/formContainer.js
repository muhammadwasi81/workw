import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import EducationForm from './educationForm';
import EmergencyForm from './emergencyForm';
import ExperienceForm from './experienceForm';
import BankForm from './bankDetailForm';
import '../Styles/employee.css';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import BasicInfo from './basicForm';
import { useDispatch } from 'react-redux';
import {
  getCities,
  getCountries,
} from '../../../../utils/Shared/store/actions';
import { employeeDictionaryList } from '../localization';
import { addEmployee } from '../store/actions';
import { defaultUiid } from '../../../../utils/Shared/enums/enums';
import { useSelector } from 'react-redux';

const EmployeeFormContainer = () => {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employeesDictionary } = employeeDictionaryList[userLanguage];
  const [profileImage, setProfileImage] = useState();

  const { loader } = useSelector((state) => state.employeeSlice);
  const image = {
    image: {
      id: defaultUiid,
      file: profileImage?.[0]?.originFileObj,
    },
  };
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getCities({ textData: '', page: 20 }));
  }, [dispatch]);

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
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <Form>
          <BasicInfo
            profileImage={profileImage}
            handleImageUpload={(value) => setProfileImage(value)}
          />
          <EducationForm />
          <ExperienceForm />
          <EmergencyForm />
          <BankForm />
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
