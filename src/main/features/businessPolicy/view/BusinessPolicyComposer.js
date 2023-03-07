import { useContext } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import * as S from '../../employee/Styles/employee.style';
import { FormLabel } from './FormLabel';
import { addBusinessPolicy, updateBusinessPolicy } from '../store/action';
import 'react-quill/dist/quill.snow.css';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../utils/localization/languages';

const { Option } = Select;

const modules = {
  toolbar: [
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ direction: 'rtl' }],
    [{ align: ['center'] }],
  ],
};
const formats = {
  toolbar: [
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ direction: 'rtl' }],
    [{ align: ['center'] }],
    [{ color: [] }, { background: [] }],
  ],
};

function BusinessPolicyComposer({ editData }) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, Direction } = dictionaryList[userLanguage];

  const { createLoader } = useSelector((state) => state.businessPolicySlice);

  const onFinish = (values) => {
    if (values.name.length > 150) {
      return message.error('Name characters limit exceeded');
    } else {
      if (editData) {
        dispatch(updateBusinessPolicy({ ...values, id: editData.id }));
      } else {
        dispatch(addBusinessPolicy(values));
      }
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
        <div>
          <S.FormItem
            direction={Direction}
            name="name"
            label={<FormLabel>{administration.businessPolicy.name}</FormLabel>}
            rules={[
              {
                required: true,
                message: administration.businessPolicy.enterName,
              },
            ]}
          >
            <Input
              placeholder={administration.businessPolicy.enterName}
              size="large"
            />
          </S.FormItem>
          <S.FormItem
            direction={Direction}
            name="typeId"
            rules={[
              {
                required: true,
                message: administration.businessPolicy.type,
              },
            ]}
            label={<FormLabel>{administration.businessPolicy.typee}</FormLabel>}
          >
            <Select
              showSearch
              placeholder={administration.businessPolicy.type}
              size="large"
            >
              <Option value={1}>HR</Option>
              <Option value={2}>Other</Option>
            </Select>
          </S.FormItem>
          <S.FormItem
            name="description"
            rules={[
              {
                required: true,
                message: administration.businessPolicy.EnterDescription,
              },
            ]}
            label={
              <FormLabel>{administration.businessPolicy.description}</FormLabel>
            }
          >
            <ReactQuill
              style={{ overflow: 'hidden' }}
              className="ReactQuill"
              onChange={(e) => console.log(e, 'e')}
              modules={modules}
              formats={formats}
            />
          </S.FormItem>
        </div>

        <Form.Item>
          <Button
            type="primary"
            size="large"
            className="ThemeBtn"
            block
            htmlType="submit"
            title={'Create'}
            loading={createLoader}
          >
            {' '}
            {editData
              ? administration.businessPolicy.save
              : administration.businessPolicy.create}{' '}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BusinessPolicyComposer;
