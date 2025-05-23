import { Button, Form, message, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '../../../../../utils/Shared/store/actions';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import CustomSelect from '../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import {
  getAssetItemByUserId,
  updateAssetItems,
} from '../../../createAssets/store/action';
import '../styles.css';
import { assetsDictionaryList } from '../../localization/index';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';

const initialState = {
  id: '',
  status: '',
};

const AssetDeAllocationComposer = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { assetsDictionary, Direction } = assetsDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const [status, setStatus] = useState('');

  const { assetItemByUserId, loader } = useSelector(
    (state) => state.AssetItemSlice
  );
  console.log(loader, 'loader');
  const employees = useSelector((state) => state.sharedSlice.employees);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
    handleData(data);
  };

  const handleData = (id) => {
    console.log(id, 'id');
    dispatch(getAssetItemByUserId(id));
  };

  useEffect(() => {
    fetchEmployees('', 0);
  }, []);

  const handleMember = (val) => {
    setNewState({
      ...newState,
      id: val.id,
      status: val.status,
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
    id: '',
    status: '',
  });

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const onFinish = (values) => {
    console.log(values, 'values');
    if (!assetItemByUserId[0]?.id) {
      return message.error('No Asset Items Found');
    }
    let payload = {
      ...values,
      id: assetItemByUserId[0]?.id,
      status: status,
    };
    console.log(payload, 'payload data');
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
          label={assetsDictionary.handover}
          showSearch={true}
          direction={Direction}
        >
          <CustomSelect
            style={{ marginBottom: '0px' }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={assetsDictionary.selectMember}
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
        <div className="createAssetEntryTable">
          <div className="bg-white p-4 rounded-md overflow-x-auto">
            <table>
              <thead>
                <tr className="tableWrapper">
                  <th>{assetsDictionary.categoryName}</th>
                  <th>{assetsDictionary.assests}</th>
                  <th>{assetsDictionary.serialNo}</th>
                  <th>{assetsDictionary.selectStatus}</th>
                </tr>
              </thead>
              <tbody>
                {assetItemByUserId?.length > 0 ? (
                  assetItemByUserId?.map((x, i) => (
                    <tr key={i} className="tableWrapper">
                      <td>{x.category ? x.category : 'N/A'}</td>
                      <td>{x.name}</td>
                      <td>{x.serialNo}</td>
                      <td>
                        <Select
                          name="status"
                          style={{ width: '100%' }}
                          placeholder={assetsDictionary.selectStatus}
                          defaultValue={x.status}
                          onChange={(e) => {
                            console.log('e', e);
                            setStatus(e);
                          }}
                        >
                          {/* <Select.Option value={1}>
                            {assetsDictionary.waitingForApproval}
                          </Select.Option>
                          <Select.Option value={2}>
                            {assetsDictionary.waitingForHandover}
                          </Select.Option> */}
                          <Select.Option value={1}>
                            {assetsDictionary.allocated}
                          </Select.Option>
                          <Select.Option value={2}>
                            {assetsDictionary.available}
                          </Select.Option>
                          <Select.Option value={3}>
                            {assetsDictionary.lost}
                          </Select.Option>
                          <Select.Option value={4}>
                            {assetsDictionary.damage}
                          </Select.Option>
                          <Select.Option value={5}>
                            {assetsDictionary.forMaintenance}
                          </Select.Option>
                        </Select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      <strong>No Result Found...</strong>{' '}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Form.Item>
          <Button
            type="primary"
            size="medium"
            className="ThemeBtn"
            block
            htmlType="submit"
            title="Submit"
            loading={loader}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AssetDeAllocationComposer;
