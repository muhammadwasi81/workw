import "./salaryHeader.css";
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
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import { salaryHeaderDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";

export default function SalaryHeaderForm({
  data,
  onSubmit,
  loading,
  clearButton,
  setClearButton,
}) {
  const [form, setForm] = useState(data);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, salaryHeaderDictionary } = salaryHeaderDictionaryList[
    userLanguage
  ];
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
  const { loader } = useSelector((state) => state.salaryHeaderSlice);

  return (
    <FormContainer>
      <FormHeader>{salaryHeaderDictionary.salaryHeader}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{salaryHeaderDictionary.salaryHeader}</FormLabel>
          <Input
            placeholder={salaryHeaderDictionary.enterSalaryHeader}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{salaryHeaderDictionary.desc}</FormLabel>
          <FormTextArea
            placeholder={salaryHeaderDictionary.enterDesc}
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
              className="formBtn"
              onClick={(e) => {
                onSubmit(form);
                setClearButton(false);
              }}
              loading={loading}
            >
              {salaryHeaderDictionary.saveHeader}
            </FormButton>
          </>
        ) : (
          <FormButton
            type="primary"
            size="medium"
            className="formBtn"
            onClick={(e) => {
              onSubmit(form);
              setClearButton(false);
            }}
            loading={loading}
          >
            {salaryHeaderDictionary.addHeader}
          </FormButton>
        )}
        {clearButton && (
          <FormButton
            type="primary"
            size="medium"
            className="formBtn"
            onClick={handleClear}
          >
            {salaryHeaderDictionary.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
