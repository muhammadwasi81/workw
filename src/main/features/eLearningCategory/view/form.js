import "./ELearningCategory.css";
import { Input } from "antd";
import { useEffect, useState, useContext } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
  FormTextArea,
} from "../../../sharedComponents/Administration/StyledComponents/adminForm";
export default function ELearningCategoryForm({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];
  console.log("jkjll", administration.grade.Grade);

  const [form, setForm] = useState(data);
  const handleClear = (e) => {
    setForm({ ...form, description: "", name: "" });
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

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>
        {administration.elearningCategory.elearningCategory}
      </FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>
            {administration.elearningCategory.elearningCategory}
          </FormLabel>
          <Input
            placeholder={
              administration.elearningCategory.enterelearningCategory
            }
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{administration.elearningCategory.description}</FormLabel>
          <FormTextArea
            placeholder={administration.elearningCategory.enterDescription}
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
            >
              {administration.elearningCategory.save}
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
            {administration.elearningCategory.Add}
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
            {administration.elearningCategory.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
