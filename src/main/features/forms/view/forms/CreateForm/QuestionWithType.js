import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Upload } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

const QuestionWithType = () => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([{ option: "", image: {} }]);
  const [question, setQuestion] = useState(" ");
  const [questionType, setQuestionType] = useState(1);
  const [fileList, setFileList] = useState([]);

  const handleImageChange = (info, index, action) => {
    setFileList(info.fileList);
    let data = [...options];
    data[index] = { ...data[index], image: info.fileList };
    setOptions(data);
  };

  // useEffect(() => {
  //   // console.log("useEffect works");
  //   // console.log(options);
  //   // props.questionChange(options);
  // }, [options]);

  // const handleQuestionChange = (e) => {
  //   console.log(e.target.value);
  //   setQuestion(e.target.value);
  //   // props.questionChange(e.target.value);
  // };

  // const handleChange = (e, index) => {
  //   const { value } = e.target;
  //   let data = [...options];

  //   data[index] = { ...data[index], option: value };
  //   setOptions(data);
  //   props.optionChange(options);
  // };

  let removeFormFields = (i) => {
    let newOption = [...options];
    newOption.splice(i, 1);
    setOptions(newOption);
  };

  let addFormFields = () => {
    setOptions([...options, { option: "" }]);
  };

  const onQuestionTypeChange = (value) => {
    setQuestionType(value)
    // switch (value) {
    //   case 1:
    //     setQuestionType(1)
    //     return;
    //   case 2:
    //     return;
    //   case 3:
    // }
  };

  return (
    <Form
      onFinish={(item) => console.log(item)}
      form={form}
    >
      <Form.Item name="Question">
        <Input
          placeholder="Question.."
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
      <Form.List
        name="names"
        
        
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                required={false}
                key={field.key}
                name={[field.name,"object"]}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="passenger name"
                    style={{
                      width: '60%',
                    }}
                  />
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
                  width: '60%',
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

      <Form.Item>
        <Button type="primary" onClick={() => form.submit()} >
          Add Question
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionWithType;
