import "./allowance.css";
import { Col, Input, Radio, Row, Select, InputNumber } from "antd";
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
// import Select from "../../../sharedComponents/Select/Select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllGrades } from "../../grade/store/actions";
import { number } from "prop-types";

export default function AllowanceForm({ data, onSubmit, loading, setClearButton, clearButton }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [form, setForm] = useState(data);
  const [amountType, setAmountType] = useState(false)

  const { grades } = useSelector(
    state => state.gradeSlice
  );


  const handleClear = (e) => {
    setForm({ ...form, description: "", name: "", gradeId: null, value: "" })
    setClearButton(false)
  }

  const handelChangeName = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true)
    } else {
      setClearButton(false)
    }
    setForm({ ...form, name: e.target.value })
  }

  const handelChangeAmount = (value) => {
    if (value.length > 0) {
      setClearButton(true)
    } else {
      setClearButton(false)
    }
    setForm({ ...form, value })
  }

  const handelChangeDescription = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true)
    } else {
      setClearButton(false)
    }
    setForm({ ...form, description: e.target.value })
  }

  const handelChangeGrade = (value) => {
    if (value.length > 0) {
      setClearButton(true)
    } else {
      setClearButton(false)
    }
    const x = grades.filter((item) => item.id === value)
    setForm({ ...form, gradeId: x[0].id })

  }

  const handleType = (e) => {
    setForm({ ...form, allowanceType: e.target.value });
    let type = e.target.value;
    if (type === 2) {
      setAmountType(true)
    } else {
      setAmountType(false)
    }
    setValue(e);
  };

  useEffect(() => {
    setForm(data);
    dispatch(getAllGrades())
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
              {
                amountType == false ?
                  <>
                    <FormLabel>Percent</FormLabel>
                    <InputNumber
                      onChange={handelChangeAmount}
                      value={form.value}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace('%', '')}
                      placeholder="0"
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </>
                  :
                  <>
                    <FormLabel>Amount</FormLabel>
                    <InputNumber onChange={handelChangeAmount} value={form.value} placeholder={"Enter Amount"} size="large" style={{width: "100%"}} />
                  </>
              }
            </AllowncesFormInput>
            <AllowncesFormInput>
              <FormLabel>Description</FormLabel>
              <FormTextArea
                placeholder={"Enter Description"}
                value={form.description}
                onChange={handelChangeDescription}
              />
            </AllowncesFormInput>
            <AllowncesFormInput>
              <FormLabel>Grade</FormLabel>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select Grade"
                optionFilterProp="children"
                onChange={handelChangeGrade}
                value={form.gradeId}
                name="gradeId"
                size="large"
              >
                {grades.map((item) => (
                  <Select.Option value={item.id}>{item.name}</Select.Option>
                ))}
              </Select>
            </AllowncesFormInput>
          </Col>
          <Col lg={22} md={24} xl={10} sm={24} xs={24} style={{ paddingTop: 27, }}>
            <div className="radioContainer">
              <Radio.Group
                onChange={handleType}
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
                onClick={(e) => { onSubmit({ ...form, value: Number(form.value) }); setClearButton(false) }}
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
                onSubmit({ ...form, value: Number(form.value) });
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
