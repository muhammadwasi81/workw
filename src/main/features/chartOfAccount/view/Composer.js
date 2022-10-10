import { Button, Form, Input, Select } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormTextArea } from '../../../../components/HrMenu/Administration/StyledComponents/adminForm';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../utils/localization/languages';
import * as S from '../../employee/Styles/employee.style';
import { FormLabel } from './FormLable';
// import { addBusinessPolicy, updateBusinessPolicy } from "../store/action";
import 'react-quill/dist/quill.snow.css';
// import { handleEdit } from "../store/slice";
import accountTypes from './listView';
import {
  addChartOfAccount,
  getAllChartOfAccount,
  updateChartOfAccount,
} from '../store/actions';
import TextArea from 'antd/lib/input/TextArea';
import { handleEdit } from '../store/slice';
import { STRINGS } from '../../../../utils/base';
const { Option } = Select;

function Composer() {
  const dispatch = useDispatch();
  const { listData, editData } = useSelector(
    (state) => state.chartOfAccountsSlice
  );

  const accountTypes = [
    { accountType: 1, label: 'Asset' },
    { accountType: 2, label: 'Liability' },
    { accountType: 3, label: 'Capital' },
    { accountType: 4, label: 'Revenue' },
    { accountType: 5, label: 'Expense' },
    { accountType: 6, label: 'Cost of Good Sold' },
  ];

  useEffect(() => {
    dispatch(getAllChartOfAccount());
  }, []);

  console.log(editData, 'FROM COMPOSER');

  const onFinish = (values) => {
    let payload = values;
    if (editData) {
      dispatch(
        updateChartOfAccount({
          id: editData.id,
          ...values,
        })
      );
    } else {
      dispatch(
        addChartOfAccount({
          ...payload,
          parentId: payload.parentId ? payload.parentId : STRINGS.DEFAULTS.guid,
        })
      );
    }
  };

  return (
    <div className="ar_container">
      <Form
        onFinish={onFinish}
        className="ar_form businessPolicyForm"
        layout="vertical"
        initialValues={editData}
      >
        <S.FormItem
          name="name"
          label={<FormLabel>{'Name'}</FormLabel>}
          rules={[
            {
              required: true,
              message: 'Please Enter Name',
            },
          ]}
        >
          <Input placeholder={'Enter Name'} size="large" />
        </S.FormItem>
        <S.FormItem
          name="description"
          label={<FormLabel>{'Description'}</FormLabel>}
          rules={[
            {
              required: true,
              message: 'Please Enter Description',
            },
          ]}
        >
          <TextArea></TextArea>
        </S.FormItem>

        {editData ? (
          ''
        ) : (
          <div>
            <S.FormItem
              name="accountType"
              label={<FormLabel>{'Account Type'}</FormLabel>}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Account Type',
                },
              ]}
            >
              <Select
                placeholder={'Select Type'}
                style={{
                  width: '100%',
                  borderRadius: '5px',
                }}
                size="large"
              >
                {accountTypes.map((item) => (
                  <Option value={item.accountType}>{item.label}</Option>
                ))}
              </Select>
            </S.FormItem>

            <S.FormItem
              name="parentId"
              label={<FormLabel>{'Parent Account'}</FormLabel>}
            >
              <Select
                // data={listData}
                placeholder={'Select Parent'}
                style={{
                  width: '100%',
                  borderRadius: '5px',
                }}
                size="large"
              >
                {listData.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </S.FormItem>
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            size="large"
            className="ThemeBtn"
            block
            htmlType="submit"
            title={'Create'}
          >
            {' '}
            {editData ? 'Save' : 'Create'}{' '}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Composer;
