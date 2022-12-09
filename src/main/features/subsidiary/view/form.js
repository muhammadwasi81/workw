import './style.css';
import { Input } from 'antd';
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
  setClearButton,
  clearButton,
  loading,
}) {

  const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,subsidiaryOffice, Direction  } = dictionaryList[userLanguage];
		console.log("jkjll",administration.subsidiary);

  const [form, setForm] = useState(data);
  console.log('data', data);
  const handleClear = (e) => {
    setForm({ ...form, branchTitle: '' });
    setClearButton(false);
  };

  const handelChangebranchTitle = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, branchTitle: e.target.value });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);
  return (
    <FormContainer>
      <FormHeader>
        {administration.subsidiaryOffice.Subsidiary}
        </FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>
            {administration.subsidiaryOffice.title}
            </FormLabel>
          <Input   
            placeholder={administration.subsidiaryOffice.enterTitle}
            value={form.branchTitle}
            onChange={handelChangebranchTitle}
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
            >
             {administration.subsidiaryOffice.save}
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
              {administration.subsidiaryOffice.Add}
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
            {administration.subsidiaryOffice.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
