import React, { useState, useEffect } from "react";
import CustomSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import "../../style.css";
import { SendOutlined } from "@ant-design/icons";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "antd";

function ShareComponent({ item, handleClose }) {
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const [newState, setNewState] = useState({
    members: [],
    memberType: null,
  });
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.sharedSlice.employees);
  // console.log(item,"itemmmm share")
  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
    // setMembers(obj);
    // onChange(data, obj);
  };
  const handleMember = (val) => {
    setNewState({
      ...newState,
      members: [...val],
    });
  };
  const shareHandler = () => {
    handleClose(false);
  };
  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  return (
    <>
      <div className="shareContainer">
        <div className="user-box">
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={"Select User"}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar
                    name={opt.name}
                    src={opt.image}
                    round={true}
                    width={"30px"}
                    height={"30px"}
                  />
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="users"
            showSearch={true}
            // direction={Direction}
            rules={[
              {
                required: true,
                message: "Please Select Users",
              },
            ]}
          />
        </div>
        <div className="shareIcon">
          {" "}
          <SendOutlined onClick={shareHandler} />
        </div>
      </div>
    </>
  );
}
export default ShareComponent;
