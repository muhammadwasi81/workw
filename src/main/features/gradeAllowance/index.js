import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../allowance/view/allowance.css";
import {
  getGreadeAllowance,
  getGreadeData,
  addGradeAllowance,
  updateGradeAllowance,
} from "./store/action";

import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  AllowncesFormInput,
  FormInputContainer,
  FormLabel,
  FormTextArea,
} from "../../sharedComponents/Administration/StyledComponents/adminForm";
import { Radio, Row, Select, InputNumber, message, Col } from "antd";
import LeaveTable from "./table";
import { getAllAllowanceGreadeData } from "./store/action";

const GradeAllowances = () => {
  const { gradesData } = useSelector((state) => state.AllGreadeAllowance);
  const { defaultInputValue } = useSelector(
    (state) => state.AllGreadeAllowance
  );
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    gradeId: "",
    allowanceId: "",
    value: "",
    description: "",
    allowanceUnit: null,
  });
  useEffect(() => {
    setFormValues(defaultInputValue);
  }, [defaultInputValue]);
  useEffect(() => {
    dispatch(getGreadeAllowance());
    dispatch(getGreadeData());
  }, []);

  const { allowances, loader } = useSelector(
    (state) => state.AllGreadeAllowance
  );
  const [amountType, setAmountType] = useState(false);

  const submitForm = (formValues) => {
    if (
      !formValues.gradeId ||
      !formValues.allowanceId ||
      !formValues.value ||
      !formValues.description ||
      !formValues.allowanceUnit
    ) {
      return message.error(`These fields are required`);
    }
    // Object.keys(defaultInputValue).length > 0 ?
    //   dispatch(updateGradeAllowance(formValues):dispatch(updateGradeAllowance())

    //   )

    if (Object.keys(defaultInputValue).length > 0) {
      dispatch(updateGradeAllowance(formValues));
      dispatch(getAllAllowanceGreadeData());
    } else {
      dispatch(addGradeAllowance(formValues));
      dispatch(getAllAllowanceGreadeData());
    }
    setFormValues({
      gradeId: "",
      allowanceId: "",
      value: "",
      description: "",
      allowanceUnit: null,
    });
    dispatch(getAllAllowanceGreadeData());
  };
  return (
    <div className="w-full">
      <FormContainer className="bg-white ">
        <FormHeader>Grade Allowance</FormHeader>
        <FormInputContainer>
          <Row gutter={[32]} className="radioGroupRow">
            <AllowncesFormInput>
              <FormLabel>Grades</FormLabel>
              <Select
                showSearch
                value={formValues.gradeId}
                style={{ width: "100%" }}
                optionFilterProp="children"
                name="gradeId"
                size="large"
                onChange={(value) =>
                  setFormValues({ ...formValues, gradeId: value })
                }
              >
                {gradesData?.map((item) => (
                  <Select.Option value={item.id}>{item.name}</Select.Option>
                ))}
              </Select>
            </AllowncesFormInput>
            <AllowncesFormInput>
              <FormLabel>Allowance Type</FormLabel>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select Allowance Type"
                optionFilterProp="children"
                name="allowanceType"
                size="large"
                onChange={(value) =>
                  setFormValues({ ...formValues, allowanceId: value })
                }
                value={formValues.allowanceId}
              >
                {allowances.map((item) => (
                  <Select.Option value={item.id}>{item.name}</Select.Option>
                ))}
              </Select>
            </AllowncesFormInput>

            <Col xs={24} md={12}>
              <div className="mt-4">
                <Radio.Group name="Type" className="radioGroup">
                  <Radio
                    onClick={() => {
                      setAmountType(false);
                      setFormValues({
                        ...formValues,
                        allowanceUnit: 1,
                        value: "",
                      });
                    }}
                    value={1}
                  >
                    Percent
                  </Radio>
                  <Radio
                    onClick={() => {
                      setAmountType(true);
                      setFormValues({
                        ...formValues,
                        allowanceUnit: 2,
                        value: "",
                      });
                    }}
                    value={2}
                  >
                    Amount
                  </Radio>
                </Radio.Group>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <AllowncesFormInput>
                  {amountType === false ? (
                    <>
                      <FormLabel>Percent</FormLabel>
                      <InputNumber
                        placeholder="0"
                        size="large"
                        style={{ width: "100%" }}
                        type="number"
                        onChange={(value) =>
                          setFormValues({ ...formValues, value: value })
                        }
                        value={formValues.value}
                      />
                    </>
                  ) : (
                    <>
                      <FormLabel>Amount</FormLabel>
                      <InputNumber
                        placeholder={"Enter Amount"}
                        size="large"
                        type="number"
                        style={{ width: "100%" }}
                        onChange={(value) =>
                          setFormValues({ ...formValues, value: value })
                        }
                        value={formValues.value}
                      />
                    </>
                  )}
                </AllowncesFormInput>
              </div>
            </Col>
            <AllowncesFormInput>
              <FormLabel>Discription</FormLabel>
              <FormTextArea
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
                value={formValues.description}
                placeholder="Discription"
              />
            </AllowncesFormInput>
          </Row>
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            loading={loader}
            onClick={() => submitForm(formValues)}
          >
            {Object.keys(defaultInputValue).length > 0
              ? "Update Allowance"
              : "Add Allowance"}
          </FormButton>
        </FormInputContainer>
        <FormButtonContainer></FormButtonContainer>
      </FormContainer>
      <div className="m-2 ">
        <LeaveTable />
      </div>
    </div>
  );
};
export default GradeAllowances;
