import { Button, Form, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
import { getAllEmployees } from '../../../../../utils/Shared/store/actions';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import TextInput from '../../../../sharedComponents/Input/TextInput';
import { getAllCustomApprovalCategory } from '../../../customApprovalCategory/store/actions';
import { customApprovalDictionaryList } from '../../../CustomApprovals/localization';
import CustomSelect from '../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import { getAllAssetCategories } from '../../../assetsCategory/store/actions';
import { addRequestListItems } from '../../store/action';

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
  const { Direction, customApprovalDictionary } =
    customApprovalDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const { assetsData } = useSelector((state) => state.assetsCategorySlice);
  const employees = useSelector((state) => state.sharedSlice.employees);

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
    let payload = { ...values, approvers, assetController };
    dispatch(addRequestListItems(payload));

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
          label="Please Select category"
          name="categoryId"
          rules={[
            {
              required: true,
              message: 'Please Enter Category',
            },
          ]}
        >
          <Select
            placeholder="Please Select category"
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
          label="Please Select Type"
          name="type"
          rules={[
            {
              required: true,
              message: 'type',
            },
          ]}
        >
          <Select
            placeholder="Please Select Type"
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
          label={'Quantity'}
          name="quantity"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: 'Please Enter Quantity',
            },
          ]}
        >
          <TextInput placeholder={'Enter Quantity'} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: '0px' }}
          name="approvers"
          label={customApprovalDictionary.approvers}
          showSearch={true}
          direction={Direction}
          rules={[{ required: true }]}
        >
          <CustomSelect
            style={{ marginBottom: '0px' }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={customApprovalDictionary.selectMember}
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
                message: 'Please Select Approver',
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: '0px' }}
          name="assetController"
          label="Controller"
          showSearch={true}
          direction={Direction}
          rules={[{ required: true }]}
        >
          <CustomSelect
            style={{ marginBottom: '0px' }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder="Select Assets Controller"
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
                message: 'Please Select Approver',
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
            title="Create Request"
          >
            Create Request
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
