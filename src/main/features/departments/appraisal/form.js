// import "./grade.css";
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
} from "../../../sharedComponents/Administration/StyledComponents/adminForm";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
export default function Appraisal({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const [form, setForm] = useState(data);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { departmentDictionary, Direction } = departmentDictionaryList[
    userLanguage
  ];
  const handleClear = (e) => {
    setForm({ ...form, question: "" });
    setClearButton(false);
  };

  const handelChangeName = (e) => {
    // console.log(e.target.value)
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, question: e.target.value });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>{departmentDictionary.appraisalQuestion}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{departmentDictionary.question}</FormLabel>
          <Input
            placeholder={departmentDictionary.enterQuestion}
            value={form.question}
            onChange={handelChangeName}
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
            >
              {departmentDictionary.saveAppraisalQuestion}
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
            // loading={loading}
          >
            {departmentDictionary.addAppraisalQuestion}
          </FormButton>
        )}
        {/* <FormButton
          type="primary"
          size="medium"
          style={{}}
          className="formBtn"
          onClick={(e) => {
            onSubmit(form);
            setClearButton(false);
          }}
          // loading={loading}
        >
          Add Grade
        </FormButton> */}
        {clearButton && (
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={handleClear}
          >
            {departmentDictionary.clear}
          </FormButton>
        )}
        {/* {form.id ? (
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
            >
              Save Grade
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
            // loading={loading}
          >
            Add Grade
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
            Clear
          </FormButton>
        )} */}
      </FormButtonContainer>
    </FormContainer>
  );
}
