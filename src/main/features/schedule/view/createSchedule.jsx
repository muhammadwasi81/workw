import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  DeploymentUnitOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";

function CreateSchedule() {
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      //[{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ direction: "rtl" }],
      [{ align: ["center"] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };
  const formats = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      //[{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ direction: "rtl" }],
      [{ align: ["center"] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };
  const meetingduration = [
    { label: "15 min", value: "15min" },
    { label: "30 min", value: "30min" },
    { label: "45 min", value: "45min" },
    { label: "01 hr", value: "01hr" },
    { label: "02 hr", value: "02 hr" },
  ];
  const travelDuration = [
    { label: "15 min", value: "15min" },
    { label: "30 min", value: "30min" },
    { label: "45 min", value: "45min" },
  ];
  const preparationDuration = [
    { label: "15 min", value: "15min" },
    { label: "30 min", value: "30min" },
    { label: "45 min", value: "45min" },
  ];
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
  return (
    <div className="createSchedule">
      <Form form={form} layout="vertical" initialValues={{}}>
        <Form.Item label={"Task Subject:"}>
          <Input placeholder="Write Subject"></Input>
        </Form.Item>
        <Form.Item label={"Description:"}>
          <ReactQuill
            className="ReactQuill"
            onChange={(e) => console.log(e)}
            modules={modules}
            formats={formats}
            placeholder="Description"
          />
        </Form.Item>
        <Form.Item label="Type:">
          <Radio.Group>
            <Radio.Button value="Meeting">
              <DeploymentUnitOutlined />
              Meeting
            </Radio.Button>
            <Radio.Button value="Appointment">
              <CalendarOutlined />
              Appointment
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Loaction:">
          <Radio.Group>
            <Radio.Button value="Venue">
              <EnvironmentOutlined />
              Venue
            </Radio.Button>
            <Radio.Button value="Workwise">
              <VideoCameraOutlined />
              Workwise
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={"Venue:"}>
          <Input placeholder="Write Venue" />
        </Form.Item>
        <div className="formInput w-50">
          <Form.Item label={"Time:"}>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{
                defaultValue: moment("00:00:00", "HH:mm:ss"),
              }}
            />
          </Form.Item>
          <Form.Item label={"Duration:"}>
            <Select defaultValue="15min" options={meetingduration}></Select>
          </Form.Item>
        </div>
        <Form.Item
          name="members"
          label={"Members"}
          rules={[{ required: true }]}
        >
          <MemberSelect
            isObject={true}
            data={firstTimeEmpData}
            selectedData={(data, obj) => {}}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            name="approvers"
            mode="multiple"
            placeholder={"Select Employee"}
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
          />
        </Form.Item>
        <div className="formInput w-33">
          <Form.Item label={""}>
            <Checkbox>Travel Time</Checkbox>
          </Form.Item>
          <Form.Item label={"Duration:"}>
            <Select defaultValue="15min" options={travelDuration}></Select>
          </Form.Item>
        </div>
        <div className="formInput w-33">
          <Form.Item label={""}>
            <Checkbox>Preparation time</Checkbox>
          </Form.Item>
          <Form.Item label={"Duration:"}>
            <Select defaultValue="15min" options={preparationDuration}></Select>
          </Form.Item>
        </div>
        <Form.Item label={"Attachment"} name="attachments" labelPosition="top">
          <SingleUpload
            handleImageUpload={(file) => {
              // console.log(file[0].originFileObj);
              //   setFile(file[0].originFileObj);
            }}
            position={"left"}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            className="ThemeBtn"
            block
            htmlType="submit"
          >
            {"Create Schedule"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateSchedule;
