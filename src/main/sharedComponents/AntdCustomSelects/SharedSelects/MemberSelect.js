import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import AntCustomSelect from "../Select";

function MemberSelect({
  onDeselect,
  data = [],
  selectedData = () => {},
  canFetchNow = false,
  fetchData = () => {},
  defaultData = [],
  defaultKey = "id",
  isObject = false,
  isImage = false,
  placeholder = "Search...",
  mode = "default",
  size = "large",
  optionComponent,
  value: val = mode === "default" ? "" : [],
  onChange: change,
  dataVal = [],
  loadDefaultData = false,
  name = "",
  label = "",
  rules = [],
  showSearch = false,
  emptyStateAfterSelect = false,
  formItem = true,
  sliceName = "employees",
  resetField = false,
  className = "",
  returnEmpty = false,
}) {
  console.log(data, "dataa");
  const [value, setValue] = useState("");
  const [stateVal, setStateVal] = useState(dataVal);
  const [defaultValues, setDefaultValues] = useState([]);
  console.log(defaultValues, "default vv");
  const [isDataFetchable, setIsDataFetchable] = useState(canFetchNow);
  const debouncedSearch = useDebounce(value, 500);
  const userSlice = useSelector((state) => state.userSlice);
  const user = userSlice.user;
  const [memberData, setMemberData] = useState([...data]);
  console.log(memberData, "memberData");
  const { loader } = useSelector((state) => state.sharedSlice);
  const employees = useSelector((state) => state.sharedSlice[sliceName]);
  console.log(employees, "employees");
  const [isAssignDefaultData, setIsAssignDefaultData] = useState(
    loadDefaultData
  );

  const onChange = (value) => {
    const tempArray = String(value).split(",");
    if (!tempArray[0]) {
      setStateVal([]);
    } else {
      setStateVal([...tempArray]);
    }

    // if (emptyStateAfterSelect) {
    // 	setStateVal("");
    // }
  };
  const triggerChange = (changedValue) => {
    change?.(changedValue);
  };
  useEffect(() => {
    if (defaultData.length > 0) {
      let tempArray = [];
      console.log("sssss");
      defaultData.forEach((element) => {
        tempArray.push(element[defaultKey]);
      });
      setStateVal(tempArray);
      setDefaultValues(tempArray);
    }
  }, [defaultData]);

  useEffect(() => {
    if (stateVal.length > 0) {
      let filterArrOfObj;
      if (isObject) {
        console.log("isobject");
        filterArrOfObj = employees.filter((val) =>
          stateVal.includes(val[defaultKey])
        );
      }
      if (canFetchNow) {
        selectedData(stateVal, filterArrOfObj);
      }

      if (stateVal.length > 0) {
        if (stateVal.length === 1) {
          triggerChange(stateVal.toString());
        } else {
          triggerChange(stateVal);
        }
      }
    } else {
      if (returnEmpty) {
        triggerChange(stateVal);
      }
    }
    if (emptyStateAfterSelect && stateVal.length > 0) {
      setStateVal([]);
    }
  }, [stateVal]);

  useEffect(() => {
    if (resetField) {
      setStateVal([]);
    }
  }, [resetField]);

  const onSearch = (value) => {
    if (defaultData.length > 0) {
      setMemberData([...defaultData]);
    } else {
      setMemberData([]);
    }
    setIsDataFetchable(true);
    setValue(value);
  };
  const onSelect = (value) => {
    // console.log("selected value", value);
    // selectedData(value);
  };

  const paginationHandler = (pgNo) => {
    if (debouncedSearch.length > 0) {
      fetchData(debouncedSearch, pgNo);
      setIsDataFetchable(true);
    }
  };

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      fetchData(debouncedSearch, 0);
    } else {
      setMemberData([...data]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (isDataFetchable) {
      const merged = [...memberData, ...employees];
      console.log(merged, "mergedd");
      setMemberData(() => {
        return [...new Map(merged.map((v) => [v.id, v])).values()];
      });
      setIsDataFetchable(false);
    }
  }, [employees]);

  useEffect(() => {
    if (canFetchNow) {
      //TODO: check if default data is not present in employees then add them in the list
      // let myData = data;
      //   defaultData.forEach((def) => {
      //     const result = data.some((data) => def.id === data.id);
      //     if (!result) {
      //       setMemberData([...data, def]);
      //     } else {
      //       setMemberData([...data]);
      //     }
      //   });
      // console.log(defaultData);
      setMemberData([...data]);
    }
  }, [data]);

  useEffect(() => {
    if (isAssignDefaultData && dataVal && dataVal.length > 0) {
      setStateVal([...dataVal]);
      setIsAssignDefaultData(false);
    }
  }, [dataVal]);
  // console.log("isAssignDefaultData", isAssignDefaultData);
  // console.log("data val----", dataVal);
  // console.log("canfetch now", canFetchNow);
  // console.log("data", data);
  // console.log("stateval", stateVal);
  const employeesdata = [...memberData, user];
  return (
    <AntCustomSelect
      className={className}
      onDeselect={onDeselect}
      value={stateVal}
      data={memberData}
      apiData={employees}
      loading={loader}
      onChange={onChange}
      onSearch={onSearch}
      onSelect={onSelect}
      paginationHandler={paginationHandler}
      debouncedSearch={debouncedSearch}
      filterOption={false}
      isEmailSelect={false}
      isImage={isImage}
      mode={mode}
      placeholder={placeholder}
      size={size}
      defaultData={defaultValues}
      optionComponent={optionComponent}
      isLoaded={canFetchNow}
      name={name}
      showSearch={showSearch}
      rules={rules}
      label={label}
      formItem={formItem}
    />
  );
}

export default MemberSelect;
