import { useEffect, useState } from 'react';
import { Avatar, Button, DatePicker, Divider, Form, Input, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import { getAllSalaryHeaderService } from '../../../salaryHeader/services/service';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MemberSelect from '../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import {
  getNameForImage,
  modifySelectData,
  STRINGS,
} from '../../../../../utils/base';
import { getAllEmployees } from '../../../../../utils/Shared/store/actions';
import {
  addEmployeeSalaryAction,
  getCurrentSalaryOfEmployeeAction,
  getEmployeeSalaryAction,
} from './action/action';
import { useParams } from 'react-router-dom';

function SalaryEmployee() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [salaryEmployee, setSalaryEmployee] = useState([]);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);

  const initialValues = {
    approvers: [],
    basicSalary: '',
    check: '',
    description: '',
    effectiveDate: moment(),
    // grossSalary: "",
    netSalary: '',
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
        console.log([payloadData], 'payload');
        dispatch(addEmployeeSalaryAction([payloadData]));
        form.resetFields();
      }
    } catch (err) {
      console.log(err.message, 'err');
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
      title: 'Reference No',
      dataIndex: 'referenceNo',
      ellipsis: true,
      key: 'referenceNo',
    },
    {
      title: 'Basic Salary',
      dataIndex: 'basicSalary',
      ellipsis: true,
      key: 'basicSalary',
    },
    {
      title: 'Net Salary',
      dataIndex: 'netSalary',
      ellipsis: true,
      key: 'netSalary',
    },
    // {
    //   title: "Gross Salary",
    //   dataIndex: "grossSalary",
    //   ellipsis: true,
    //   key: "netSalary",
    // },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      key: 'description',
    },
  ];

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
            formItem={false}
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

        <Form.Item label={'Gross Salary'}>
          <Input
            type="number"
            placeholder="0"
            disabled={true}
            value={form.getFieldValue('basicSalary')}
          />
        </Form.Item>
        <Form.Item label={'Net Salary'}>
          <Input
            type="number"
            placeholder="0"
            disabled={true}
            value={form.getFieldValue('basicSalary')}
          />
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
      {/* {salaryEmployee.length > 0 && (
        <div className="rebateTable" style={{ marginTop: '1rem' }}>
          <Table
            columns={columns}
            dragable={true}
            dataSource={salaryEmployee}
          />
        </div>
      )} */}
      <div className="rebateTable" style={{ marginTop: '1rem' }}>
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
