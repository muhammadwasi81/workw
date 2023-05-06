import { useEffect, useState } from "react";
import { Avatar, Button, DatePicker, Divider, Form, Input, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import { getAllSalaryHeaderService } from "../../../salaryHeader/services/service";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import {
  getNameForImage,
  modifySelectData,
  STRINGS,
} from "../../../../../utils/base";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import {
  addEmployeeSalaryAction,
  getCurrentSalaryOfEmployeeAction,
  getEmployeeSalaryAction,
} from "./action/action";
import { useParams } from "react-router-dom";
import GradeAllowanceTable from "./gradeAllowanceTable";
import "../style.css";

function SalaryEmployee({ mode }) {
  const isEdit = mode === "edit";
  const { id } = useParams();
  const [form] = Form.useForm();
  const [salaryEmployee, setSalaryEmployee] = useState([]);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);

  const initialValues = {
    approvers: [],
    basicSalary: "",
    check: "",
    description: "",
    effectiveDate: moment(),
    // grossSalary: "",
    netSalary: "",
  };
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);

  const { currentEmployeeSalary } = useSelector(
    (state) => state.employeeSalarySlice
  );
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        setSalaryEmployee((preValue) => [...preValue, form.getFieldsValue()]);
        const payloadData = {
          ...isValidation,
          userId: id,
          taxSlabId: STRINGS.DEFAULTS.guid,
          approvers: modifySelectData(
            isValidation.approvers
          ).map((approver) => ({ approverId: approver })),
        };
        console.log([payloadData], "payload");
        dispatch(addEmployeeSalaryAction([payloadData]));
        form.resetFields();
      }
    } catch (err) {
      console.log(err.message, "err");
      throw new Error(`Error in submitting form: ${err}`, { cause: err });
    }
  };

  useEffect(() => {
    dispatch(getEmployeeSalaryAction(id));
  }, [id]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const columns = [
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      ellipsis: true,
      key: "effectiveDate",
      render: (value) => {
        return moment(value).format("YYYY/MM/DD");
      },
    },
    {
      title: "Reference No",
      dataIndex: "referenceNo",
      ellipsis: true,
      key: "referenceNo",
    },
    {
      title: "Basic Salary",
      dataIndex: "basicSalary",
      ellipsis: true,
      key: "basicSalary",
    },
    {
      title: "Net Salary",
      dataIndex: "netSalary",
      ellipsis: true,
      key: "netSalary",
    },
    // {
    //   title: "Gross Salary",
    //   dataIndex: "grossSalary",
    //   ellipsis: true,
    //   key: "netSalary",
    // },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      key: "description",
    },
    {
      title: "Action",
      render: (value, __, rowIndex) => {
        return (
          <a
            href=" "
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isEdit) {
                console.log("ssss");
                const newPayload = {
                  basicSalary: currentEmployeeSalary[rowIndex].basicSalary,
                };
                form.setFieldsValue(newPayload);
              }
            }}
          >
            Edit
          </a>
        );
      },
    },
  ];

  return (
    <div className="employeeForm">
      <Divider orientation="left">Salary Info</Divider>
      <Form layout={"vertical"} form={form} initialValues={initialValues}>
        <Form.Item
          name="effectiveDate"
          label={"Effective Date"}
          rules={[{ required: true }]}
        >
          <DatePicker placeholder="Select Date" size="large"></DatePicker>
        </Form.Item>
        <Form.Item
          name="approvers"
          label={"Approvers"}
          rules={[{ required: true }]}
        >
          <MemberSelect
            name="approvers"
            mode="multiple"
            formItem={false}
            isObject={true}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={"Select Approvers"}
            selectedData={(_, obj) => {
              setEmployeesData([...obj]);
            }}
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
          />
        </Form.Item>
        <div className="flex flex-wrap">
          <div className="w-1/3 pr-4">
            <Form.Item
              className="Basic"
              name="basicSalary"
              label={"Basic Salary"}
              rules={[{ required: true }]}
            >
              <Input type="number" placeholder="Basic Salary" />
            </Form.Item>
          </div>

          <div className="w-1/3 pr-4">
            <Form.Item className="Gross ml-8" label={"Gross Salary"}>
              <Input
                type="number"
                placeholder="0"
                disabled={true}
                value={form.getFieldValue("basicSalary")}
              />
            </Form.Item>
          </div>

          <div className="w-1/3">
            <Form.Item className="Net" label={"Net Salary"}>
              <Input
                type="number"
                placeholder="0"
                disabled={true}
                value={form.getFieldValue("basicSalary")}
              />
            </Form.Item>
          </div>

          <div className="w-full">
            <Form.Item
              name="description"
              className="w-full"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Enter Description" />
            </Form.Item>
          </div>
        </div>
      </Form>

      <div className={isEdit ? "editButtons" : "buttons"}>
        <Button
          type="btn ThemeBtn"
          style={{ marginLeft: "auto" }}
          icon={<EditOutlined />}
          onClick={handleSubmit}
        >
          Add Salary
        </Button>
      </div>
      <div className="mt-3">
        <GradeAllowanceTable />
      </div>
      {/* {salaryEmployee.length > 0 && (
        <div className="rebateTable" style={{ marginTop: '1rem' }}>
          <Table
            columns={columns}
            dragable={true}
            dataSource={salaryEmployee}
          />
        </div>
      )} */}

      <div className="rebateTable" style={{ marginTop: "1rem" }}>
        <Table
          columns={columns}
          dragable={true}
          dataSource={currentEmployeeSalary}
        />
      </div>
    </div>
  );
}

export default SalaryEmployee;
