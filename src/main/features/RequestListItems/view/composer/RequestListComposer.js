import { Button, Form, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '../../../../../utils/Shared/store/actions';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import TextInput from '../../../../sharedComponents/Input/TextInput';
import { getAllCustomApprovalCategory } from '../../../customApprovalCategory/store/actions';
import CustomSelect from '../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import { getAllAssetCategories } from '../../../assetsCategory/store/actions';
import { addRequestListItems } from '../../store/action';
import { modifySelectData } from '../../../../../utils/base';
import { requestListDictionaryList } from '../../localization/index';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';

const initialState = {
  id: '',
  categoryId: '',
  assetControllerStatus: 1,
  approvers: [
    {
      approverId: '',
      approverType: 0,
      isDefault: true,
      status: 1,
      email: '',
    },
  ],
  assetController: [
    {
      approverId: '',
      assetControllerStatus: 1,
    },
  ],
};

const Types = [
  { name: 'Non-Consumable', id: 1 },
  { name: 'Consumable', id: 2 },
  { name: 'Service', id: 3 },
];
const Composer = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, requestListDictionary } = requestListDictionaryList[
    userLanguage
  ];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const { assetsData } = useSelector((state) => state.assetsCategorySlice);
  console.log(assetsData, 'assetsData');
  const employees = useSelector((state) => state.sharedSlice.employees);
  const { loader } = useSelector((state) => state.requestItemSlice);

  useEffect(() => {
    dispatch(getAllAssetCategories());
  }, []);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
  };
  useEffect(() => {
    fetchEmployees('', 0);
  }, []);

  const handleMember = (val) => {
    setNewState({
      ...newState,
      approvers: [...val],
      assetController: [...val],
    });
  };

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const [newState, setNewState] = useState({
    approvers: [],
    assetController: [],
  });

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    dispatch(getAllCustomApprovalCategory());
  }, []);

  const onFinish = (values) => {
    let approvers = [];
    let assetController = [];
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
      if (typeof values.assetController === 'string') {
        assetController.push({
          approverId: values.assetController,
        });
      } else {
        assetController = values.assetController.map((assetController) => {
          console.log(assetController, 'assetController');
          return {
            approverId: assetController,
          };
        });
      }
      console.log(values, 'values');
    }
    let payload = {
      ...values,
      approvers: modifySelectData(values.approvers).map((el, index) => {
        return {
          approverId: el,
        };
      }),
      assetController: modifySelectData(values.assetController).map(
        (el, index) => {
          return {
            approverId: el,
          };
        }
      ),
    };
    dispatch(addRequestListItems(payload));
    setState(initialState);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="createRequest"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={requestListDictionary.selectCategory}
          name="categoryId"
          rules={[
            {
              required: true,
              message: 'Please Select Category',
            },
          ]}
        >
          <Select
            placeholder={requestListDictionary.selectCategory}
            style={{
              width: '100%',
              borderRadius: '5px',
            }}
            size="large"
          >
            {assetsData.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={requestListDictionary.selectType}
          name="type"
          rules={[
            {
              required: true,
              message: 'Please Select Type',
            },
          ]}
        >
          <Select
            placeholder={requestListDictionary.selectType}
            style={{
              width: '100%',
              borderRadius: '5px',
            }}
            size="large"
          >
            {Types.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={requestListDictionary.quantity}
          name="quantity"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: 'Please Enter Quantity',
            },
          ]}
        >
          <TextInput placeholder={requestListDictionary.quantity} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: '0px' }}
          name="approvers"
          label={requestListDictionary.approvers}
          showSearch={true}
          direction={Direction}
        >
          <CustomSelect
            style={{ marginBottom: '0px' }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={requestListDictionary.selectApprovers}
            mode={'multiple'}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar
                    name={opt.name}
                    src={opt.image}
                    round={true}
                    width={'30px'}
                    height={'30px'}
                  />
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
                message: 'Please Select Approvers',
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: '0px' }}
          name="assetController"
          label={requestListDictionary.controller}
          showSearch={true}
          direction={Direction}
        >
          <CustomSelect
            style={{ marginBottom: '0px' }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={requestListDictionary.controller}
            mode={'multiple'}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar
                    name={opt.name}
                    src={opt.image}
                    round={true}
                    width={'30px'}
                    height={'30px'}
                  />
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="assetController"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: 'Please Select Assets Controller',
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
            title={requestListDictionary.createRequest}
            loading={loader}
          >
            {requestListDictionary.createRequest}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
