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
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
export default function Appraisal({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const [form, setForm] = useState(data);

  const handleClear = (e) => {
    setForm({ ...form, question: "" });
    setClearButton(false);
  };

  const handelChangeName = (e) => {
    // console.log(e.target.value)
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, question: e.target.value });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>Appraisal Question</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Question</FormLabel>
          <Input
            placeholder={"Enter Question"}
            value={form.question}
            onChange={handelChangeName}
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
        {/* <FormButton
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
        </FormButton> */}
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
        )}
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
