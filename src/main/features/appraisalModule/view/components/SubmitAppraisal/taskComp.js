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
  const [userId, setUserId] = useState("");
  // const [startDateState, setStartDate]= usestate('');
  // const [endDateState, setEndDate] = useState('');
  const [taskState, setTaskState] = useState([]);
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const [fetchEmployeesData, setFetchEmployeesData] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const employeesData = useSelector((state) => state.sharedSlice.employees);
  const employeesShortData = useSelector(
    (state) => state.sharedSlice.employeeShort
  );
  const { userTask } = useSelector((state) => state.appraisalModuleSlice);

  useEffect(() => {
    if (userTask.length) {
      setTaskState(userTask);
    }
  }, [userTask]);

  useEffect(() => {
    fetchEmployees();
    fetchEmployeesShort();
    fetchAllowance();
  }, []);

  useEffect(() => {
    if (date.startDate.length > 1 && date.startDate.length > 1) {
      dispatch(
        getAllTaskForAppraisalAction({
          startDate: date.startDate,
          endDate: date.endDate,
          userId,
        })
      );
    }
  }, [date, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(getEmployeeSalary({ id: userId }));
    }
  }, [userId]);

  useEffect(() => {
    if (isFirstTime && employeesData.length > 0) {
      setFetchEmployeesData(employeesData);
      // setEmployee(employeesData[0]);
      setIsFirstTime(false);
    }
  }, [employeesData]);

  const fetchEmployees = (text = "", pgNo = 1) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const fetchEmployeesShort = (text = "", pgNo = 1) => {
    dispatch(getAllEmployeeShort({ text, pgNo, pgSize: 20 }));
  };

  useEffect(() => {
    if (date && userId) {
      props.startDate(date.startDate);
      props.endDate(date.endDate);
      props.userId(userId);
    }
  }, [date, userId]);

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
    props.setDisable(false);
  };

  const onRangeChange = (dates, dateStrings) => {
    //TODO: change this function according to api call for task
    if (dates) {
      setDate({
        startDate: dates[0].format(),
        endDate: dates[1].format(),
      });
    } else {
      console.log("Clear");
      setTaskState([]);
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
          {Object.keys(employee).length ? (
            <UserInfo
              avatarSrc={
                employee
                  ? employee?.image
                  : "https://joeschmoe.io/api/v1/random"
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
          ) : (
            "No employee selected"
          )}
          {/* <svg
            viewBox="64 64 896 896"
            focusable="false" 
            data-icon="close-circle"
            width="1em"
            height="1em"
            // fill="currentColor"
            aria-hidden="true"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
          </svg> */}
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
            data={taskState ? taskState : []}
          />
        </div>
      </div>
    </>
  );
};

export default TaskComp;
