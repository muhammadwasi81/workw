import { useEffect, useState } from 'react';
import {
  FormButton,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
} from '../../../../components/HrMenu/Administration/StyledComponents/adminForm';
import { Input, Select } from 'antd';
import { FormButtonContainer } from '../../../sharedComponents/StyledComponents/adminForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChartOfAccount } from '../../chartOfAccount/store/actions';

const accountTypes = [
  { id: 1, label: 'Asset' },
  { id: 2, label: 'Liability' },
  { id: 3, label: 'Capital' },
  { id: 4, label: 'Revenue' },
  { id: 5, label: 'Expense' },
  { id: 6, label: 'Cost of Good Sold' },
];

const AssetsCategoryForm = ({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(data);
  console.log(form, 'data');

  const { listData } = useSelector((state) => state.chartOfAccountsSlice);
  console.log(listData, 'listData');

  useEffect(() => {
    dispatch(getAllChartOfAccount());
  }, []);

  const handleClear = () => {
    setForm({
      ...form,
      name: '',
      description: '',
      accountName: '',
      parentId: '',
    });
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

  const handleDescription = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, description: e.target.value });
  };
  const handelChangeBranch = (e) => {
    if (e.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, accountName: e, parentId: undefined });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>Assets Category</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Category Name</FormLabel>
          <Input
            placeholder={'Category Name'}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Description</FormLabel>
          <Input.TextArea
            value={form.description}
            placeholder={'Enter Description'}
            onChange={handleDescription}
          />
        </FormInput>
        {!data.parentId ? (
          <FormInput>
            <FormLabel>Account Type</FormLabel>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select Type"
              defaultValue={form.accountName}
              optionFilterProp="children"
              onChange={handelChangeBranch}
              value={form.accountName}
              size="large"
            >
              {accountTypes.map((item, i) => (
                <Select.Option value={item.id} key={i}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </FormInput>
        ) : null}

        {!data.accountId ? (
          <FormInput>
            <FormLabel>Parent Account</FormLabel>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select Parent"
              defaultValue={form.parentId}
              optionFilterProp="children"
              onChange={(e) => setForm({ ...form, parentId: e })}
              value={form.parentId}
              size="large"
            >
              {listData.map((item, i) => (
                <Select.Option value={item.id} key={i}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </FormInput>
        ) : null}
      </FormInputContainer>
      <FormButtonContainer>
        {form.id ? (
          <>
            <FormButton
              type="primary"
              size="medium"
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
            className="formBtn"
            onClick={handleClear}
          >
            Clear
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
};

export default AssetsCategoryForm;
