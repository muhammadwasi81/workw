import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Radio } from "antd";
import React, { useContext, useState } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import ImageUpload from "../../../../sharedComponents/Input/ImageUpload";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { taskDictionary } from "../../localization";
const { RangePicker } = DatePicker;

function TaskComposer() {
  const [isAssignTo, setIsAssignTo] = useState(false);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, taskDictionaryList } = taskDictionary[userLanguage];
  const { labels, createTextBtn, placeHolder } = taskDictionaryList;

  const options = [
    { label: labels.selfTask, value: "self" },
    { label: labels.assignTo, value: "assign" },
  ];
  const initialValues = {
    subject: "",
    predecessor: "",
    description: "",
    type: "general",
    taskType: "self",
    assign: "",
    taskDate: "",
    priority: "default",
    checkList: "",
  };
  const handleTaskType = ({ target }) => {
    const isShow = target.value === "self" ? false : true;
    setIsAssignTo(isShow);
  };
  let classes = "task-composer  ";
  classes += Direction === "ltr" ? "ltr" : "rtl";
  return (
    <Form
      className={classes}
      name="createTask"
        layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item label={labels.taskSubject} name="subject">
        <TextInput placeholder={placeHolder.writeSubject} />
      </Form.Item>
      <Form.Item label={labels.predecessor} name="predecessor">
        <TextInput placeholder={placeHolder.writePredecessor} />
      </Form.Item>
      <Form.Item label={labels.description} name="description">
        <TextInput placeholder={placeHolder.writeDescription} />
      </Form.Item>
      <Form.Item label={labels.type} name="type">
        <Radio.Group className="radioPrimary">
          <Radio.Button value="general">
            <CheckCircleOutlined />
            {labels.general}
          </Radio.Button>
          <Radio.Button value="project">
            <CheckCircleOutlined />
            {labels.project}
          </Radio.Button>
          <Radio.Button value="group">
            <CheckCircleOutlined />
            {labels.group}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="" name="taskType">
        <Radio.Group options={options} onChange={handleTaskType} />
      </Form.Item>
      {isAssignTo && (
        <Form.Item label={labels.assignTo} name="assign">
          <TextInput placeholder={placeHolder.selectAssign} />
        </Form.Item>
      )}

      <Form.Item label={labels.taskDate} name="date">
        <RangePicker
          placeholder={[placeHolder.startDate, placeHolder.endtDate]}
        />
      </Form.Item>
      <Form.Item label={labels.priority} name="priority">
        <Radio.Group className="radioPrimary radioPriority">
          <Radio.Button value="default">
            <CheckCircleOutlined />
            {labels.default}
          </Radio.Button>
          <Radio.Button value="low">
            <CheckCircleOutlined />
            {labels.low}
          </Radio.Button>
          <Radio.Button value="medium">
            <CheckCircleOutlined />
            {labels.medium}
          </Radio.Button>
          <Radio.Button value="high">
            <CheckCircleOutlined />
            {labels.high}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="" name="checkList">
        <Checkbox> {labels.checkList}</Checkbox>
      </Form.Item>
      <Form.Item label="" name="">
        <ImageUpload />
      </Form.Item>

      <Button className="ThemeBtn" block>
        {createTextBtn}
      </Button>
    </Form>
  );
}

export default TaskComposer;
