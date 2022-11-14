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
import { DeleteOutlined } from '@ant-design/icons';

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
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[
    userLanguage
  ];

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
  const { success, inventoryAssets } = useSelector(
    (state) => state.inventoryAssetSlice
  );
  console.log(success, 'composer');
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
    setData([...data, e]);
    console.log(data, 'data');
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
    if (inventoryAssets?.length > 0 && !isFirstTimeInvLoaded) {
      setIsFirstTimeInvLoaded(true);
      setFirstTimeEnvData(inventoryAssets);
    }
  }, [employees, inventoryAssets]);

  const onFinish = (values) => {
    if (!values.handoverId) {
      return message.error('Please fill all fields');
    }

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
    console.log(payload, 'payload');
    dispatch(addInventoryAsset(payload));
    setState(initialState);
    form.resetFields();
    setData([]);
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  let filteredAssetList = assetItemList.filter(
    (item) => !data.includes(item.id)
  );
  console.log(filteredAssetList, 'filteredAssetList');

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
          name="handover"
          label="* Members"
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
          name="approverId"
          label={customApprovalDictionary.approvers}
          showSearch={true}
          direction={Direction}
          rules={[{ required: false }]}
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
          />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter Description" />
        </Form.Item>

        <Col span={24}>
          <Form.Item
            style={{ marginBottom: '5px' }}
            name="category"
            label="* Category"
            showSearch={true}
            direction={Direction}
          />
          <Select
            name="category"
            placeholder="Please Select Item"
            style={{
              width: '100%',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            size="large"
            value={'Please Select Item'}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onChange={(e) => {
              changeData(e);
            }}
          >
            {filteredAssetList.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                <>
                  <span>{item.name}</span>
                  <span>{item.code}</span>
                </>
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Row>
          <Col span={24}>
            {data?.length > 0 &&
              data?.map((item, index) => (
                <div
                  key={item.id}
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
                    {assetItemList.find((el) => el?.id === item)?.name}
                    &nbsp;&nbsp;
                    {assetItemList.find((el) => el?.id === item)?.code}
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
