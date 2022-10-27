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
  getAllAssetItemByUserId,
  updateAssetItems,
} from '../../../createAssets/store/action';

const initialState = {
  id: '',
  description: '',
  handoverId: '',

  assetItems: [
    {
      id: '',
      assetId: '',
      itemId: '',
      name: '',
    },
  ],
};

const AssetDeAllocationComposer = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[
    userLanguage
  ];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const employees = useSelector((state) => state.sharedSlice.employees);
  const { inventoryAssets } = useSelector((state) => state.inventoryAssetSlice);
  const { assetItemList } = useSelector((state) => state.AssetItemSlice);
  console.log(assetItemList, 'assetItemList');

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
      assetItems: [...val],
    });
  };

  const fetchEmployees = (text, pgNo, id) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
    // call getAllAssetItemByUserId here and pass id as a parameter
    dispatch(getAllAssetItemByUserId(id));
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
    dispatch(updateAssetItems(payload));
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
          label="Select Members"
          showSearch={true}
          direction={Direction}
        >
          <CustomSelect
            mode={'multiple'}
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

        <table>
          <thead>
            <th>
              <td>Category Name</td>
              <td>Asset</td>
              <td>Serial No</td>
              <td>Select Status</td>
            </th>
          </thead>
          <tbody>
            {inventoryAssets.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td>{item.serialNo}</td>
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
