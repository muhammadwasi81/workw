import "./style.css";
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
} from "../../../../sharedComponents/Administration/StyledComponents/adminForm";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { complainDictionaryList } from "../../localization/index";
import { useDispatch, useSelector } from "react-redux";

export default function Form({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const [form, setForm] = useState(data);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { complainDictionary } = complainDictionaryList[userLanguage];

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
  const { loader } = useSelector((state) => state.complainCategorySlice);

  return (
    <FormContainer>
      <FormHeader>{complainDictionary.complaincategory}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{complainDictionary.name}</FormLabel>
          <Input
            placeholder={complainDictionary.enterCategoryName}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{complainDictionary.description}</FormLabel>
          <FormTextArea
            placeholder={complainDictionary.enterDescription}
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
              {complainDictionary.saveCategory}
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
            {complainDictionary.addCategory}
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
            {complainDictionary.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
