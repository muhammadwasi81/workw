import { Button, DatePicker, message, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllEmployees,
  getAllEmployeeShort,
  uploadImage,
} from '../../../../utils/Shared/store/actions';
import { getAllAllowance } from '../../allowance/store/actions';
import { getAllChartOfAccount } from '../../chartOfAccount/store/actions';
import { addAssetItem } from '../store/action';
import { voucherTypes } from '../../voucher/utils/constant';
import CustomModal from '../../workboard/Modal/CustomModal';
import AssetsFooter from './components/AssetsFooter';
import CreateAssetsItem from './components/CreateAssetsItem';
import CreateAssetHead from './components/CreateAssetTableHead';

//TODO:// LATER ON WE HAVE DIFFERENT DATA
const CreateAssetsEntryTable = () => {
  // TODO:// EMPLOYEES KA FILHALL
  const [fetchEmployeesData, setFetchEmployeesData] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const employeesData = useSelector((state) => state.sharedSlice.employees);
  const employeesShortData = useSelector(
    (state) => state.sharedSlice.employeeShort
  );
  useEffect(() => {
    if (isFirstTime && employeesData.length > 0) {
      setFetchEmployeesData(employeesData);
      setIsFirstTime(false);
    }
  }, [employeesData]);

  useEffect(() => {
    fetchEmployees();
    fetchEmployeesShort();
    fetchAllowance();
  }, []);

  const handleImageUpload = (fileData) => {
    console.log('filedata', fileData);
    setProfileImage(fileData[0].originFileObj);
  };

  const handleRowChange = (data, index) => {
    let tempEntries = [...entries];
    tempEntries[index] = data;
    setEntries(tempEntries);
  };

  const fetchEmployees = (text = '', pgNo = 1) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const fetchEmployeesShort = (text = '', pgNo = 1) => {
    dispatch(getAllEmployeeShort({ text, pgNo, pgSize: 20 }));
  };
  const fetchAllowance = () => {
    dispatch(getAllAllowance());
  };

  const defaultRows = 12;
  const defaultEntry = {
    id: '',
    approvers: '',
    inventoryName: '',
    inventoryValue: '',
    serialNo: '',
    category: '',
    type: '',
    handover: '',
    image: '',
  };

  const initialEntries = Array(defaultRows).fill(defaultEntry);
  const [entries, setEntries] = useState(initialEntries);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();
  const totalDiff = entries.reduce((a, c) => a + Number(c.inventoryValue), 0);

  const handleAddRow = () => {
    console.log(defaultEntry, 'defaultEntry');
    setEntries([...entries, defaultEntry]);
  };

  const handleChange = (value, name, index) => {
    console.log(value, name, index, 'value, name, index');
    let tempEntries = [...entries];
    tempEntries[index] = {
      ...tempEntries[index],
      [name]: value,
    };
    setEntries(tempEntries);
  };

  const createPayload = () => {
    let payload = {
      approvers: entries[0].approvers,
      name: entries[0].inventoryName,
      value: Number(entries[0].inventoryValue)
        ? Number(entries[0].inventoryValue)
        : 0,
      serialNo: entries[0].serialNo,
      categoryId: entries[0].category,
      type: Number(entries[0].type),
      image: entries[0].image.file,
      // handover: entry.handover,
    };
    return payload;
  };

  const handleSubmit = () => {
    if (!entries[0].approvers) {
      return message.error('Please select Approvers');
    }
    setEntries(initialEntries);
    let payload = createPayload();
    dispatch(addAssetItem(payload));
    dispatch(uploadImage(profileImage)).then((x) => {
      console.log(x, 'FIRST ONE');
      let photoId = x.payload.data[0].id;
      console.log(photoId, 'photoId');
    });
  };

  return (
    <div className="createEntryTable">
      <div className="flex justify-between items-center my-2 bg-white px-4 py-2 rounded-md"></div>
      <div className="bg-white p-4 rounded-md overflow-x-auto">
        <table>
          <CreateAssetHead />
          <tbody>
            {entries.map((item, ind) => {
              return (
                <CreateAssetsItem
                  key={ind}
                  index={ind}
                  handleChange={handleChange}
                  value={item}
                  handleRowChange={handleRowChange}
                  fetchEmployees={fetchEmployees}
                  fetchEmployeesShort={fetchEmployeesShort}
                  employeesData={fetchEmployeesData}
                  employeesShortData={employeesShortData}
                  handleImageUpload={handleImageUpload}
                />
              );
            })}
          </tbody>
        </table>
        <div>
          <div
            className="defaultBtn addRowBtn cursor-pointer"
            onClick={handleAddRow}
          >
            +
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md flex w-full justify-between mt-5 sticky bottom-2">
        <div>
          <Button
            className="ThemeBtn mr-2"
            onClick={() => setEntries(Array(defaultRows).fill(defaultEntry))}
          >
            Clear
          </Button>
          <Button className="ThemeBtn mr-2" onClick={handleSubmit}>
            Save
          </Button>
        </div>
        <AssetsFooter total={totalDiff} />
        <CustomModal
          isModalVisible={isOpenModal}
          onCancel={() => setIsOpenModal(false)}
          width={'70%'}
          title="Assets Detail"
          footer={null}
          // children={
          //   <VoucherPrint id={AllVouchers[AllVouchers.length - 1]?.id} />
          // }
        />
      </div>
    </div>
  );
};

export default CreateAssetsEntryTable;
