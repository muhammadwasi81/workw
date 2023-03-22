import "./style.css";
import { Input, Radio } from "antd";
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
import { rebateCategoryDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
export default function RebateCategoryForm({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const [form, setForm] = useState(data);
  const [amountType, setAmountType] = useState(false);
  const [value, setValue] = useState(1);

  const handleClear = (e) => {
    setForm({
      ...form,
      name: "",
      maxPercentage: "",
      maxAmount: "",
      rebateType: "",
    });
    // if ({...form, name: e.length > 0}) {
    //     setClearButton(true)
    // } else if ({...form, name: e.length == 0}) {
    //     setClearButton(false)
    // }
    setClearButton(false);
  };

  const rebateType = (e) => {
    setForm({ ...form, rebateType: e.target.value });
    // let type = e.target.value;
    // if (type === 2) {
    //   setAmountType(true)
    // } else {
    //   setAmountType(false)
    // }
    setValue(e);
  };

  const handelChangeName = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, name: e.target.value });
  };

  const handelMaxPercentage = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, maxPercentage: e.target.value });
  };

  const handelMaxAmount = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, maxAmount: e.target.value });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { rebateDictionary } = rebateCategoryDictionaryList[userLanguage];
  return (
    <FormContainer>
      <FormHeader>{rebateDictionary.rebateCategory}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{rebateDictionary.groupName}</FormLabel>
          <Input
            placeholder={rebateDictionary.enterGroupName}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{rebateDictionary.maxPercentage}</FormLabel>
          <Input
            placeholder={rebateDictionary.entermaxPercentage}
            value={form.maxPercentage}
            onChange={handelMaxPercentage}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{rebateDictionary.maxAmount}</FormLabel>
          <Input
            placeholder={rebateDictionary.enterMaxAmount}
            value={form.maxAmount}
            onChange={handelMaxAmount}
          />
        </FormInput>
        <FormInput>
          <FormLabel style={{ marginBottom: "10px" }}>
            {rebateDictionary.type}
          </FormLabel>
          <Radio.Group
            onChange={rebateType}
            name="Type"
            className="radioGroup"
            value={form.rebateType}
          >
            <Radio value={1}> {rebateDictionary.basic}</Radio>
            <Radio value={2}>{rebateDictionary.tax}</Radio>
            <Radio value={3}>{rebateDictionary.fullAmount}</Radio>
          </Radio.Group>
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
              loading={loading}
              onClick={(e) => {
                onSubmit(form);
                setClearButton(false);
              }}
            >
              {rebateDictionary.save}
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
            {rebateDictionary.add}
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
            {rebateDictionary.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
