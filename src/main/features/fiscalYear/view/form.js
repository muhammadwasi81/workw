import "./style.css";
import { Input, DatePicker } from "antd";
import { useEffect, useState, useContext } from "react";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
} from "../../../sharedComponents/Administration/StyledComponents/adminForm";
import TextArea from "antd/lib/input/TextArea";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { useDispatch, useSelector } from "react-redux";

const { RangePicker } = DatePicker;

export default function Form({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const [form, setForm] = useState(data);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];

  const handleClear = (e) => {
    setForm({
      ...form,
      name: "",
      description: "",
      startMonth: "",
      endMonth: "",
      startYear: "",
      endYear: "",
    });
    setClearButton(false);
  };

  const handelChangeName = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, name: e.target.value });
  };

  const handelChangeDescription = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, description: e.target.value });
  };

  const handleEndStartDate = (value, dateString) => {
    if (dateString.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    let startMonth = value[0]._d.getMonth() + 1;
    let endMonth = value[1]._d.getMonth() + 1;
    let startYear = value[0]._d.getFullYear();
    let endYear = value[1]._d.getFullYear();

    setForm({
      ...form,
      startMonth: startMonth,
      endMonth: endMonth,
      startYear: startYear,
      endYear: endYear,
    });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>{administration.fiscalyear.Fiscalyear}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{administration.fiscalyear.Name}</FormLabel>
          <Input
            placeholder={administration.fiscalyear.EnterName}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{administration.fiscalyear.Description}</FormLabel>
          <TextArea
            placeholder={administration.fiscalyear.EnterDescription}
            value={form.description}
            onChange={handelChangeDescription}
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
      </FormInputContainer>
      <FormButtonContainer>
        {form.id ? (
          <>
            <FormButton
              type="primary"
              size="medium"
              style={{}}
              className="formBtn"
              onClick={(e) => {
                onSubmit(form);
                setClearButton(false);
              }}
              loading={loading}
            >
              {administration.fiscalyear.save}
            </FormButton>
          </>
        ) : (
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={(e) => {
              onSubmit(form);
              setClearButton(false);
            }}
            loading={loading}
          >
            {administration.fiscalyear.Add}
          </FormButton>
        )}
        {clearButton && (
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={handleClear}
          >
            {administration.fiscalyear.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
