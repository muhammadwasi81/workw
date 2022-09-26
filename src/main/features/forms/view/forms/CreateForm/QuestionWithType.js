import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Upload, Space } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { createGuid } from "../../../../../../utils/base";
const { Option } = Select;

const QuestionWithType = (props) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([{ option: "", image: {} }]);
  const [question, setQuestion] = useState(" ");
  const [questionType, setQuestionType] = useState(3);
  const [fileList, setFileList] = useState([]);

  const handleImageChange = (info, index, action) => {
    if (!fileList[index]) {
      setFileList([...fileList, info.fileList[0]]);
    }
  };

  let removeFormFields = (i) => {
    let newOption = [...options];
    newOption.splice(i, 1);
    setOptions(newOption);
  };

  let addFormFields = () => {
    setOptions([...options, { option: "" }]);
  };

  const onQuestionTypeChange = (value) => {
    setQuestionType(value);
  };

  const onFinish = (values) => {
    console.log("values", values);
    console.log("fileList", fileList);
    if (values.options) {
      var data = {
        ...values,
        fileList: fileList,
      };
    } else {
      var data = {
        ...values,
        fileList: fileList,
        options: [],
      };
    }

    // console.log("final data", data);
    //send data to create Form
    props.dataSend(data);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="Question">
        <Input placeholder="Question.." />
      </Form.Item>
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
                <Form.Item required={false} key={field.key} name={[field.name]}>
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
                        width: "60%",
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

                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add Question
                </Button>

                {/* <Form.ErrorList errors={errors} /> */}
              </Form.Item>

              {/* {questionType === 3 && (
        <>
          {options.map((elem, index) => (
            <div key={index}>
              <Form.Item name={`answer[${index}]`}>
                <Input />
              </Form.Item>

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
              {index ? (
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => removeFormFields(index)}
                ></Button>
              ) : null}
            </div>
          ))} */}
              <Button
                onClick={() => addFormFields()}
                style={{ margin: "1em 0em 1em 0em" }}
              >
                Add More
              </Button>
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
