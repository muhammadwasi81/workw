import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Upload, Space } from "antd";
import {
  CloseOutlined,
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { createGuid } from "../../../../../../utils/base";
import styles from "../EditForm/editForm.css";
const { Option } = Select;

const QuestionWithType = (props) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([{ option: "", image: {} }]);
  const [question, setQuestion] = useState(" ");
  const [questionType, setQuestionType] = useState(3);
  const [fileList, setFileList] = useState([]);
  const [quesionImage, setQuestionImage] = useState();

  const handleImageChange = (info, index, action) => {
    console.log("index", index);
    if (!fileList[index]) {
      setFileList([
        ...fileList,
        {
          image: info.fileList[0],
          index,
        },
      ]);
    }
  };

  const handleQuestionImageChange = (info) => {
    console.log("image", info);
    setQuestionImage(info.fileList[0]);
  };

  const onQuestionTypeChange = (value) => {
    setQuestionType(value);
  };

  const onFinish = (values) => {
    console.log("values", values);
    console.log("fileList", fileList);
    let data = {};
    if (values.options) {
      data = {
        ...values,
        fileList: fileList,
        image: quesionImage && quesionImage,
      };
    } else {
      data = {
        ...values,
        fileList: fileList,
        options: [],
        image: quesionImage && quesionImage,
      };
    }
    console.log(data, "data here console");
    props.dataSend(data);
    form.resetFields();
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Item name="Question">
          <Input placeholder="Question.." style={{ width: "40em" }} />
        </Form.Item>
        <Form.Item className="optionClass">
          <Upload
            onChange={(info) => handleQuestionImageChange(info)}
            accept="*"
            beforeUpload={() => false}
            multiple={false}
            defaultFileList={[]}
          >
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
        </Form.Item>
      </div>
      <Form.Item name="answerType">
        <Select
          placeholder="Select Answer Type"
          onChange={onQuestionTypeChange}
          allowClear
        >
          <Option value={3}>Text</Option>
          <Option value={2}>Number</Option>
          <Option value={1}>Polls</Option>
        </Select>
      </Form.Item>
      {questionType === 1 && (
        <Form.List name="options">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  required={false}
                  key={field.key}
                  name={[field.name]}
                  className="optionClass"
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input quesion's or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder={`option ${index + 1}`}
                      style={{
                        width: "80%",
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Upload
                      onChange={(info) => handleImageChange(info, index)}
                      accept="*"
                      beforeUpload={() => false}
                      multiple={false}
                      defaultFileList={[]}
                      uid={index}
                    >
                      <Button icon={<UploadOutlined />}></Button>
                    </Upload>
                  </Form.Item>
                  <div
                    style={{
                      height: "1em",
                      width: "2em",
                    }}
                  >
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </div>
                </Form.Item>
              ))}
              {/**check*/}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "100%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add Option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}

      <Form.Item>
        <Button type="primary" onClick={() => form.submit()}>
          Add Question
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionWithType;
