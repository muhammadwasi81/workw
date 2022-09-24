import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Upload } from "antd";

import { CloseOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const QuestionWithType = ({
  name,
  placeholder,
  onChange,
  handleImageUpload,
  value,
  label,
  reset,
  ...props
}) => {
  const [options, setOptions] = useState([{ option: "", image: {} }]);
  const [question, setQuestion] = useState(" ");
  const [fileList, setFileList] = useState([]);

  const handleImageChange = (info, index, action) => {
    setFileList(info.fileList);
    let data = [...options];

    data[index] = { ...data[index], image: info.fileList };
    setOptions(data);
  };

  useEffect(() => {
    console.log("useEffect works");
    console.log(options);
    props.questionChange(options);
  }, [options]);

  const handleQuestionChange = (e) => {
    console.log(e.target.value);
    setQuestion(e.target.value);
    props.questionChange(e.target.value);
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    let data = [...options];

    data[index] = { ...data[index], option: value };
    setOptions(data);
    props.optionChange(options);
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
    switch (value) {
      case 1:
        props.setQuestionType(value);

        return;
      case 2:
        props.setQuestionType(value);

        return;
      case 3:
        props.setQuestionType(value);
    }
  };

  return (
    <>
      <Form.Item>
        <Input
          name="Question"
          placeholder="Question.."
          // value={question}
          onChange={handleQuestionChange}
        />
      </Form.Item>
      <Form.Item name="answerType">
        <Select
          placeholder="Select Answer Type"
          onChange={onQuestionTypeChange}
          allowClear
        >
          <Option value={1}>Text</Option>
          <Option value={2}>Number</Option>
          <Option value={3}>Polls</Option>
        </Select>
      </Form.Item>
      {props.typeProp.type === 3 && (
        <>
          {options.map((elem, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  gridGap: "1em",
                  alignItems: "flexStart",
                  marginTop: "1em",
                }}
              >
                <input
                  // name={key.name}
                  value={elem.option}
                  style={{ width: "100%" }}
                  placeholder={placeholder}
                  onChange={(e) => handleChange(e, index)}
                />

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
            </div>
          ))}
          <Button
            onClick={() => addFormFields()}
            style={{ margin: "1em 0em 1em 0em" }}
          >
            Add More
          </Button>
        </>
      )}
    </>
  );
};

export default QuestionWithType;
