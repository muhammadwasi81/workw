import { useState, useContext } from "react";
import { Button, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployees,
  getAllEmployeeShort,
} from "../../../../utils/Shared/store/actions";
import { addAssetItem } from "../store/action";
import { getAllAllowance } from "../../allowance/store/actions";
import CreateAssetsItem from "./components/CreateAssetsItem";
import CreateAssetHead from "./components/CreateAssetTableHead";
import { DEFAULT_GUID } from "../../../../utils/constants";
import { getAllAssetCategories } from "../../assetsCategory/store/actions";
import { useNavigate } from "react-router-dom";
import { createAssetsDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
const CreateAssetsEntryTable = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { createAssetsDictionary, Direction } = createAssetsDictionaryList[
    userLanguage
  ];
  const navigate = useNavigate();
  const [fetchEmployeesData, setFetchEmployeesData] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const employeesData = useSelector((state) => state.sharedSlice.employees);
  const employeesShortData = useSelector(
    (state) => state.sharedSlice.employeeShort
  );

  const { assetsData } = useSelector((state) => state.assetsCategorySlice);
  console.log("assetsData", assetsData);

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
    fetchAssetCategories();
  }, []);

  const handleImageUpload = (fileData) => {
    console.log("filedata", fileData);
    setProfileImage(fileData[0].originFileObj);
  };

  const handleRowChange = (data, index) => {
    let tempEntries = [...entries];
    tempEntries[index] = data;
    setEntries(tempEntries);
  };

  const fetchEmployees = (text = "", pgNo = 1) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const fetchEmployeesShort = (text = "", pgNo = 1) => {
    dispatch(getAllEmployeeShort({ text, pgNo, pgSize: 20 }));
  };
  const fetchAllowance = () => {
    dispatch(getAllAllowance());
  };

  const fetchAssetCategories = () => {
    dispatch(getAllAssetCategories());
  };

  const defaultRows = 12;
  const defaultEntry = {
    approvers: "",
    inventoryName: "",
    inventoryValue: "",
    serialNo: "",
    category: "",
    type: "",
    handoverId: "",
    image: "",
  };

  const initialEntries = Array(defaultRows).fill(defaultEntry);
  const [entries, setEntries] = useState(initialEntries);

  const dispatch = useDispatch();

  const handleAddRow = () => {
    console.log(defaultEntry, "defaultEntry");
    setEntries([...entries, defaultEntry]);
  };

  const handleChange = (value, name, index) => {
    console.log(value, name, index, "value, name, index");
    let tempEntries = [...entries];
    tempEntries[index] = {
      ...tempEntries[index],
      [name]: value,
    };
    setEntries(tempEntries);
  };

  const createPayload = () => {
    const filteredAssetsDataData = entries.filter(
      (item) => item.inventoryName !== ""
    );
    console.log(filteredAssetsDataData, "filteredAssetsDataData");
    const payloadData = filteredAssetsDataData.map((item) => {
      return {
        name: item.inventoryName,
        value: item.inventoryValue,
        serialNo: item.serialNo,
        categoryId: item.category,
        type: item.type,
        image: { id: DEFAULT_GUID, file: profileImage },
        handoverId: item.handoverId ? item.handoverId : DEFAULT_GUID,
        approvers: item.approvers ? item.approvers : [],
      };
    });
    console.log(payloadData, "payloadData");
    return { list: payloadData };
  };

  const handleSubmit = () => {
    if (
      entries.every((item) => item.inventoryName === "") ||
      entries.every((item) => item.inventoryValue === "") ||
      entries.every((item) => item.serialNo === "")
    ) {
      return message.error("Please fill at least one row");
    }
    let payload = createPayload();
    console.log(payload, "payload");
    dispatch(addAssetItem(payload));
    setEntries(initialEntries);
    navigate("/assetsList");
  };

  return (
    <div className="createEntryTable">
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
                  data={assetsData}
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
            {createAssetsDictionary.clear}
          </Button>
          <Button className="ThemeBtn mr-2" onClick={handleSubmit}>
            {createAssetsDictionary.save}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssetsEntryTable;
