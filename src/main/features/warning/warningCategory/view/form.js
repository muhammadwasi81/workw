import "./warningCategory.css";
import { Input } from "antd";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
  FormTextArea,
} from "../../../../sharedComponents/Administration/StyledComponents/adminForm";
import { warningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
export default function WarningCategoryForm({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
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
  const { userLanguage } = useContext(LanguageChangeContext);
  const { warningDictionary } = warningDictionaryList[userLanguage];
  const { loader } = useSelector((state) => state.warningCategorySlice);
  return (
    <FormContainer>
      <FormHeader>{warningDictionary.warningCategory}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{warningDictionary.warningCategory}</FormLabel>
          <Input
            placeholder={warningDictionary.enterwarningCategory}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{warningDictionary.description}</FormLabel>
          <FormTextArea
            placeholder={warningDictionary.enterDescription}
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
              loading={loading}
            >
              {warningDictionary.saveCategory}
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
            {warningDictionary.addCategory}
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
            {warningDictionary.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
