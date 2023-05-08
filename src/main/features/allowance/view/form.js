import "./allowance.css";
import { Col, Input, Radio, Row, Select, InputNumber } from "antd";
import { useEffect, useState, useContext } from "react";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  AllowncesFormInput,
  FormInputContainer,
  FormLabel,
  FormTextArea,
} from "../../../sharedComponents/Administration/StyledComponents/adminForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllGrades } from "../../grade/store/actions";
import { allowanceDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
export default function AllowanceForm({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [form, setForm] = useState(data);
  const [amountType, setAmountType] = useState(false);

  const { grades } = useSelector((state) => state.gradeSlice);
  const { loader } = useSelector((state) => state.allowanceSlice);
  const handleClear = (e) => {
    setForm({ ...form, description: "", name: "" });
    setClearButton(false);
  };

  const handelChangeName = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, name: e.target.value });
  };

  const handelChangeAmount = (value) => {
    if (value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, value });
  };

  const handelChangeDescription = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, description: e.target.value });
  };

  useEffect(() => {
    setForm(data);
    dispatch(getAllGrades());
  }, [data]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { allowanceDictionary, Direction } = allowanceDictionaryList[
    userLanguage
  ];
  return (
    <FormContainer>
      <FormHeader>{allowanceDictionary.allowance}</FormHeader>
      <FormInputContainer>
        <Row gutter={[16, 16]} className="radioGroupRow">
          <Col lg={22} md={24} xl={14} sm={24} xs={24}>
            <AllowncesFormInput>
              <FormLabel>{allowanceDictionary.allowance}</FormLabel>
              <Input
                placeholder={allowanceDictionary.enterAllownace}
                value={form.name}
                onChange={handelChangeName}
              />
            </AllowncesFormInput>

            <AllowncesFormInput>
              <FormLabel>{allowanceDictionary.desc}</FormLabel>
              <FormTextArea
                placeholder={allowanceDictionary.desc}
                value={form.description}
                onChange={handelChangeDescription}
              />
            </AllowncesFormInput>
          </Col>
          <Col
            lg={22}
            md={24}
            xl={10}
            sm={24}
            xs={24}
            style={{ paddingTop: 27 }}
          >
            <div className="radioContainer">
              <Radio.Group
                onChange={(e) => {
                  setForm({ ...form, allowanceUnit: e.target.value });
                }}
                name="Unit"
                className="radioGroup"
                value={form.allowanceUnit}
              >
                <Radio value={1}>{allowanceDictionary.benefit}</Radio>
                <Radio value={2}>{allowanceDictionary.deduction}</Radio>
              </Radio.Group>

              <Radio.Group
                onChange={(e) => {
                  setForm({ ...form, isTaxable: e.target.value });
                }}
                name="Taxable"
                className="radioGroup"
                value={form.isTaxable}
              >
                <Radio value={true}>{allowanceDictionary.texable}</Radio>
                <Radio value={false}>{allowanceDictionary.nonTexable}</Radio>
              </Radio.Group>
            </div>
          </Col>
        </Row>
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
                onSubmit({ ...form, value: Number(form.value) });
                setClearButton(false);
              }}
              loading={loading}
            >
              {allowanceDictionary.saveAllowance}
            </FormButton>
          </>
        ) : (
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={(e) => {
              onSubmit({ ...form, value: Number(form.value) });
              setClearButton(false);
            }}
            loading={loading}
          >
            {allowanceDictionary.addAllowance}
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
            {allowanceDictionary.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
