import './grade.css';
import { Input } from 'antd';
import { useEffect, useState ,useContext} from 'react';
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
  FormTextArea,
} from '../../../../components/HrMenu/Administration/StyledComponents/adminForm';

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext"
import { dictionaryList } from "../../../../utils/localization/languages";


export default function DesignationForm({ data, onSubmit, loading }) {

  const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,designation,sharedLabels,Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration);

  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);
  console.log(data);

  return (
    <FormContainer>
      <FormHeader>{administration.designation.desig}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{administration.designation.desig}</FormLabel>
          <Input
            placeholder={administration.designation.enterdesig}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{administration.designation.description}</FormLabel>
          <FormTextArea
            placeholder={administration.designation.enterDescription}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
              onClick={(e) => onSubmit(form)}
            >
            {administration.designation.save}
            </FormButton>
            <FormButton
              type="primary"
              size="medium"
              className="formBtn"
              onClick={(e) => setForm({ ...form, description: '', name: '' })}
            >
             {administration.designation.clear}
            </FormButton>
          </>
        ) : (
          <FormButton
            type="primary"
            size="medium"
            className="formBtn"
            onClick={(e) => onSubmit(form)}
          >
           {administration.designation.Add}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
