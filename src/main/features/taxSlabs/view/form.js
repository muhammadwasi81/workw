import './style.css';
import { Input, InputNumber } from 'antd';
import { useEffect, useState,useContext } from 'react';
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
} from '../../../../components/HrMenu/Administration/StyledComponents/adminForm';

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";

export default function Form({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {

  const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,taxSlab, Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration.grade.Grade);

  const [form, setForm] = useState(data);
  console.log(data, 'adadada');
  const handleClear = (e) => {
    setForm({
      ...form,
      name: '',
      min: '',
      max: '',
      percentage: '',
      previousCharge: '',
    });
    setClearButton(false);
  };

  console.log('form', form);

  const handelChangeName = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, name: e.target.value });
  };

  const handelChangeMin = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, min: e.target.value });
  };

  const handelChangeMax = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, max: e.target.value });
  };

  const handelChangePercentage = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, percentage: e.target.value });
  };

  const handelChangePreviousCharge = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, previousCharge: e.target.value });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>{administration.taxSlab.TaxSlab}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{administration.taxSlab.title}</FormLabel>
          <Input
            placeholder={administration.taxSlab.enterTitle}          
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{administration.taxSlab.min}</FormLabel>
          <InputNumber
            placeholder={administration.taxSlab.enterMin}
            value={form.min}
            onChange={handelChangeMin}
            style={{ width: '100%' }}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{administration.taxSlab.max}</FormLabel>
          <InputNumber
            placeholder={administration.taxSlab.enterMin}
            value={form.max}
            onChange={handelChangeMax}
            style={{ width: '100%' }}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{administration.taxSlab.percentage}</FormLabel>
          <InputNumber
            placeholder={administration.taxSlab.enterPercent}
            value={form.percentage}
            onChange={handelChangePercentage}
            style={{ width: '100%' }}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{administration.taxSlab.previousCharge}</FormLabel>
          <InputNumber
            placeholder={0}
            value={form.previousCharge}
            onChange={handelChangePreviousCharge}
            style={{ width: '100%' }}
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
             {administration.taxSlab.save}
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
           {administration.taxSlab.Add}
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
           {administration.taxSlab.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
