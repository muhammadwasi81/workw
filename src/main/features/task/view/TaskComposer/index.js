import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Radio } from "antd";
import React, { useContext, useState } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import ImageUpload from "../../../../sharedComponents/Input/ImageUpload";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { taskDictionary } from "../../utils/localization";
import { useDispatch } from "react-redux";
import { addNewTask } from "../../store/actions";
import { STRINGS } from "../../../../../utils/base";
import moment from "moment";
import { openNotification } from "../../../../../utils/Shared/store/slice";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
const { RangePicker } = DatePicker;

function TaskComposer() {
  const [form] = Form.useForm();
  const [isAssignTo, setIsAssignTo] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, taskDictionaryList } = taskDictionary[userLanguage];
  const { labels, createTextBtn, placeHolder } = taskDictionaryList;
  const dispatch = useDispatch();

  const options = [
    { label: labels.selfTask, value: "self" },
    { label: labels.assignTo, value: "assign" },
  ];
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
  let classes = "task-composer  ";
  classes += Direction === "ltr" ? "ltr" : "rtl";

  const handleSubmit = (values) => {
    console.log(values);
    let { date, description, predecessor, priority, subject, taskType, type } = values;
    let requestData = {
      subject,
      description,
      parentId: STRINGS.DEFAULTS.guid,
      referenceId: STRINGS.DEFAULTS.guid,
      referenceType: Number(type),
      startDate: date[0].format(),
      endDate: date[1].format(),
      priority: Number(priority),
      members: taskType === "self" ? [] : [],
      attachments: attachments
    }
    dispatch(addNewTask(requestData));
    // dispatch(openNotification({
    //   message: "Task Create Successfully",
    //   style: { backgroundColor: "#48da00" },
    //   type:"success",
    //   duration: 2
    // }));
    form.resetFields();

  }
  return (
    <Form
      className={classes}
      name="createTask"
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
      form={form}
    >
      <Form.Item label={labels.taskSubject} name="subject"
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
      <Form.Item label={labels.description} name="description"
        rules={[
          {
            required: true,
            message: "Please input description!",
          },
        ]}
      >
        <TextInput placeholder={placeHolder.writeDescription} />
      </Form.Item>
      <Form.Item label={labels.type} name="type"
        rules={[
          {
            required: true,
            message: "Please select type!",
          },
        ]}
      >
        <Radio.Group className="radioPrimary">
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
      <Form.Item label="" name="taskType"
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
        <Form.Item label={labels.assignTo} name="assign">
          <TextInput placeholder={placeHolder.selectAssign} />
        </Form.Item>
      )}

      <Form.Item label={labels.taskDate} name="date"
        rules={[
          {
            required: true,
            message: "Please select date!",
          },
        ]}>
        <RangePicker
          placeholder={[placeHolder.startDate, placeHolder.endtDate]}
        />
      </Form.Item>
      <Form.Item label={labels.priority} name="priority"
        rules={[
          {
            required: true,
            message: "Please select priority!",
          },
        ]}>
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
          handleImageUpload={fileData => {
            // console.log("fileData", fileData[0]);
            setAttachments([...attachments, { id:STRINGS.DEFAULTS.guid ,file: fileData[0].originFileObj }]);
          }}
          uploadText={"Upload"}
          multiple={false}
        />

      </Form.Item>
      <Form.Item >
        <Button className="ThemeBtn" block htmlType="submit">
          {createTextBtn}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TaskComposer;