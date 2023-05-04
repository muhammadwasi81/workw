import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import AntCustomSelect from "../Select";
import { getRandomColor } from "../../../features/schedule/UI/randomColors";

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
  colors = true,
  sliceName = "employees",
  resetField = false,
  className = "",
  returnEmpty = false,
  isIncludedMyId = false,
}) {
  const [value, setValue] = useState("");
  const [stateVal, setStateVal] = useState(dataVal);
  const [defaultValues, setDefaultValues] = useState([]);
  const [stateValWithColor, setStateValWithColor] = useState([]);
  console.log(stateValWithColor, "statevalue with color");

  const [isDataFetchable, setIsDataFetchable] = useState(canFetchNow);
  const debouncedSearch = useDebounce(value, 500);
  const userSlice = useSelector((state) => state.userSlice);
  const user = userSlice.user;
  const [memberData, setMemberData] = useState([...data]);
  const { loader } = useSelector((state) => state.sharedSlice);
  const employees = useSelector((state) => state.sharedSlice[sliceName]);
  const [isAssignDefaultData, setIsAssignDefaultData] = useState(
    loadDefaultData
  );

  const onChange = (value) => {
    const tempArray = String(value).split(",");
    if (!tempArray[0]) {
      setStateVal([]);
    } else {
      if (colors) {
        setStateValWithColor(
          tempArray.map((memberId) => ({
            id: memberId,
            color: getRandomColor(),
          }))
        );
        setStateVal([...tempArray]);
      } else {
        setStateVal([...tempArray]);
      }
    }
  };
  const triggerChange = (changedValue) => {
    change?.(changedValue);
  };
  useEffect(() => {
    if (defaultData.length > 0) {
      let tempArray = [];
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
        filterArrOfObj = employees.filter((val) =>
          stateVal.includes(val[defaultKey])
        );
      }
      if (canFetchNow) {
        if (colors) {
          selectedData(
            stateVal,
            filterArrOfObj.map((member) => ({
              ...member,
              color: stateValWithColor.find((item) => item.id === member.id)
                ?.color,
            }))
          );
        } else {
          selectedData(stateVal, filterArrOfObj);
        }
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

  return (
    <AntCustomSelect
      className={className}
      onDeselect={onDeselect}
      value={stateVal}
      valueWithColors={stateValWithColor}
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
      isIncludedMyId={isIncludedMyId}
    />
  );
}

export default MemberSelect;
