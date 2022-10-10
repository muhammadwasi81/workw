import {
  Avatar,
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState,useContext} from "react";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import { getAllSalaryHeaderService } from "../../../salaryHeader/services/service";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getNameForImage } from "../../../../../utils/base";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";

import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import {salaryDictionary} from "../../../salary/localization/index";

function SalaryEmployee() {

  const { userLanguage } = useContext(LanguageChangeContext);
  const { salary_Dictionary } = salaryDictionary[userLanguage];

  const [form] = Form.useForm();
  const [salaryEmployee, setSalaryEmployee] = useState([]);
  const [salaryHeader, setSalaryHeader] = useState([]);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const initialValues = {
    approvers: [],
    basicSalary: "",
    check: "",
    description: "",
    effectiveDate: "",
    grossSalary: "",
    netSalary: "",
    salaryHeaders: [],
  };
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      console.log(isValidation, "isValidation");
      if (isValidation) {
        setSalaryEmployee((preValue) => [...preValue, form.getFieldsValue()]);
        form.resetFields();
      }
    } catch (e) {}
  };
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
      title: salary_Dictionary.EffectiveDate,
      dataIndex: salary_Dictionary.EffectiveDate,
      ellipsis: true,
      key: salary_Dictionary.EffectiveDate,
      render: (value) => {
        return moment(value).format("YYYY/MM/DD");
      },
    },
    {
      title: salary_Dictionary.SalaryHeaders,
      dataIndex: salary_Dictionary.SalaryHeaders,
      ellipsis: true,
      key: salary_Dictionary.SalaryHeaders,
      render: (value, _, index) => {
        return salaryHeader.filter((item) => item.id === value)[index]?.name;
      },
    },
    {
      title:salary_Dictionary.BasicSalary,                    
      dataIndex: salary_Dictionary.BasicSalary, 
      ellipsis: true,
      key: salary_Dictionary.BasicSalary, 
    },
    {
      title: salary_Dictionary.Approvers, 
      dataIndex: salary_Dictionary.Approvers, 
      ellipsis: true,
      key: salary_Dictionary.Approvers, 
      render: (value, _, index) => {
        return employeesData.filter((item) => item.id === value)[index]?.name;
      },
    },
    {
      title: salary_Dictionary.Check, 
      dataIndex: salary_Dictionary.Check, 
      ellipsis: true,
      key: salary_Dictionary.Check, 
    },
    {
      title:salary_Dictionary.GrossSalary, 
      dataIndex: salary_Dictionary.GrossSalary, 
      ellipsis: true,
      key: salary_Dictionary.GrossSalary, 
    },
    {
      title: salary_Dictionary.NetSalary, 
      dataIndex: salary_Dictionary.NetSalary,
      ellipsis: true,
      key: salary_Dictionary.NetSalary,
    },
    {
      title: salary_Dictionary.Descrption,
      dataIndex: salary_Dictionary.Descrption,
      ellipsis: true,
      key: salary_Dictionary.Descrption,
    },
  ];

  const getSalaryHeader = async () => {
    try {
      const { responseCode, data } = await getAllSalaryHeaderService();
      if (responseCode === 1001) {
        setSalaryHeader(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getSalaryHeader();
  }, []);

  return (
    <div className="employeeForm">
      <Divider orientation="left">{salary_Dictionary.SalaryInfo}</Divider>
      <Form layout={"vertical"} form={form} initialValues={initialValues}>
        <Form.Item
          name = {salary_Dictionary.EffectiveDate}
          label=  {salary_Dictionary.EffectiveDate}
          rules={[{ required: true }]}
        >
          <DatePicker placeholder = {salary_Dictionary.SelectDate} size="large"></DatePicker>
        </Form.Item>
        <Form.Item
          name =  {salary_Dictionary.SalaryHeaders}
          label = {salary_Dictionary.SalaryHeaders}
          rules={[{ required: true }]}
        >
          <Select placeholder= {salary_Dictionary.SelectSalaryHeaders} size="large">
            {salaryHeader.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name = {salary_Dictionary.BasicSalary}
          label= {salary_Dictionary.BasicSalary}
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder= {salary_Dictionary.BasicSalary} ></Input>
        </Form.Item>
        <Form.Item
          name = {salary_Dictionary.Approvers}
          label= {salary_Dictionary.Approvers}
          rules={[{ required: true }]}
        >
          <MemberSelect
            name= {salary_Dictionary.Approvers}
            mode= "multiple"
            formitem={false}
            isObject={true}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder= {salary_Dictionary.Approvers}
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
        <Form.Item name= {salary_Dictionary.Check} label= {salary_Dictionary.Check} rules={[{ required: true }]}>
          <Input type="number" placeholder= {salary_Dictionary.Check} ></Input>
        </Form.Item>
        <Form.Item
          name= {salary_Dictionary.GrossSalary}
          label = {salary_Dictionary.GrossSalary}
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder= {salary_Dictionary.GrossSalary} ></Input>
        </Form.Item>
        <Form.Item
          name= {salary_Dictionary.NetSalary}
          label= {salary_Dictionary.NetSalary}
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder= {salary_Dictionary.NetSalary} ></Input>
        </Form.Item>
        <Form.Item
          name= {salary_Dictionary.Descrption}
          label= {salary_Dictionary.Descrption}
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder= {salary_Dictionary.EnterDescription} ></Input.TextArea>
        </Form.Item>
      </Form>
      <div className="buttons">
        <Button
          className="btn ThemeBtn"
          style={{ marginLeft: "auto" }}
          icon={<EditOutlined />}
          onClick={handleSubmit}
        >
         {salary_Dictionary.AddSalary}
        </Button>
      </div>
      {salaryEmployee.length > 0 && (
        <div className="rebateTable" style={{ marginTop: "1rem" }}>
          <Table
            columns={columns}
            dragable={true}
            dataSource={salaryEmployee}
          />
        </div>
      )}
    </div>
  );
}

export default SalaryEmployee;
