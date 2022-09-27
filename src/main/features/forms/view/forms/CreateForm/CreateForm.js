import React, { useState, useEffect } from "react";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import MemberSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import moment from "moment";
import {
  createGuid,
  getNameForImage,
  STRINGS,
} from "../../../../../../utils/base";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Avatar, Select, Button, Space } from "antd";
// import SingleUpload from "../../../../../sharedComponents/Upload/singleUpload";
import QuestionWithType from "./QuestionWithType";
import { CloseOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;

const CreateForm = (props) => {
  const [form] = Form.useForm();
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);

  const { createLoader } = useSelector((state) => state.formSlice);

  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  const [employeesData, setEmployeesData] = useState([]);
  const dispatch = useDispatch();
  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const { user } = useSelector((state) => state.userSlice);
  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const onFinish = (values) => {
    console.log("Success:", values);
    props.subDescriptionSend(values);
  };

  const dataGet = (values) => {
    console.log("data get in create form", values);
    //send data to edit form component
    props.dataSend(values);
  };

  // console.log("props in create form", props);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form.Provider>
        <Form
          name="CreateForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="subject"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Subject" />
          </Form.Item>
          <Form.Item name="description">
            <TextArea placeholder="Description" rows={4} />
          </Form.Item>
          <Form.Item label="Approvers" name="approvers">
            <MemberSelect
              name="Approvers"
              mode="multiple"
              formItem={false}
              isObject={true}
              data={firstTimeEmpData}
              canFetchNow={isFirstTimeDataLoaded}
              fetchData={fetchEmployees}
              placeholder="Select Approvers"
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
          {/* {console.log("data", data)} */}
          <QuestionWithType dataSend={(values) => dataGet(values)} />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!createLoader ? false : true}
            >
              Submit Form
            </Button>
          </Form.Item>
        </Form>
      </Form.Provider>
    </>
  );
};

export default CreateForm;
