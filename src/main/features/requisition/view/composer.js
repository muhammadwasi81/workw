import { Button, Form, Input, Avatar, InputNumber, DatePicker } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import TextInput from '../../../sharedComponents/Input/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEmployees } from '../../../../utils/Shared/store/actions';
import './style.css';
import { addRequisition } from '../store/actions';
import SingleUpload from '../../../sharedComponents/Upload/singleUpload';
import { requisitionDictionaryList } from '../localization/index';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import CustomSelect from '../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import { getNameForImage, STRINGS } from '../../../../utils/base';
import { emptyEmployeesData } from '../../../../utils/Shared/store/slice';

const initialState = {
  id: '',
  name: '',
  reason: '',
  description: '',
  categoryId: '',
  imageId: '',
  attachments: [],
  finalApprovers: [
    {
      approverId: '',
      approverType: 0,
    },
  ],
  approvers: [
    {
      approverId: '',
      approverType: 0,
      isDefault: true,
      status: 1,
      email: '',
    },
  ],
};

const Composer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, requisitionDictionary } = requisitionDictionaryList[
    userLanguage
  ];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [state, setState] = useState(initialState);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const { success, loader } = useSelector((state) => state.requisitionSlice);
  const employees = useSelector((state) => state.sharedSlice.employees);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
    // setMembers(obj);
    // onChange(data, obj);
  };
  useEffect(() => {
    fetchEmployees('', 0);
  }, []);

  const handleMember = (val) => {
    setNewState({
      ...newState,
      members: [...val],
    });
  };

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const [newState, setNewState] = useState({
    members: [],
    memberType: null,
  });

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    if (employees.length !== 0) {
      dispatch(emptyEmployeesData());
      setIsFirstTimeDataLoaded(false);
    }
  }, []);

  //   const handleImageUpload = (data) => {
  //     setProfileImage(data);
  //   };

  const onFinish = (values) => {
    let approvers = [];
    let finalApprovers = [];
    if (typeof values.approvers === 'string') {
      approvers.push({
        approverId: values.approvers,
      });
    } else {
      approvers = values.approvers.map((approver) => {
        return {
          approverId: approver,
        };
      });
    }
    if (typeof values.finalApprovers === 'string') {
      finalApprovers.push({
        approverId: values.finalApprovers,
      });
    } else {
      finalApprovers = values.finalApprovers.map((member) => {
        return {
          approverId: member,
        };
      });
    }

    const payload = { ...values, attachments, approvers, finalApprovers };
    dispatch(addRequisition(payload));
  };
  useEffect(() => {
    if (success) {
      form.resetFields();
    }
  }, [success]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="addRequisition"
        labelCol={{
          span: 24,
        }}
        style={{ direction: Direction }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={Direction === 'rtl' ? 'labelRight' : ''}
      >
        <Form.Item
          label={requisitionDictionary.name}
          name="name"
          labelPosition="top"
          style={{ direction: Direction }}
          rules={[
            {
              required: true,
              message: requisitionDictionary.PleaseEnterRequisitionName,
            },
          ]}
        >
          <TextInput placeholder={requisitionDictionary.EnterRequisitionName} />
        </Form.Item>

        <Form.Item
          label={requisitionDictionary.description}
          name="description"
          rules={[
            {
              required: true,
              message: requisitionDictionary.enterDescription,
            },
          ]}
        >
          <Input.TextArea
            placeholder={requisitionDictionary.enterDescription}
          />
        </Form.Item>

        <Form.Item
          label={requisitionDictionary.Budget}
          name="budget"
          rules={[
            {
              required: true,
              message: requisitionDictionary.EnterBudget,
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            size={'large'}
            placeholder={requisitionDictionary.EnterBudget}
          />
        </Form.Item>
        <Form.Item
          label={'End Date'}
          name="requisitionDate"
          rules={[
            {
              required: true,
              message: 'Please Select Date',
            },
          ]}
        >
          <DatePicker
            size="large"
            style={{ width: '100%' }}
            placeholder="Date of Request Expire"
          />
        </Form.Item>
        <Form.Item
          label={requisitionDictionary.reason}
          name="reason"
          rules={[
            {
              required: true,
              message: requisitionDictionary.EnterReason,
            },
          ]}
        >
          <TextInput placeholder={requisitionDictionary.EnterReason} />
        </Form.Item>

        <Form.Item
          name="approvers"
          label={requisitionDictionary.approvers}
          showSearch={true}
          direction={Direction}
          style={{ marginBottom: '0px' }}
          rules={[{ required: true }]}
        >
          <CustomSelect
            style={{ marginBottom: '0px' }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={requisitionDictionary.selectApprovers}
            mode={'multiple'}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar name={opt.name} src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="approvers"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: requisitionDictionary.PleaseSelectApprover,
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="finalApprovers"
          label={requisitionDictionary.FinalApprovers}
          showSearch={true}
          direction={Direction}
          style={{ marginBottom: '0px' }}
          rules={[{ required: true }]}
        >
          <CustomSelect
            style={{ marginBottom: '0px' }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={requisitionDictionary.selectMember}
            mode={'multiple'}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar name={opt.name} src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="finalApprovers"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: requisitionDictionary.PleaseSelectFinalApprovers,
              },
            ]}
          />
        </Form.Item>

        <Form.Item area="true">
          <SingleUpload
            handleImageUpload={(files) =>
              setAttachments(
                files.map((file) => ({
                  file: file.originFileObj,
                  id: STRINGS.DEFAULTS.guid,
                }))
              )
            }
            multiple={true}
            uploadText={'Upload'}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
            title={requisitionDictionary.createRequisition}
            loading={loader}
          >
            {requisitionDictionary.createRequisition}{' '}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
