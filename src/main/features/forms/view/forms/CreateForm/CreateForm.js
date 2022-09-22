import React, { useState, useEffect } from "react";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import MemberSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getNameForImage, STRINGS } from "../../../../../../utils/base";
import { useSelector, useDispatch } from "react-redux";
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
  const [type, setType] = useState([]);
  const [options, setOptions] = useState([]);
  const [pollsImage, setPollsImage] = useState([]);
  const [polls, setPolls] = useState([]);

  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  const [employeesData, setEmployeesData] = useState([]);
  const dispatch = useDispatch();
  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

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
    //Type and options to be used in form submission and pushing into question object
    console.log(type);
    console.log(options);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log(props, "in parent component");
  return (
    <>
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
        <Form.Item>
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
        <QuestionWithType
          setQuestionType={(value) => setType({ type: value })}
          questionChange={(value) => setOptions({ value })}
          typeProp={type}
          //   optionChange={(value)=> }
        />
        {/* <Form.Item name="question">
          <Input placeholder="Question" />
        </Form.Item> */}
        {/* <Form.Item name="Question Type">
          <Select
            placeholder="Select Question Type"
            onChange={onQuestionTypeChange}
            allowClear
          >
            <Option value={1}>Text</Option>
            <Option value={2}>Number</Option>
            <Option value={3}>Polls</Option>
          </Select>
        </Form.Item> */}

        {/* {type === 3 && (
          //   <Form.Item name="options">
          //     {options.map((element, index) => (
          //       <div style={{ display: "flex", gridGap: "1em" }}>
          //         <Input
          //           placeholder={`option ${index + 1}`}
          //           onChange={(e) => {

          //           }}
          //         />
          //         <SingleUpload
          //           handleImageUpload={handleImageUpload}
          //           img="Add Image"
          //           position="flex-start"
          //           uploadText={"Uploads"}
          //         />
          //         {index ? (
          //           <button
          //             type="button"
          //             className="button-remove"
          //             onClick={() => removeFormFields(index)}
          //           >
          //             <CloseOutlined />
          //           </button>
          //         ) : null}
          //       </div>
          //     ))}

          //     <Button onClick={() => addFormFields()}>Add More</Button>
          //   </Form.Item>
          <div>
            {options.map((element, index) => (
              <>
                <Options
                  onChange={onInputFieldChange}
                  placeholder="Optionsss"
                  name="option"
                  handleImageUpload={handleImageUpload}
                />
                {index ? (
                  <button
                    type="button"
                    className="button-remove"
                    onClick={() => removeFormFields(index)}
                  >
                    <CloseOutlined />
                  </button>
                ) : null}
              </>
            ))}
            <Button onClick={() => addFormFields()}>Add More</Button>
          </div>
        )} */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Question
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateForm;
