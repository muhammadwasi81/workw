import { CheckCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Popconfirm,
  Radio,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import ImageUpload from "../../../../sharedComponents/Input/ImageUpload";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

import { useDispatch } from "react-redux";
import { addNewTask } from "../../store/actions";
import { STRINGS } from "../../../../../utils/base";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { taskDictionary } from "../../localization";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { useSelector } from "react-redux";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../../../sharedComponents/CustomSelect/newCustomSelect";

const { RangePicker } = DatePicker;

function TaskComposer() {
  const [form] = Form.useForm();
  const [isAssignTo, setIsAssignTo] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, taskDictionaryList } = taskDictionary[userLanguage];
  const { labels, createTextBtn, placeHolder } = taskDictionaryList;
  const dispatch = useDispatch();
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [type, setType] = useState("1");
  const [visible, setVisible] = useState(false);
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  const options = [
    { label: labels.selfTask, value: "self" },
    { label: labels.assignTo, value: "assign" },
  ];
  useEffect(() => {
    fetchEmployees("", 0);
  }, []);
  const confirm = () => {
    setVisible(false);
    message.success("Next step.");
    setEmployeesData([]);
    form.setFieldValue("assign", "");
  };

  const cancel = () => {
    setVisible(false);
    message.error("Click on cancel.");
  };
  useEffect(() => {
    if (type !== "1") {
      form.setFieldValue("members", "");
      if (employeesData.length > 0) {
        setVisible(true);
      }
    }
  }, [type]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const initialValues = {
    subject: "",
    predecessor: "",
    description: "",
    type: "1",
    taskType: "self",
    assign: "",
    taskDate: "",
    priority: "1",
    checkList: "",
  };
  const handleTaskType = ({ target }) => {
    const isShow = target.value === "self" ? false : true;
    setIsAssignTo(isShow);
  };
  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);
  const selectedData = (data, obj) => {
    setEmployeesData((prevValue) => [...prevValue, obj]);
  };
  let classes = "task-composer  ";
  classes += Direction === "ltr" ? "ltr" : "rtl";

  const handleSubmit = (values) => {
    let {
      date,
      description,
      predecessor,
      priority,
      subject,
      taskType,
      type,
    } = values;
    let requestData = {
      subject,
      description,
      parentId: STRINGS.DEFAULTS.guid,
      referenceId: STRINGS.DEFAULTS.guid,
      referenceType: Number(type),
      startDate: date[0].format(),
      endDate: date[1].format(),
      priority: Number(priority),
      members: taskType === "self" ? [] : employeesData,
      attachments: attachments,
    };
    dispatch(addNewTask(requestData));
    // dispatch(openNotification({
    //   message: "Task Create Successfully",
    //   style: { backgroundColor: "#48da00" },
    //   type:"success",
    //   duration: 2
    // }));
    form.resetFields();
  };

  const endpoint =
    type === "2" ? "api/Project/GetAllProject" : "api/Group/GetAllGroup";
  return (
    <Form
      className={classes}
      name="createTask"
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
      form={form}
    >
      <Form.Item
        label={labels.taskSubject}
        name="subject"
        rules={[
          {
            required: true,
            message: "Please input subject!",
          },
        ]}
      >
        <TextInput placeholder={placeHolder.writeSubject} />
      </Form.Item>
      {/* <Form.Item label={labels.predecessor} name="predecessor"
      rules={[
        {
          required: true,
          message: "Please input predecessor!",
        },
      ]}
      >
        <TextInput placeholder={placeHolder.writePredecessor} />
      </Form.Item> */}
      <Form.Item
        label={labels.description}
        name="description"
        rules={[
          {
            required: true,
            message: "Please input description!",
          },
        ]}
      >
        <TextInput placeholder={placeHolder.writeDescription} />
      </Form.Item>
      <Form.Item
        label={labels.type}
        name="type"
        rules={[
          {
            required: true,
            message: "Please select type!",
          },
        ]}
      >
        <Radio.Group
          className="radioPrimary"
          onChange={(event) => {
            setType(event.target.value);
          }}
        >
          <Radio.Button value="1">
            <CheckCircleOutlined />
            {labels.general}
          </Radio.Button>
          <Radio.Button value="2">
            <CheckCircleOutlined />
            {labels.project}
          </Radio.Button>
          <Radio.Button value="3">
            <CheckCircleOutlined />
            {labels.group}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      {type !== "1" && (
        <Form.Item
          name="members"
          label={type === "2" ? "Projects" : "Groups"}
          showSearch={true}
          direction={Direction}
          rules={[{ required: true }]}
        >
          <NewCustomSelect
            name="Groups/Projects"
            label={type === "2" ? "Select Project" : "Select Group"}
            showSearch={true}
            direction={Direction}
            endPoint={endpoint}
            requestType="post"
            placeholder={type === "2" ? "Select Project" : "Select Group"}
          />
        </Form.Item>
      )}

      <Form.Item
        label=""
        name="taskType"
        rules={[
          {
            required: true,
            message: "Please select type!",
          },
        ]}
      >
        <Radio.Group options={options} onChange={handleTaskType} />
      </Form.Item>
      {isAssignTo && (
        <>
          <Popconfirm
            title="Are you sure delete this task?"
            visible={visible}
            // onVisibleChange={handleVisibleChange}
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          ></Popconfirm>
          <Form.Item label={labels.assignTo} name="assign">
            <MemberSelect
              isObject={true}
              data={firstTimeEmpData}
              selectedData={(data, obj) => selectedData(data, obj)}
              canFetchNow={isFirstTimeDataLoaded}
              fetchData={fetchEmployees}
              name="assign"
              mode="multiple"
              placeholder={placeHolder.selectAssign}
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
        </>
      )}

      <Form.Item
        label={labels.taskDate}
        name="date"
        rules={[
          {
            required: true,
            message: "Please select date!",
          },
        ]}
      >
        <RangePicker
          placeholder={[placeHolder.startDate, placeHolder.endtDate]}
        />
      </Form.Item>
      <Form.Item
        label={labels.priority}
        name="priority"
        rules={[
          {
            required: true,
            message: "Please select priority!",
          },
        ]}
      >
        <Radio.Group className="radioPrimary radioPriority">
          <Radio.Button value="1">
            <CheckCircleOutlined />
            {labels.default}
          </Radio.Button>
          <Radio.Button value="2">
            <CheckCircleOutlined />
            {labels.low}
          </Radio.Button>
          <Radio.Button value="3">
            <CheckCircleOutlined />
            {labels.medium}
          </Radio.Button>
          <Radio.Button value="4">
            <CheckCircleOutlined />
            {labels.high}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      {/* <Form.Item label="" name="checkList">
        <Checkbox> {labels.checkList}</Checkbox>
      </Form.Item> */}
      <Form.Item label="" name="" className="w-max">
        <SingleUpload
          handleImageUpload={(fileData) => {
            setAttachments([
              ...attachments,
              { id: STRINGS.DEFAULTS.guid, file: fileData[0].originFileObj },
            ]);
          }}
          uploadText={"Upload"}
          multiple={false}
        />
      </Form.Item>
      <Form.Item>
        <Button className="ThemeBtn" block htmlType="submit">
          {createTextBtn}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TaskComposer;
