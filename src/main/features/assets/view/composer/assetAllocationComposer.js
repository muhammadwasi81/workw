import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
import { getAllEmployees } from '../../../../../utils/Shared/store/actions';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import { customApprovalDictionaryList } from '../../../CustomApprovals/localization';
import CustomSelect from '../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import { addInventoryAsset, getAllInventoryAsset } from '../../store/action';
import { modifySelectData } from '../../../../../utils/base';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const initialState = {
  id: '',
  description: '',
  handoverId: '',
  approvers: [
    {
      approverId: '',
      approverType: 0,
      isDefault: true,
      status: 1,
      email: '',
    },
  ],
  assetItems: [
    {
      id: '',
      assetId: '',
      itemId: '',
      name: '',
      code: '',
    },
  ],
};

const AssetComposer = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } =
    customApprovalDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [firstTimeInvData, setFirstTimeEnvData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [isFirstTimeInvLoaded, setIsFirstTimeInvLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);

  const employees = useSelector((state) => state.sharedSlice.employees);
  const { inventoryAssets } = useSelector((state) => state.inventoryAssetSlice);
  const { assetItemList } = useSelector((state) => state.AssetItemSlice);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
  };

  useEffect(() => {
    fetchEmployees('', 0);
  }, []);

  useEffect(() => {
    fetchInventoryAssets('', 0);
  }, []);

  const changeData = (e) => {
    setInput(e);
  };

  const handleInputChange = () => {
    if (input.length === 0) {
      return message.error('Please select a value');
    }
    setData([...data, input]);
    setInput('');
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleMember = (val) => {
    setNewState({
      ...newState,
      approvers: [...val],
      assetItems: [...val],
    });
  };

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const fetchInventoryAssets = (text, pgNo) => {
    dispatch(getAllInventoryAsset({ text, pgNo, pgSize: 20 }));
  };

  const [newState, setNewState] = useState({
    approvers: [],
    assetItems: [],
  });

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
    if (inventoryAssets.length > 0 && !isFirstTimeInvLoaded) {
      setIsFirstTimeInvLoaded(true);
      setFirstTimeEnvData(inventoryAssets);
    }
  }, [employees, inventoryAssets]);

  const onFinish = (values) => {
    let approvers = [];
    let assetItems = [];

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
    if (typeof values.assetItems === 'string') {
      assetItems.push({
        itemId: values.assetItems,
        name: values.assetItems,
      });
    } else {
      assetItems = values.assetItems.map((assetItem) => {
        return {
          itemId: assetItem,
          name: assetItem,
        };
      });
    }

    let payload = {
      ...values,
      approvers: modifySelectData(values.approvers).map((el, index) => {
        return {
          approverId: el,
        };
      }),
      assetItems: modifySelectData(data).map((el, index) => {
        return {
          itemId: el,
        };
      }),
    };
    dispatch(addInventoryAsset(payload));
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
        name="createAssetAllocation"
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
          name="handoverId"
          label="Handover"
          showSearch={true}
          direction={Direction}
        >
          <CustomSelect
            style={{ marginBottom: '0px' }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={'Select Members'}
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
            name="handoverId"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: 'Please Select Member',
              },
            ]}
          />
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
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please Enter Description',
            },
          ]}
        >
          <Input.TextArea placeholder="Enter Description" />
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Please Select Item"
              name="assetItems"
              rules={[
                {
                  required: true,
                  message: 'Please Select Item',
                },
              ]}
            >
              <Select
                placeholder="Please Select Item"
                style={{
                  width: '100%',
                  borderRadius: '5px',
                }}
                size="large"
                onChange={(e) => changeData(e)}
              >
                {assetItemList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {data.includes(item.id) ? (
                      <></>
                    ) : (
                      <>
                        <span>{item.name}</span>
                        <span>{item.code}</span>
                      </>
                    )}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              style={{
                borderRadius: '5px',
                width: '100%',
                marginTop: '31px',
                height: '40px',
                backgroundColor: '#526bb1',
                color: '#fff',
                fontSize: '18px',
              }}
              onClick={handleInputChange}
            >
              <PlusOutlined />
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {data.map((item, index) => (
              <>
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                >
                  <strong>
                    {assetItemList.find((el) => el.id === item).name}
                    &nbsp;&nbsp;
                    {assetItemList.find((el) => el.id === item).code}
                  </strong>
                  <Button
                    type="primary"
                    size="medium"
                    className="ThemeBtn"
                    block
                    style={{
                      width: '45px',
                      height: '35px',
                      paddingBottom: '7px',
                    }}
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </>
            ))}
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
            title="Create Asset Allocation"
          >
            Create Asset Allocation
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AssetComposer;
