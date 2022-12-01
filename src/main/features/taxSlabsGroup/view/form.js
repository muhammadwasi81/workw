import React, { useState, useEffect } from "react";
import "./style.css";
import { Input, InputNumber, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
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
import { getCountries } from "../../../../utils/Shared/store/actions";

  const Form = ({data,onSubmit,loading,setClearButton,clearButton, }) => {

  const dispatch = useDispatch();
  const [form, setForm] = useState(data);

  const { Option } = Select;
  const { countries } = useSelector((state) => state.sharedSlice);
  if (!countries.length) dispatch(getCountries());
  const {initialState} = {countryId: [] };

  const [initialValues, setInitialValues] = useState(initialState);
    // useEffect(() => {
    //   form.setFieldsValue(initialValues);
    // }, [initialValues, form]);

  // const handleClear = (e) => {
  //   setForm({
  //     ...form,
  //     name: "",
  //     min: "",
  //     max: "",
  //     percentage: "",
  //     previousCharge: "",
  //   });
  //   setClearButton(false);
  // };


  const handelChangeName = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, name: e.target.value });
  };

  const handelChangeCountry = (id) => {
    setForm({ ...form, countryId: id });
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
  }, [data]);

  //console.log(FORM, 'mydata');

  return (
    <FormContainer>
      <FormHeader>Tax Slabs Group</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder={"Enter Name"}
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

         <FormInput
            showSearch={true}
            placeholder="Please select country."
            size="large"
            //name="countryId"
            //label={"Country"}
            rules={[{ required: true }]}
            // value={form.countryId}
          >
          <FormLabel>Country</FormLabel>
          <Select
            //showSearch={true}
            // placeholder="Please select country."
            size="large"
            getPopupContainer={(trigger) => trigger.parentNode}
            onChange={handelChangeCountry}
            value={form.countryId}
          >
            {countries.map((item) => (
              <Option key={item.id}>{item.name}</Option>
            ))}
          </Select>
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
              onClick={e => {
								onSubmit(form);
								setClearButton(false);
							}}
            >
              Save
            </FormButton>
          </>
        ) : (
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={e => {
							onSubmit(form);
							setClearButton(false);
						}}
            loading={loading}
          >
            Add
          </FormButton>
        )}
        {clearButton && (
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
           // onClick={handleClear}
          >
            Clear
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
};

export default Form;
