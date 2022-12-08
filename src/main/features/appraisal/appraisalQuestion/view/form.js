import "./appraisal.css";
import { Input } from "antd";
import { useEffect, useState ,useContext} from "react";
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

import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext"
import { dictionaryList } from "../../../../../utils/localization/languages";


export default function AppraisalForm({ data, onSubmit, loading, setClearButton, clearButton }) {

  const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,appraisal,Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration);

  const [form, setForm] = useState(data);

  console.log(clearButton)

  const handleClear = (e) => {
      setForm({...form, description: "", name: ""})
      setClearButton(false)
  }

  const handelChangeName = (e) => {
    console.log(e.target.value)
    if (e.target.value.length > 0) {
      setClearButton(true)
    } else {
      setClearButton(false) 
    }
    setForm({ ...form, name: e.target.value })
  }

  const handelChangeDescription = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true)
    } else {
      setClearButton(false) 
    }
    setForm({ ...form, description: e.target.value })
  }

  useEffect(() => {
    setForm(data);
    
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>{administration.appraisal.Appra}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{administration.appraisal.Appra}</FormLabel>
          <Input
            placeholder={administration.appraisal.enterAppraisal}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
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
      {
          form.id ? 
          <>
            <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={(e) => {onSubmit(form); setClearButton(false)}}
          >
           {administration.appraisal.save}
          </FormButton>
          </>
        : 
        <FormButton
          type="primary"
          size="medium"
          style={{}}
          className="formBtn"
          onClick={(e) => {
            onSubmit(form);
            setClearButton(false)
          }}
          // loading={loading}
      >
          {administration.appraisal.Add}
      </FormButton>
        }
        {
            clearButton && 
            <FormButton
              type="primary"
              size="medium"
              style={{}}
              className="formBtn"
              onClick={handleClear}
            >
               {administration.appraisal.clear}
            </FormButton>
          }
      </FormButtonContainer>
    </FormContainer>
  );
}
