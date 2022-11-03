import { Button, Form, Select, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
import { getAllEmployees } from '../../../../../utils/Shared/store/actions';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import { customApprovalDictionaryList } from '../../../CustomApprovals/localization';
import CustomSelect from '../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import {
  getAssetItemByUserId,
  updateAssetItems,
} from '../../../createAssets/store/action';

const initialState = {
  id: '',
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

const AssetDeAllocationComposer = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = customApprovalDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const { assetItemByUserId } = useSelector((state) => state.AssetItemSlice);
  console.log(assetItemByUserId, 'x.name');

  const employees = useSelector((state) => state.sharedSlice.employees);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
    handleData(data);
  };

  const handleData = (id) => {
    dispatch(getAssetItemByUserId(id));
  };

  useEffect(() => {
    fetchEmployees('', 0);
  }, []);

  const handleMember = (val) => {
    setNewState({
      ...newState,
      assetItems: [...val],
    });
  };

  const fetchEmployees = (text, pgNo) => {
    dispatch(
      getAllEmployees({
        text,
        pgNo,
        pgSize: 20,
      })
    );
  };

  const [newState, setNewState] = useState({
    assetItems: [],
  });

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const onFinish = (values) => {
    let assetItems = [];
    assetItemByUserId.map((x) => {
      assetItems.push({
        id: x.id,
        status: x.status,
        approverStatus: 1,
      });
    });
    dispatch(
      updateAssetItems({
        id: assetItemByUserId[0]?.id,
        status: values.status,
        approverStatus: 1,
      })
    );
    // dispatch(updateAssetItems(assetItems));
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
        name="createAssetDeAllocation"
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
          name="id"
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
            name="id"
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
        <table
          style={{
            border: '1px solid #000',
            width: '100%',
          }}
        >
          <thead
            style={{
              border: '1px solid #000',
              width: '100%',
            }}
          >
            <tr>
              <th>Category Name</th>
              <th>Asset</th>
              <th>Serial No</th>
              <th>Select Status</th>
            </tr>
          </thead>
          <tbody
            style={{
              border: '1px solid #000',
              width: '100%',
            }}
          >
            <tr
              style={{
                textAlign: 'center',
                border: '1px solid #eee',
              }}
            >
              {assetItemByUserId.map((item) => {
                return (
                  <>
                    <td>{item.category}</td>
                    <td>{item.name}</td>
                    <td>{item.serialNo}</td>
                    <td>
                      <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                          {
                            required: true,
                            message: 'Please Select Status',
                          },
                        ]}
                      >
                        <Select
                          style={{ width: '100%' }}
                          placeholder="Select Status"
                          onChange={(e) => {
                            setNewState({
                              ...newState,
                              status: e,
                            });
                          }}
                        >
                          <Select.Option value={4}>Available</Select.Option>
                          <Select.Option value={3}>Allocated</Select.Option>
                          <Select.Option value={2}>
                            Waiting For Handover
                          </Select.Option>
                          <Select.Option value={1}>
                            Waiting For Approval
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </td>
                  </>
                );
              })}
            </tr>
          </tbody>
        </table>
        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
            title="Submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AssetDeAllocationComposer;
