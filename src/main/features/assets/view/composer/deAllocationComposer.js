import { Button, Form } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
import { getAllEmployees } from '../../../../../utils/Shared/store/actions';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import { customApprovalDictionaryList } from '../../../CustomApprovals/localization';
import CustomSelect from '../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import { modifySelectData } from '../../../../../utils/base';
import {
  getAssetItemByUserId,
  updateAssetItems,
} from '../../../createAssets/store/action';

const initialState = {
  id: '',
  description: '',
  handoverId: '',

  assetItems: [
    {
      id: '',
      status: '',
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

  const assetItemByUserId = useSelector((state) => state.AssetItemSlice);
  console.log(assetItemByUserId, 'assetItemByUserId');

  const employees = useSelector((state) => state.sharedSlice.employees);

  const selectedData = (data, obj) => {
    console.log('data', data);
    setValue(data);
    handleMember(obj);
    handleData(data);
  };

  const handleData = (id) => {
    console.log(id, 'id');
    // send handover id to get asset items

    dispatch(getAssetItemByUserId(id));
  };

  useEffect(() => {
    fetchEmployees('', 0);
  }, []);

  const handleMember = (val) => {
    console.log(val, 'val');
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
    // let assetItems = [];
    // if (typeof values.assetItems === 'string') {
    //   assetItems.push({
    //     itemId: values.assetItems,
    //   });
    // } else {
    //   assetItems = values.assetItems.map((assetItem) => {
    //     return {
    //       itemId: assetItem,
    //     };
    //   });
    // }

    let payload = {};
    console.log('de-payload', payload);
    // TODO: Later on we have to patch different APIs
    // dispatch(updateAssetItems(payload));
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

        <table
          style={{
            border: '1px solid #000',
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Asset</th>
              <th>Serial No</th>
              <th>Select Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((item, index) => {
              return (
                <tr
                  key={index}
                  style={{ textAlign: 'center', border: '1px solid #eee' }}
                >
                  <td>{item.userTypeId}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.email}</td>
                </tr>
              );
            })}
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
