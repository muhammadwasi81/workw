import "./reward.css";
import { Input } from "antd";
import { useEffect, useState } from "react";
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
export default function RewardCategoryForm({ data, onSubmit, loading, clearButton, setClearButton }) {
  const [form, setForm] = useState(data);

  const handleClear = (e) => {
    setForm({...form, description: "", name: ""})
    setClearButton(false)
}

const handelChangeName = (e) => {
  console.log(e.target.value)
  if (e.target.value.length > 0) {
    setClearButton(true)
  } else {
    setClearButton(false) 
  }
  setForm({ ...form, name: e.target.value })
}

const handelChangeDescription = (e) => {
  if (e.target.value.length > 0) {
    setClearButton(true)
  } else {
    setClearButton(false) 
  }
  setForm({ ...form, description: e.target.value })
}


  useEffect(() => {
    setForm(data);
    
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>Reward Category</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Reward Category</FormLabel>
          <Input
            placeholder={"Enter Reward Category"}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Description</FormLabel>
          <FormTextArea
            placeholder={"Enter Description"}
            value={form.description}
            onChange={handelChangeDescription}
          />
        </FormInput>
      </FormInputContainer>
      <FormButtonContainer>
      {
          form.id ? 
          <>
            <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={(e) => {onSubmit(form); setClearButton(false)}}
          >
            Save Category
          </FormButton>
          </>
        : 
        <FormButton
          type="primary"
          size="medium"
          style={{}}
          className="formBtn"
          onClick={(e) => {
            onSubmit(form);
            setClearButton(false)
          }}
          // loading={loading}
      >
        Add Category 
      </FormButton>
        }
        {
            clearButton && 
            <FormButton
              type="primary"
              size="medium"
              style={{}}
              className="formBtn"
              onClick={handleClear}
            >
              Clear 
            </FormButton>
          }
      </FormButtonContainer>
    </FormContainer>
  );
}
