import React, { useState,useEffect } from 'react';
import './style.css';
import { Input, InputNumber ,Select} from 'antd';
import {useSelector,useDispatch} from "react-redux";
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
import {getCountries} from "../../../../utils/Shared/store/actions";
  
  const Form=({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
})=> {
    const { Option } = Select;
    const dispatch = useDispatch();
   // const {initialState} = {countryId: [] };

    //const { countryId: [] } = useSelector((state)=>state.taxSlabSlice);
    //const [form] = Form.useForm();

  const {countries} = useSelector((state) => state.sharedSlice);  

  if (!countries.length) dispatch(getCountries());
  const [form, setForm] = useState(data);
  //const [initialValues, setInitialValues] = useState(initialState);
  console.log(data, 'adadada');
//   useEffect(() => {
//     form.setFieldsValue(initialValues);
//   }, [initialValues, form]);

  const handleClear = (e) => {
    setForm({
      ...form,
      name: '',
      min: '',
      max: '',
      percentage: '',
      previousCharge: '',
    });
    setClearButton(false);
  };

  console.log('form', form);

  const handelChangeName = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, name: e.target.value });
  };

  const handelChangeMin = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, min: e.target.value });
  };
  const handelChangeDescription = e => {
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

  return (
    <FormContainer>
      <FormHeader>Tax Slabs Group</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder={'Enter Name'}
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
          name="countryId"
        //   label={"Country"}
          // showSearch={true}
          rules={[{ required: true }]}
        >
         <FormLabel>Country</FormLabel>
          <Select
            showSearch={true}
            placeholder="Please select country."
            size="large"
            getPopupContainer={(trigger) => trigger.parentNode}
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
              onClick={(e) => {
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
            onClick={(e) => {
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
            onClick={handleClear}
          >
            Clear
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
    
  );

}

export default Form;