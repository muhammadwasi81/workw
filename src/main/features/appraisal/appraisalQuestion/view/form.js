import "./appraisal.css";
import { Input } from "antd";
import { useEffect, useState, useContext } from "react";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
  FormTextArea,
} from "../../../../../components/HrMenu/Administration/StyledComponents/adminForm";

import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
import * as S from "../../../employee/Styles/employee.style";
import { useDispatch, useSelector } from "react-redux";

export default function AppraisalForm({
  data,
  onSubmit,
  setClearButton,
  clearButton,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, appraisal, Direction } = dictionaryList[userLanguage];

  const [form, setForm] = useState(data);
  const { createLoader } = useSelector((state) => state.appraisalSlice);

  console.log(createLoader, "CREATE LOADER FROM FORM");

  const handleClear = (e) => {
    setForm({ ...form, description: "", name: "" });
    setClearButton(false);
  };

  const handelChangeName = (e) => {
    console.log(e.target.value);
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

  useEffect(() => {
    setForm(data);
  }, [data]);
  const { loader } = useSelector((state) => state.appraisalSlice);

  return (
    <FormContainer>
      <FormHeader>{administration.Appraisal}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{administration.Appraisal}</FormLabel>
          <Input
            placeholder={administration.appraisal.enterAppraisal}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        {/* <S.FormItem
          name="description"
          label={<FormLabel>{administration.appraisal.description}</FormLabel>}
          rules={[
            {
              required: true,
              message: "Please Enter Description",
            },
          ]}
        >
          <Input
            placeholder={administration.appraisal.enterDescription}
            value={form.description}
            onChange={handelChangeDescription}
          />
        </S.FormItem> */}
        <FormInput>
          <FormLabel>{administration.appraisal.description}</FormLabel>
          <FormTextArea
            placeholder={administration.appraisal.enterDescription}
            value={form.description}
            onChange={handelChangeDescription}
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
              loading={loader}
            >
              {administration.appraisal.save}
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
            loading={loader}
          >
            {administration.appraisal.Add}
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
            {administration.appraisal.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
