import React, { useEffect, useState, useContext } from "react";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { Avatar, DatePicker, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployees,
  getAllEmployeeShort,
  getEmployeeSalary,
} from "../../../../../../utils/Shared/store/actions";
import { getAllAllowance } from "../../../../allowance/store/actions";

import CustomSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { appraisalDictionaryList } from "../../../localization/index";
import { getAllTask } from "../../../../task/store/actions";
import { Table } from "../../../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import { getAllTaskForAppraisalAction } from "../../../store/action";
import { data } from "jquery";

const { RangePicker } = DatePicker;

const TaskComp = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appraisalDictionary } = appraisalDictionaryList[userLanguage];
  const { Employee, startDate, endDate, task } = appraisalDictionary;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({});
  const [userId, setUserId] = useState('');
  // const [startDateState, setStartDate]= usestate('');
  // const [endDateState, setEndDate] = useState('');
  const [ date, setDate] = useState({startDate: '', endDate: ''})
  const [fetchEmployeesData, setFetchEmployeesData] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const employeesData = useSelector((state) => state.sharedSlice.employees);
  const employeesShortData = useSelector(
    (state) => state.sharedSlice.employeeShort
  );
  const {userTask} = useSelector(
    (state) => state.appraisalModuleSlice
  );



  useEffect(() => {
    fetchEmployees();
    fetchEmployeesShort();
    fetchAllowance();
  }, []);

  useEffect(() => {
    if(date.startDate.length > 1 && date.startDate.length > 1 && userId) {
      console.log('if block works')
      dispatch(
        getAllTaskForAppraisalAction({
          startDate: date.startDate,
          endDate: date.endDate,
          userId
        })
      ); 
      //TODO: dispatch employee salary here
      dispatch(getEmployeeSalary({ id: userId }));
    }
  
  }, [date, userId]);

  useEffect(() => {
    console.log("esssss");
    if (isFirstTime && employeesData.length > 0) {
      console.log("useEffects works when employees data populated");
      setFetchEmployeesData(employeesData);
      setEmployee(employeesData[0]);
      setIsFirstTime(false);
    }
  }, [employeesData]);

  const fetchEmployees = (text = "", pgNo = 1) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const fetchEmployeesShort = (text = "", pgNo = 1) => {
    dispatch(getAllEmployeeShort({ text, pgNo, pgSize: 20 }));
  };

  const fetchAllowance = () => {
    dispatch(getAllAllowance());
  };

  const onFinish = (values) => {
    console.log(values, "values of task comp");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const selectedEmployee = (employee) => {
    // console.log(employeesData, employee);
    let selected = employeesData.filter((el) => el.id === employee);
    setEmployee(selected[0]);
    // console.log(selected[0].id);
    setUserId(selected[0].id);
  };

  const onRangeChange = (dates, dateStrings) => {
    //TODO: change this function according to api call for task
    if (dates) {
      setDate({
        startDate: dates[0].format(),
        endDate: dates[1].format()
      })
    } else {
      console.log("Clear");
    }
  };

  return (
    <>
      <div className="appraisalFormBody drop-shadow">
        <div className="inputBoxCustomSelect mb-2">
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={fetchEmployeesData}
            selectedData={(value) => selectedEmployee(value.join())}
            canFetchNow={employeesShortData && employeesShortData.length > 0}
            fetchData={fetchEmployeesShort}
            sliceName="employeeShort"
            placeholder={Employee}
            isObject={true}
            size={"medium"}
            loadDefaultData={false}
            formItem={false}
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
            dataVal={[]}
            name="Employee"
            showSearch={true}
          />
        </div>
        <div className="box flex justify-between items-center">
          <UserInfo
            avatarSrc={
              employee ? employee?.image : "https://joeschmoe.io/api/v1/random"
            }
            name={employee ? employee?.name : "Humayoun Shah"}
            Subline={
              <SublineDesigWithTime
                designation={
                  employee && employee?.designation
                    ? employee?.designation
                    : "Not Designated"
                }
              />
            }
          />
        </div>

        <Form
          name="CreateForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
          className="h-14"
        >
          <div className="range-picker mt-4 w-full">
            <Form.Item name={"date"}>
              <RangePicker
                onChange={onRangeChange}
                // className="mt-4"
                size="large"
              />
            </Form.Item>
          </div>

          {/* <div className="mt-4">
            <Form.Item name="startDate">
              <DatePicker
                size="large"
                className="w-full"
                placeholder={startDate}
                onChange={(val) => props.startDate(val._d)}
              />
            </Form.Item>
          </div>
          <div className="mt-4">
            <Form.Item name="endDate">
              <DatePicker
                size="large"
                className="w-full"
                placeholder={endDate}
                onChange={(val) => props.endDate(val._d)}
              />
            </Form.Item>
          </div> */}
        </Form>
        <div className="flex text-2xl font-bold">{task}</div>
      </div>
      <div className="appraisalFormBody drop-shadow mt-4">
        <div className="w-full my-0 mx-auto mt-4">
        <Table
          columns={tableColumn()}
          // handleChange={handleColumnSorting}
          dragable={true}
          data={userTask ? userTask : []}
        />
        </div>
        
      </div>
    </>
  );
};

export default TaskComp;
