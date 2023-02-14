import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Select, Table } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { dictionaryList } from '../../../../utils/localization/languages';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { employeeDictionaryList } from '../localization/index';
import '../Styles/employeeForm.css';
import { relations } from '../../../../utils/Shared/enums/enums';
import { useSelector, useDispatch } from 'react-redux';
import { resetEmergencydetails } from '../store/slice';
import {
  addUserEmergencyContactAction,
  getUserEmergency,
  updateUserEmergencyContactAction,
} from '../../emergencyInfo/store/actions';
import { handleResetEmergencyInfo } from '../../emergencyInfo/store/slice';

const { Option } = Select;

const EmergencyForm = ({ mode, userId }) => {
  const param = useParams();
  const isEdit = mode === 'edit';
  const [emergencyInfo, setEmergencyInfo] = useState([]);
  const [newUserId, setNewUserId] = useState('');
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { employeesDictionary, Direction } = employeeDictionaryList[
    userLanguage
  ];

  const { emergencyInformation, success, emergencyDetails } = useSelector(
    (state) => state.emergencyInfoSlice
  );
  console.log(emergencyDetails?.id, 'emergencyInformation');

  const initialState = {
    name: '',
    address: '',
    contactNo: '',
    relation: [],
  };
  const [initialValues, setInitialValues] = useState(initialState);
  const labels = employeesDictionary.EmergencyForm;
  const placeholder = employeesDictionary.placeholders;
  const [form] = Form.useForm();

  Object.defineProperty(form, 'values', {
    value: function() {
      return emergencyInformation;
    },
    writable: true,
    enumerable: true,
    configurable: true,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) setEmergencyInfo([]);
    dispatch(handleResetEmergencyInfo());
  }, [success]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  useEffect(() => {
    if (isEdit) setEmergencyInfo(emergencyInformation);
  }, [emergencyInformation]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getUserEmergency(userId));
    }
    return () => {
      dispatch(resetEmergencydetails());
    };
  }, []);

  const handleAddMore = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        //TODO: here we will add emergency info
        if (isEdit) {
          console.log('is edit work');
          const payloadObj = {
            payload: form.getFieldsValue(),
            id: param.id,
          };
          dispatch(addUserEmergencyContactAction(payloadObj));
        }

        setEmergencyInfo((preValues) => [...preValues, form.getFieldsValue()]);
        form.resetFields();
        setInitialValues(initialState);
      }
    } catch (err) {
      console.log(err, 'err');
      throw new Error('something went wrong', { cause: err });
    }
  };

  const handleRowChange = (rowIndex) => {
    setInitialValues(emergencyInfo[rowIndex]);
    const emergencyInfoArr = [...emergencyInfo];
    emergencyInfoArr.splice(rowIndex, 1);
    setEmergencyInfo(emergencyInfoArr);
  };

  const columns = (data) => {
    return [
      {
        title: labels.Name,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: labels.Address,
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: labels.Number,
        dataIndex: 'contactNo',
        key: 'contactNo',
      },
      {
        title: labels.Relation,
        dataIndex: 'relation',
        key: 'relation',
        render: (value) => {
          return relations[value - 1]?.name;
        },
      },

      {
        title: sharedLabels.action,
        render: (value, __, rowIndex) => {
          return (
            <a
              href=" "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isEdit) {
                  handleRowChange(rowIndex);
                  setNewUserId(data[rowIndex].id);
                  console.log(data[rowIndex].id, 'data[rowIndex].id');
                } else {
                  const filterArray = data.filter((value, i) => {
                    if (rowIndex !== i) return value;
                  });
                  setEmergencyInfo(filterArray);
                }
              }}
            >
              {isEdit ? sharedLabels.Edit : sharedLabels.Delete}
            </a>
          );
        },
      },
    ];
  };

  const createPayload = () => {
    const payload = {
      userId: userId,
      id: newUserId,
      name: form.getFieldValue('name'),
      address: form.getFieldValue('address'),
      contactNo: form.getFieldValue('contactNo'),
      relation: form.getFieldValue('relation'),
    };
    return payload;
  };

  const handleUpdate = () => {
    const payloadData = createPayload();
    console.log(payloadData, 'payloadData');
    dispatch(updateUserEmergencyContactAction(payloadData));
    // setEmergencyInfo((preValues) => [...preValues, form.getFieldsValue()]);
    setEmergencyInfo((preValues) => [...preValues, payloadData]);
    form.resetFields();
    setInitialValues(initialState);
  };

  let classes = 'employeeForm emergencyInfo ';
  classes += Direction === 'ltr' ? 'ltr' : 'rtl';
  return (
    <div className={classes}>
      <Divider orientation="left"> {labels.EmergencyInfo}</Divider>
      <Form
        name="emergencyInfo"
        form={form}
        layout={'vertical'}
        initialValues={initialValues}
      >
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="name"
          label={labels.Name}
        >
          <Input placeholder={placeholder.name}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="address"
          label={labels.Address}
        >
          <Input placeholder={placeholder.address}></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name="contactNo"
          label={labels.Number}
        >
          <Input placeholder={placeholder.number}></Input>
        </Form.Item>

        <Form.Item
          name="relation"
          label={labels.Relation}
          showSearch={true}
          rules={[{ required: true }]}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder={placeholder.selectRelation}
            size="large"
          >
            {relations.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <div className={isEdit ? 'editButtons' : 'buttons'}>
        <Button
          type="dashed"
          className="btn addMore"
          icon={<PlusOutlined />}
          onClick={handleAddMore}
        >
          {labels.AddEmergency}
        </Button>

        {isEdit && (
          <Button
            className="btn ThemeBtn"
            icon={<EditOutlined />}
            onClick={handleUpdate}
          >
            {labels.UpdateEmergency}
          </Button>
        )}
      </div>

      {emergencyInfo.length > 0 && (
        <Table
          columns={columns(emergencyInfo)}
          dragable={true}
          dataSource={emergencyInfo}
        />
      )}
    </div>
  );
};

export default EmergencyForm;
