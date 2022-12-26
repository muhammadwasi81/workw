import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardLayout from "../Dashboard/Layout/DashboardLayout";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { FormContainer, Heading, MainContainer } from "./styleObjects";
import "./style.css"
import { Avatar, Button, Form, Input, Radio, Select } from "antd";
import { useState } from "react";
import { addBook } from "../../store/action";
// import QuestionWithType from "../../../forms/view/forms/CreateForm/QuestionWithType"
import PollQuestion from "./PollQuestion"
import DrangableQuestions from "./DraggableItem";
import RadioWithImage from "../../../forms/view/forms/CreateForm/QuestionsItems/RadioWithImage";
import TextFields from "../../../forms/view/forms/CreateForm/QuestionsItems/TextFields";

function CreateQuiz(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[ userLanguage  ];
  
  const [pollData, setPollData ] = useState([]);

  const [form] = Form.useForm();

  const dataGet = (values) => {
    console.log("data get in create form", values);
    //send data to edit form component
    // props.dataSend(values);
    setPollData(...pollData, values)
    console.log(pollData, "POLL DATA BOIII")
  };


  return (
      <DashboardLayout>
      <MainContainer className="AddCourseMainContainer">
      <Heading>Create Quiz</Heading>
      <PollQuestion dataSend={(values) => setPollData([values])} />
      {
       pollData.length >= 1 && pollData.map((item, index) => {
          <>
            {item.answerType === 3 && (
            <Radio
              // handleRadioChange={handleChange}
              question={item}
              index={index}
              // removeQuestion={(index) => removeQuestion(index)}
            />
          )} 
          </> 
        }) 
      }
      
      {/* <DrangableQuestions
            // questions={pollData.question}
            // handleChange={handleSequenceChange}
          >
            {pollData &&
              pollData.question.map((item, index) => (
                <>
                  {item.answer === 3 && (
                    <Radio
                      // handleRadioChange={handleChange}
                      question={item}
                      index={index}
                      // removeQuestion={(index) => removeQuestion(index)}
                    />
                  )}
                </>
              ))}
          </DrangableQuestions> */}
      {/* <Form
          form={form}
          name="addCourse"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
        <FormContainer>
          <div className="flex">
            <div className="innerColumn">
              <Form.Item
                label={"Select Category"}
                name="categoryId"
                rules={[
                  {
                    required: true,
                    message: "Please Select Category",
                  },
                ]}
              >
                <CustomSelect
                  data={rewardCategories}
                  placeholder={"Select Categoy"}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                  }}
                  size="large"
                />
            </Form.Item>
            </div>
          </div>
          <div className="flex">
            <div className="innerColumn">
              <Form.Item
                label={"Name"}
                name="name"
                labelPosition="top"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Name",
                  },
                ]}
              >
              <TextInput placeholder={"Enter Name"} />
            </Form.Item>
            </div>
            <div className="innerColumn">
            <Form.Item
                label={"Athor Name"}
                name="athorName"
                labelPosition="top"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Name",
                  },
                ]}
              >
              <TextInput placeholder={"Enter Name"} />
            </Form.Item>
            </div>
          </div>
          <div className="flex">
          <div className="innerColumn">
              <Form.Item
              label={"Information"}
              name="informataion"
              rules={[
                {
                  required: true,
                  message: "Enter Information",
                },
              ]}
            >
              <Input.TextArea placeholder={"Enter Information"} />
          </Form.Item>
            </div>
          </div>
          <div className="flex" style={{marginTop: "15px"}}>
            <div className="innerColumn">
              <Form.Item
                  name="members"
                  label={"Members"}
                  showSearch={true}
                  direction={Direction}
                  style={{ marginBottom: "0px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Select Member",
                    },
                  ]}
                >
                  <CustomSelect
                    style={{ marginBottom: "0px" }}
                    data={firstTimeEmpData}
                    selectedData={selectedData}
                    canFetchNow={isFirstTimeDataLoaded}
                    fetchData={fetchEmployees}
                    placeholder={"Select Member"}
                    size="large"
                    mode={"multiple"}
                    isObject={true}
                    loadDefaultData={false}
                    optionComponent={(opt) => {
                      return (
                        <>
                          <Avatar name={opt.name} src={opt.image} className="!bg-black">
                            {getNameForImage(opt.name)}
                          </Avatar>
                          {opt.name}
                        </>
                      );
                    }}
                    dataVal={value}
                    name="members"
                    showSearch={true}
                    direction={Direction}
                    rules={[
                      {
                        required: true,
                        message: "Please Select Member",
                      },
                    ]}
                />
              </Form.Item>
              </div>
            <div className="innerColumn">
            <Form.Item
                name="assignMembers"
                label={"Assign Members"}
                showSearch={true}
                direction={Direction}
                style={{ marginBottom: "0px" }}
                rules={[
                  {
                    required: true,
                    message: "Please Select Assign Member",
                  },
                ]}
              >
                <CustomSelect
                  style={{ marginBottom: "0px" }}
                  data={firstTimeEmpData}
                  selectedData={selectedData}
                  canFetchNow={isFirstTimeDataLoaded}
                  fetchData={fetchEmployees}
                  placeholder={"Select Assign Member"}
                  size="large"
                  mode={"multiple"}
                  isObject={true}
                  loadDefaultData={false}
                  optionComponent={(opt) => {
                    return (
                      <>
                        <Avatar name={opt.name} src={opt.image} className="!bg-black">
                          {getNameForImage(opt.name)}
                        </Avatar>
                        {opt.name}
                      </>
                    );
                  }}
                  dataVal={value}
                  name="assignMembers"
                  showSearch={true}
                  direction={Direction}
                  rules={[
                    {
                      required: true,
                      message: "Please Select Assign Member",
                    },
                  ]}
              />
            </Form.Item>
            </div>
            </div>
          <div className="innerColumn">
          <Form.Item
            label={"Description"}
            name="description"
            rules={[
              {
                required: true,
                message: "Enter Description",
              },
            ]}
          >
            <Input.TextArea placeholder={"Enter Description"} style={{height: "50px"}} />
          </Form.Item>
          <div className="flex"> 
            <Form.Item area="true">
              <SingleUpload
                handleImageUpload={handleImageUpload}
                img="Add Image"
                position="flex-start"
                uploadText={"Image"}
                accept="image/*"
              />
            </Form.Item>
            <Form.Item area="true">
              <SingleUpload
                handleImageUpload={handlePdfUpload}
                img="Add Image"
                position="flex-start"
                uploadText={"Attachment"}
                accept=".pdf"
              />
            </Form.Item>
          </div>
          </div>
        </FormContainer>
        <Form.Item>
                <div className="flex items-center gap-2">
                  <PrivacyOptions
                    privacyId={privacyId}
                    onPrivacyChange={onPrivacyChange}
                  />
                  <Button
                    type="primary"
                    size="medium"
                    className="ThemeBtn"
                    block
                    htmlType="submit"
                    title={"Create"}
                    loading={loader}
                  >
                    {" "}
                    {"Create"}{" "}
                  </Button>
                </div>
        </Form.Item>
        </Form> */}
      </MainContainer>
    </DashboardLayout>
  );
}

export default CreateQuiz
