import "./style.css";
import { Input } from "antd";
import { useEffect, useState } from "react";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
} from "../../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import { jobsDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
export default function Form({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const [form, setForm] = useState(data);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { jobsDictionary } = jobsDictionaryList[userLanguage];
  const handleClear = (e) => {
    setForm({ ...form, question: "" });
    setClearButton(false);
  };

  const handelChangeQuestion = (e) => {
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
      <FormHeader>{jobsDictionary.defaultHiringCritria}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{jobsDictionary.question}</FormLabel>
          <Input
            placeholder={jobsDictionary.enterQuestion}
            value={form.question}
            onChange={handelChangeQuestion}
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
              {jobsDictionary.saveQstn}
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
            {jobsDictionary.addQstn}
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
            {jobsDictionary.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
