import { Divider, Input, message } from "antd";
import { useEffect, useState, useContext } from "react";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages/index";
import blackLogo from "../../../../content/blackLogo.svg";
import { useSelector, useDispatch } from "react-redux";
import { addPayrollGroup } from "../../payroll/payrollGroup/store/actions";

export default function Form({ formData, setFormData }) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, payrollGroup, Direction } = dictionaryList[
    userLanguage
  ];
  const { loader } = useSelector((state) => state.payrollGroupSlice);
  const onSubmitPayrollGroup = (e) => {
    if (e.payroll === "") {
      message.error("Please fill all required field!");
    } else {
      dispatch(addPayrollGroup(e));
    }
  };
  return (
    <>
      <div>
        <img src={blackLogo} width={70} />
      </div>
      <div className="flex flex-row gap-5">
        <div className=" flex flex-col">
          <FormContainer className="form-container">
            <FormHeader>{administration.payrollGroup.PayrollGroup}</FormHeader>
            <FormInputContainer>
              <FormInput>
                <FormLabel>{administration.payrollGroup.name}</FormLabel>
                <Input
                  placeholder={administration.payrollGroup.enterName}
                  value={formData.payroll}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payroll: e.target.value,
                    })
                  }
                />
              </FormInput>
            </FormInputContainer>
            <FormButtonContainer>
              <FormButton
                type="primary"
                size="medium"
                style={{}}
                className="formBtn"
                onClick={(e) => {
                  onSubmitPayrollGroup(formData);
                }}
                loading={loader}
              >
                {administration.payrollGroup.Add}
              </FormButton>
            </FormButtonContainer>
          </FormContainer>
        </div>
        <Divider
          type="vertical"
          style={{
            height: "400px",
          }}
        />
        <div className="basis-1/4  flex flex-col justify-center">
          <div className="moduleHeader justify-center mb-7">Payroll Group</div>
          <img src={blackLogo} width={200} />
        </div>
      </div>
    </>
  );
}
