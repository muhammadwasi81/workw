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

  const assetItemByUserIdv2 = useSelector((state) => state.AssetItemSlice);
  console.log(assetItemByUserIdv2, 'assetItemByUserIdv2');
  // const [itemsDeteils, setItemsDeteils] = useState([assetItemByUserIdv2]);

  const employees = useSelector((state) => state.sharedSlice.employees);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
    handleData(data);
    // handleAssetItem(obj);
  };

  //  using getAssetItemByUserId function from slice.js get data
  const handleData = (id) => {
    console.log(id, 'id');
    dispatch(getAssetItemByUserId('3fa85f64-5717-4562-b3fc-2c963f66afa6'));
  };

  // useEffect(() => {
  //   Object.keys(assetItemByUserIdv2).length > 0 &&
  //     setItemsDeteils([...itemsDeteils, assetItemByUserIdv2]);
  // }, [assetItemByUserIdv2]);

  useEffect(() => {
    fetchEmployees('', 0);
  }, []);

  const handleMember = (val) => {
    setNewState({
      ...newState,
      assetItems: [...val],
    });
  };

  const handleAssetItem = (val) => {
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
          label="Select Members"
          showSearch={true}
          direction={Direction}
        >
          <CustomSelect
            mode={'multiple'}
            style={{
              marginBottom: '0px',
            }}
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
          {/* <tbody>
            {inventoryAssets.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td>{item.serialNo}</td>
                </tr>
              );
            })}
          </tbody> */}
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
