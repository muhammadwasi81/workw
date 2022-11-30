import './style.css';
import { Input, Radio } from 'antd';
import { useEffect, useState } from 'react';
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
} from '../../../../components/HrMenu/Administration/StyledComponents/adminForm';

export default function RebateCategoryForm({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const [form, setForm] = useState(data);
  const [amountType, setAmountType] = useState(false);
  const [value, setValue] = useState(1);

  const handleClear = (e) => {
    setForm({
      ...form,
      name: '',
      maxPercentage: '',
      maxAmount: '',
      rebateType: '',
    });
    // if ({...form, name: e.length > 0}) {
    //     setClearButton(true)
    // } else if ({...form, name: e.length == 0}) {
    //     setClearButton(false)
    // }
    setClearButton(false);
  };

  const rebateType = (e) => {
    setForm({ ...form, rebateType: e.target.value });
    // let type = e.target.value;
    // if (type === 2) {
    //   setAmountType(true)
    // } else {
    //   setAmountType(false)
    // }
    setValue(e);
  };

  const handelChangeName = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, name: e.target.value });
  };

  const handelMaxPercentage = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, maxPercentage: e.target.value });
  };

  const handelMaxAmount = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, maxAmount: e.target.value });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>Rebate Category</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Group Name</FormLabel>
          <Input
            placeholder={'Enter Name'}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Max Percentage</FormLabel>
          <Input
            placeholder={'Enter Max Percentage'}
            value={form.maxPercentage}
            onChange={handelMaxPercentage}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Max Amount</FormLabel>
          <Input
            placeholder={'Enter Max Amount'}
            value={form.maxAmount}
            onChange={handelMaxAmount}
          />
        </FormInput>
        <FormInput>
          <FormLabel style={{ marginBottom: '10px' }}>Type</FormLabel>
          <Radio.Group
            onChange={rebateType}
            name="Type"
            className="radioGroup"
            value={form.rebateType}
          >
            <Radio value={1}>Basic</Radio>
            <Radio value={2}>Tax</Radio>
            <Radio value={3}>Full Amount</Radio>
          </Radio.Group>
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
