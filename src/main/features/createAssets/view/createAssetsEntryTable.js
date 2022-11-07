import { useState } from 'react';
import { Button, message } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllEmployees,
  getAllEmployeeShort,
} from '../../../../utils/Shared/store/actions';
import { addAssetItem } from '../store/action';
import { getAllAllowance } from '../../allowance/store/actions';
import AssetsFooter from './components/AssetsFooter';
import CreateAssetsItem from './components/CreateAssetsItem';
import CreateAssetHead from './components/CreateAssetTableHead';
import { DEFAULT_GUID } from '../../../../utils/constants';

const CreateAssetsEntryTable = () => {
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
    handoverId: '',
  };

  const initialEntries = Array(defaultRows).fill(defaultEntry);
  const [entries, setEntries] = useState(initialEntries);

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
      image: { id: DEFAULT_GUID, file: profileImage },
      handoverId: entries[0].handoverId,
    };
    console.log(payload, payload.handoverId, 'payload');
    return payload;
  };

  const handleSubmit = () => {
    if (
      !entries[0].approvers ||
      !entries[0].inventoryName ||
      !entries[0].inventoryValue
    ) {
      return message.error('Please fill all the fields');
    }
    let payload = createPayload();
    dispatch(addAssetItem(payload));
    setEntries(initialEntries);
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
      </div>
    </div>
  );
};

export default CreateAssetsEntryTable;
