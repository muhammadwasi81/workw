import './grade.css';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
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

export default function DesignationForm({ data, onSubmit, loading }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);
  console.log(data);

  return (
    <FormContainer>
      <FormHeader>Designation</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Designation</FormLabel>
          <Input
            placeholder={'Enter Designation'}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Description</FormLabel>
          <FormTextArea
            placeholder={'Enter Description'}
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
              Save Designation
            </FormButton>
            <FormButton
              type="primary"
              size="medium"
              className="formBtn"
              onClick={(e) => setForm({ ...form, description: '', name: '' })}
            >
              Clear
            </FormButton>
          </>
        ) : (
          <FormButton
            type="primary"
            size="medium"
            className="formBtn"
            onClick={(e) => onSubmit(form)}
          >
            Add Designation
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
