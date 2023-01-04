import { Input, DatePicker, Divider, message, Button } from "antd";
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
import TextArea from "antd/lib/input/TextArea";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { useDispatch, useSelector } from "react-redux";
import blackLogo from "../../../../content/blackLogo.svg";
import { addFiscalYear } from "../../fiscalYear/store/actions";
import "./adminstartionCard.css";

const { RangePicker } = DatePicker;

export default function FiscalYear({ formData, setFormData, handleChangeTab }) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];
  const { loader } = useSelector((state) => state.fiscalYearSlice);

  const handleEndStartDate = (value, dateString) => {
    let startMonth = value[0]._d.getMonth() + 1;
    let endMonth = value[1]._d.getMonth() + 1;
    let startYear = value[0]._d.getFullYear();
    let endYear = value[1]._d.getFullYear();

    setFormData({
      ...formData,
      startMonth: startMonth,
      endMonth: endMonth,
      startYear: startYear,
      endYear: endYear,
    });
  };

  const onSubmitFiscalYear = (e) => {
    if (e.fiscalName === "" || e.fiscaldescription === "") {
      return message.error("Please fill all required fields");
    } else {
      dispatch(addFiscalYear(e));
      handleChangeTab();
    }
  };

  return (
    <>
      <div>
        <img src={blackLogo} width={70} />
      </div>
      <div className="flex flex-row gap-5">
        <div className=" flex flex-col">
          <FormContainer
            className="adminstration-card"
            style={{
              width: "500px",
              marginTop: "40px",
              height: "350px",
            }}
          >
            <FormHeader>{administration.fiscalyear.Fiscalyear}</FormHeader>
            <FormInputContainer>
              <FormInput>
                <FormLabel>{administration.fiscalyear.Name}</FormLabel>
                <Input
                  placeholder={administration.fiscalyear.EnterName}
                  value={formData.fiscalName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fiscalName: e.target.value,
                    })
                  }
                />
              </FormInput>
              <FormInput>
                <FormLabel>{administration.fiscalyear.Description}</FormLabel>
                <TextArea
                  placeholder={administration.fiscalyear.EnterDescription}
                  value={formData.fiscaldescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fiscaldescription: e.target.value,
                    })
                  }
                />
              </FormInput>
              <FormInput>
                <RangePicker
                  format={"MM/YYYY"}
                  // value={form.startEndData}
                  placeholder={[
                    administration.fiscalyear.startDate,
                    administration.fiscalyear.endDate,
                  ]}
                  //placeholder={administration.fiscalyear.startDate}
                  //placeholder={administration.fiscalyear.endDate}
                  onChange={handleEndStartDate}
                  picker="month"
                />
              </FormInput>
              <Button
                type="primary"
                size="medium"
                style={{}}
                className="ThemeBtn"
                onClick={(e) => {
                  onSubmitFiscalYear(formData);
                }}
                loading={loader}
              >
                Add Fiscal Year
              </Button>
            </FormInputContainer>
          </FormContainer>
        </div>
        <Divider type="vertical" style={{ height: "400px" }} />
        <div className="basis-1/4  flex flex-col justify-center">
          <div className="moduleHeader justify-center mb-7">Fiscal Year</div>
          <img src={blackLogo} width={200} />
        </div>
      </div>
    </>
  );
}
