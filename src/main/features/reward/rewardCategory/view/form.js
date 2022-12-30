import "./reward.css";
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
import { rewardDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";

export default function RewardCategoryForm({
  data,
  onSubmit,
  loading,
  clearButton,
  setClearButton,
}) {
  const [form, setForm] = useState(data);

  const { loader } = useSelector((state) => state.rewardCategorySlice);
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
  const { userLanguage } = useContext(LanguageChangeContext);
  const { rewardDictionary } = rewardDictionaryList[userLanguage];
  return (
    <FormContainer>
      <FormHeader>{rewardDictionary.rewardCategory}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{rewardDictionary.rewardCategory}</FormLabel>
          <Input
            placeholder={rewardDictionary.enterrewardCategory}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{rewardDictionary.description}</FormLabel>
          <FormTextArea
            placeholder={rewardDictionary.enterDescription}
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
              {rewardDictionary.saveCategory}
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
            {rewardDictionary.addCategory}
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
            {rewardDictionary.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
