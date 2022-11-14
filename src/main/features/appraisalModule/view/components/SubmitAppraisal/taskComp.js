import React, { useEffect, useState } from "react";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { Avatar, DatePicker, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployees,
  getAllEmployeeShort,
} from "../../../../../../utils/Shared/store/actions";
import CustomSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";

const TaskComp = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({});

  const [fetchEmployeesData, setFetchEmployeesData] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const employeesData = useSelector((state) => state.sharedSlice.employees);
  const employeesShortData = useSelector(
    (state) => state.sharedSlice.employeeShort
  );

  useEffect(() => {
    console.log("useEffect works");
    fetchEmployees();
    fetchEmployeesShort();
    // fetchAllowance();
  }, []);

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
    console.log(selected);
  };

  return (
    <>
      <div className="appraisalFormBody drop-shadow">
        <div className="inputBox">
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={fetchEmployeesData}
            selectedData={(value) => selectedEmployee(value.join())}
            canFetchNow={employeesShortData && employeesShortData.length > 0}
            fetchData={fetchEmployeesShort}
            sliceName="employeeShort"
            placeholder={"Employee"}
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
            avatarSrc="https://joeschmoe.io/api/v1/random"
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
        <div className="inputBox flex justify-between items-center mt-4">
          Task
        </div>
        <Form
          name="CreateForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <div className="mt-4">
            <Form.Item name="startDate">
              <DatePicker
                size="large"
                className="w-full"
                placeholder="Start Date"
                onChange={(val) => props.startDate(val._d)}
              />
            </Form.Item>
          </div>
          <div className="mt-4">
            <Form.Item name="endDate">
              <DatePicker
                size="large"
                className="w-full"
                placeholder="End Date"
                onChange={(val) => props.endDate(val._d)}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default TaskComp;
