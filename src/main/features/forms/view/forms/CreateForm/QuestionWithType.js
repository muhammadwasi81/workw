import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Select, Button, Upload, Space } from "antd";
import {
  CloseOutlined,
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { createGuid } from "../../../../../../utils/base";
import styles from "../EditForm/editForm.css";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../../localization/index";
const { Option } = Select;

const QuestionWithType = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];

  const {
    Question,
    addOption,
    selectAnswerType,
    number,
    text,
    polls,
    addQuestion,
  } = documentDictionary;
  const [form] = Form.useForm();
  const [options, setOptions] = useState([{ option: "", image: {} }]);
  const [question, setQuestion] = useState(" ");
  const [questionType, setQuestionType] = useState(3);
  const [fileList, setFileList] = useState([]);
  const [quesionImage, setQuestionImage] = useState();

  const handleImageChange = (info, index) => {
    console.log("index", index);
    console.log(info);
    if (info.file?.status === "removed") {
      console.log("removed console");
      let fileLists = [...fileList];
      console.log(fileLists);
      fileLists.splice(index, 1);
      console.log(fileLists);
      setFileList(fileLists);
      return;
    }
    if (!fileList[index]) {
      console.log("add console");
      setFileList([
        ...fileList,
        {
          image: info.fileList[0],
          index,
        },
      ]);
    }
  };

  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  const handleQuestionImageChange = (info) => {
    console.log("image", info);
    setQuestionImage(info.fileList[0]);
  };

  const onQuestionTypeChange = (value) => {
    setQuestionType(value);
  };

  const onFinish = (values) => {
    console.log("values", values);
    console.log("fileList onfinish", fileList);
    let data = {};
    if (values.answers) {
      data = {
        ...values,
        fileList: fileList,
        image: quesionImage && quesionImage,
      };
    } else {
      data = {
        ...values,
        fileList: fileList,
        answers: [],
        image: quesionImage && quesionImage,
      };
    }
    console.log(data, "data here console");
    props.dataSend(data);
    form.resetFields();
    setQuestionImage(null);
    setFileList([]);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <div className="c-row bg-clr editForm">
        <div className="f-head-item p_15">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              name="question"
              rules={[
                {
                  required: true,
                  message: "Fill the question field",
                },
              ]}
            >
              <Input placeholder={Question} style={{ width: "40em" }} />
            </Form.Item>
            <Form.Item className="optionClass" name="questionImage">
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
          <Form.Item
            name="answerType"
            initialValue={3}
            // rules={[
            //   {
            //     required: true,
            //     message: "Please Select your Answer type!",
            //   },
            // ]}
          >
            <Select
              placeholder={selectAnswerType}
              onChange={onQuestionTypeChange}
              allowClear
              defaultValue={3}
            >
              <Option value={3}>{text}</Option>
              <Option value={2}>{number}</Option>
              <Option value={1}>{polls}</Option>
            </Select>
          </Form.Item>
          {questionType === 1 && (
            <Form.List name="answers">
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
                            message:
                              "Please input quesion's or delete this field.",
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
                      {addOption}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          )}
          <Form.Item>
            <Button
              // type="primary"
              onClick={() => form.submit()}
              className="btn"
            >
              {addQuestion}
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default QuestionWithType;
