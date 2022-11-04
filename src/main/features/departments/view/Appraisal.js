// import "./grade.css";
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
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
export default function Appraisal({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const [form, setForm] = useState(data);

  console.log(clearButton);

  const handleClear = (e) => {
    setForm({ ...form, description: "", name: "" });
    // if ({...form, name: e.length > 0}) {
    //     setClearButton(true)
    // } else if ({...form, name: e.length == 0}) {
    //     setClearButton(false)
    // }
    setClearButton(false);
  };

  const handelChangeName = (e) => {
    // console.log(e.target.value)
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

  // useEffect(() => {
  //   setForm(data);
  // }, [data]);

  return (
    <FormContainer>
      <FormHeader>Appraisal Question</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Question</FormLabel>
          <Input
            placeholder={"Enter Question"}
            value={""}
            onChange={handelChangeName}
          />
        </FormInput>
      </FormInputContainer>
      <FormButtonContainer>
        <FormButton
          type="primary"
          size="medium"
          style={{}}
          className="formBtn"
          onClick={(e) => {
            onSubmit(form);
            setClearButton(false);
          }}
          // loading={loading}
        >
          Add Appraisal Question
        </FormButton>
        {/* {form.id ? (
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
              Save Grade
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
            // loading={loading}
          >
            Add Grade
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
            Clear
          </FormButton>
        )} */}
      </FormButtonContainer>
    </FormContainer>
  );
}
