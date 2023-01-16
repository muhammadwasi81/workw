import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNameForImage } from "../../../../utils/base";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
// import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";

function DepartmentMemberSelect({
  onChange = () => {},
  defaultData = [],
  placeholder = "Search",
  label,
}) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.sharedSlice.employees);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  useEffect(() => {
    setValue(defaultData);
    // setLoading(true);
  }, [JSON.stringify(defaultData)]);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const selectedData = (data, obj) => {
    // setValue(data);
    // setMembers(obj);
    // onChange(data, obj);
  };

  return (
    <>
      <MemberSelect
        data={firstTimeEmpData}
        selectedData={selectedData}
        canFetchNow={isFirstTimeDataLoaded}
        fetchData={fetchEmployees}
        placeholder={placeholder}
        mode={"multiple"}
        isObject={true}
        loadDefaultData={true}
        optionComponent={(opt) => {
          return (
            <>
              <Avatar src={opt.image} className="!bg-black">
                {getNameForImage(opt.name)}
              </Avatar>
              {opt.name}
            </>
          );
        }}
        dataVal={value}
        name="members"
        showSearch={true}
        rules={[
          {
            required: true,
            message: "Members is required",
          },
        ]}
        label={label}
      />
    </>
  );
}

export default DepartmentMemberSelect;
