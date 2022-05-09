import "./allowance.css";
import { Col, Input, Radio, RadioContainer, Row } from "antd";
import { useEffect, useState } from "react";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  AllowncesFormInput,
  FormInputContainer,
  FormLabel,
  FormTextArea,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";

export default function AllowanceForm({ data, onSubmit, loading, setClearButton, clearButton }) {
  const [value, setValue] = useState(1);
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
      <FormHeader>Allowance</FormHeader>
      <FormInputContainer>
        <Row gutter={[16, 16]} className="radioGroupRow">
          <Col lg={22} md={24} xl={14} sm={24} xs={24}>
            <AllowncesFormInput>
              <FormLabel>Allowance</FormLabel>
              <Input
                placeholder={"Enter Allowance"}
                value={form.name}
                onChange={handelChangeName}
              />
            </AllowncesFormInput>
            <AllowncesFormInput>
              <FormLabel>Description</FormLabel>
              <FormTextArea
                placeholder={"Enter Description"}
                value={form.description}
                onChange={handelChangeDescription}
              />
            </AllowncesFormInput>
          </Col>
          <Col lg={22} md={24} xl={10} sm={24} xs={24} style={{paddingTop: 27,}}>
            <div className="radioContainer">
              <Radio.Group
                onChange={(e) => {
                  setForm({ ...form, allowanceType: e.target.value });
                }}
                name="Type"
                className="radioGroup"
                value={form.allowanceType}
              >
                <Radio value={1}>Percent</Radio>
                <Radio value={2}>Amount</Radio>
              </Radio.Group>

              <Radio.Group
                onChange={(e) => {
                  setForm({ ...form, allowanceUnit: e.target.value });
                }}
                name="Unit"
                className="radioGroup"
                value={form.allowanceUnit}
              >
                <Radio value={1}>Benefit</Radio>
                <Radio value={2}>Deduction</Radio>
              </Radio.Group>

              <Radio.Group
                onChange={(e) => {
                  setForm({ ...form, isTaxable: e.target.value });
                }}
                name="Taxable"
                className="radioGroup"
                value={form.isTaxable}
              >
                <Radio value={true}>Texable</Radio>
                <Radio value={false}>Non Texable</Radio>
              </Radio.Group>
            </div>
          </Col>
        </Row>
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
            Save Allowance
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
        Add Allowance 
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
