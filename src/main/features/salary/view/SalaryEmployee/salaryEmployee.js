import {
  Avatar,
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import { getAllSalaryHeaderService } from '../../../salaryHeader/services/service';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MemberSelect from '../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import { getNameForImage } from '../../../../../utils/base';
import { getAllEmployees } from '../../../../../utils/Shared/store/actions';
import { addEmployeeSalaryAction } from './action/action';

function SalaryEmployee() {
  const [form] = Form.useForm();
  const [salaryEmployee, setSalaryEmployee] = useState([]);
  const [salaryHeader, setSalaryHeader] = useState([]);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);

  const initialValues = {
    approvers: [],
    basicSalary: '',
    check: '',
    description: '',
    effectiveDate: '',
    grossSalary: '',
    netSalary: '',
    salaryHeaders: [],
  };
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(salaryEmployee, 'salaryEmployee');
  const handleSubmit = () => {
    const payload = createPayload();
    setSalaryEmployee((preValue) => [...preValue, form.getFieldsValue()]);
    dispatch(addEmployeeSalaryAction(payload));
  };

  const createPayload = () => {
    const payload = [];
    salaryEmployee.forEach((item) => {
      const data = {
        approvers: item.approvers,
        basicSalary: item.basicSalary,
        check: item.check,
        description: item.description,
        effectiveDate: item.effectiveDate,
        grossSalary: item.grossSalary,
        netSalary: item.netSalary,
        salaryHeaders: item.salaryHeaders,
        employeeId: item.employeeId,
      };
      payload.push(data);
    });
    console.log(payload, 'payload');
    return payload;
  };

  // const handleSubmit = async () => {
  //   form.submit();
  //   try {
  //     const isValidation = await form.validateFields();
  //     console.log(isValidation, 'isValidation');
  //     if (isValidation) {
  //       setSalaryEmployee((preValue) => [...preValue, form.getFieldsValue()]);
  //       form.resetFields();
  //     }
  //     // dispatch(addEmployeeSalaryAction(isValidation));
  //   } catch (err) {
  //     throw new Error(`Error in submitting form: ${err}`, { cause: err });
  //   }
  // };
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
    fetchEmployees('', 0);
  }, []);
  const columns = [
    {
      title: 'Effective Date',
      dataIndex: 'effectiveDate',
      ellipsis: true,
      key: 'effectiveDate',
      render: (value) => {
        return moment(value).format('YYYY/MM/DD');
      },
    },
    {
      title: 'Salary Headers',
      dataIndex: 'salaryHeaders',
      ellipsis: true,
      key: 'salaryHeaders',
      render: (value, _, index) => {
        return salaryHeader.filter((item) => item.id === value)[index]?.name;
      },
    },
    {
      title: 'Basic Salary',
      dataIndex: 'basicSalary',
      ellipsis: true,
      key: 'basicSalary',
    },
    {
      title: 'Approvers',
      dataIndex: 'approvers',
      ellipsis: true,
      key: 'approvers',
      render: (value, _, index) => {
        return employeesData.filter((item) => item.id === value)[index]?.name;
      },
    },
    {
      title: 'Check',
      dataIndex: 'check',
      ellipsis: true,
      key: 'check',
    },
    {
      title: 'Gross Salary',
      dataIndex: 'grossSalary',
      ellipsis: true,
      key: 'grossSalary',
    },
    {
      title: 'Net Salary',
      dataIndex: 'netSalary',
      ellipsis: true,
      key: 'netSalary',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      key: 'description',
    },
  ];

  const getSalaryHeader = async () => {
    try {
      const { responseCode, data } = await getAllSalaryHeaderService();
      if (responseCode === 1001) {
        setSalaryHeader(data);
      }
    } catch (err) {
      throw new Error(`Error in fetching salary header: ${err}`, {
        cause: err,
      });
    }
  };

  useEffect(() => {
    getSalaryHeader();
  }, []);

  return (
    <div className="employeeForm">
      <Divider orientation="left">Salary Info</Divider>
      <Form layout={'vertical'} form={form} initialValues={initialValues}>
        <Form.Item
          name="effectiveDate"
          label={'Effective Date'}
          rules={[{ required: true }]}
        >
          <DatePicker placeholder="Select Date" size="large"></DatePicker>
        </Form.Item>
        <Form.Item
          name="salaryHeaders"
          label={'Salary Headers'}
          rules={[{ required: true }]}
        >
          <Select placeholder=" Select Salary Headers" size="large">
            {salaryHeader.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="basicSalary"
          label={'Basic Salary'}
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="Basic Salary"></Input>
        </Form.Item>
        <Form.Item
          name="approvers"
          label={'Approvers'}
          rules={[{ required: true }]}
        >
          <MemberSelect
            name="approvers"
            mode="multiple"
            formitem={false}
            isObject={true}
            data={firstTimeEmpData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={'Select Approvers'}
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
        <Form.Item name="check" label={'Check'} rules={[{ required: true }]}>
          <Input type="number" placeholder="Check"></Input>
        </Form.Item>
        <Form.Item
          name="grossSalary"
          label={'Gross Salary'}
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="Gross Salary"></Input>
        </Form.Item>
        <Form.Item
          name="netSalary"
          label={'Net Salary'}
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="Net Salary"></Input>
        </Form.Item>
        <Form.Item
          name="description"
          label={'Description'}
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Enter Description"></Input.TextArea>
        </Form.Item>
      </Form>
      <div className="buttons">
        <Button
          className="btn ThemeBtn"
          style={{ marginLeft: 'auto' }}
          icon={<EditOutlined />}
          onClick={handleSubmit}
        >
          Add Salary
        </Button>
      </div>
      {salaryEmployee.length > 0 && (
        <div className="rebateTable" style={{ marginTop: '1rem' }}>
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
