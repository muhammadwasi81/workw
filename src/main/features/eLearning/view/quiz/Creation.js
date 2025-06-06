import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../Dashboard/Layout/DashboardLayout";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { FormContainer, Heading, MainContainer } from "./styleObjects";
import "./style.css";
import { Avatar, Button, Form, Input, Radio, Select } from "antd";
import { useState } from "react";
import { addBook, addQuiz } from "../../store/action";
// import QuestionWithType from "../../../forms/view/forms/CreateForm/QuestionWithType"
import PollQuestion from "./PollQuestion";
import DrangableQuestions from "./DraggableItem";
import { createGuid, STRINGS } from "../../../../../utils/base";
import RadioComponent from "./Radio";
import RadioWithImageComponent from "./RadioWithImage";
import { Navigate, useNavigate } from "react-router-dom";

const { TextArea } = Input;

let initialData = {
  id: createGuid(),
  name: "",
  description: "",
  questions: [],
};

function CreateQuiz(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];

  const { loaders, success } = useSelector((state) => state.eLearningSlice);
  console.log(loaders);

  const [pollData, setPollData] = useState(initialData);
  const [pollQuestions, setPollQuestions] = useState([]);

  //1 for radio
  //2 for radio with image

  const [form] = Form.useForm();

  useEffect(() => {
    if (pollQuestions.length) {
      setPollData({
        ...pollData,
        questions: pollQuestions,
      });
    }
  }, [pollQuestions]);

  const dataGet = (values) => {
    console.log("data get in create form", values);
    //TODO: check attachments according to the index and make answer to pass in payload
    let filteredAnswers = values?.answers.map((answerItem, answerIndex) => {
      let filteredItem = {};
      if (values.fileList.length > 0) {
        values?.fileList.map((fileItem, fileIndex) => {
          if (fileItem.index === answerIndex) {
            console.log("if works");
            filteredItem = {
              id: createGuid(),
              answer: answerItem,
              isTrue: answerIndex === values.isTrue.index ? true : false,
              attachments: {
                id: STRINGS.DEFAULTS.guid,
                file: fileItem.image.originFileObj,
              },
            };
          } else {
            console.log("else works");
            filteredItem = {
              id: createGuid(),
              answer: answerItem,
              isTrue: answerIndex === values.isTrue.index ? true : false,
              attachments: {},
            };
          }
        });
      } else {
        console.log("main else");
        filteredItem = {
          id: createGuid(),
          answer: answerItem,
          isTrue: answerIndex === values.isTrue.index ? true : false,
          attachments: {},
        };
      }
      return filteredItem;
    });

    let question = {
      id: createGuid(),
      question: values.question,
      attachments: values.questionImage
        ? { id: STRINGS.DEFAULTS.guid, file: values.questionImage.file }
        : {},
      answers: filteredAnswers,
      type: values.fileList.length > 0 ? 2 : 1,
    };

    setPollQuestions([...pollQuestions, question]);
    console.log(question, "filtered questions");
    //TODO: here to set data accordingly to render below and send to api...
  };

  // const onSubmit = () => {

  // };

  const onFinish = (values) => {
    const newFilteredQuestions = pollData?.questions.map((el) => {
      const { type, ...restVal } = el;
      return restVal;
    });

    const payload = {
      ...pollData,
      questions: newFilteredQuestions,
      name: values.name,
      description: values.description,
    };

    console.log(payload);

    dispatch(addQuiz(payload));
    //TODO: navigate to back page
    if (success === true) {
      navigate(-1);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <DashboardLayout>
      <MainContainer className="AddCourseMainContainer">
        <Heading>Create Quiz</Heading>
        <Form
          name="CreateForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <div className="card mb-4">
            <Form.Item
              label="Quiz name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Quiz name required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Quiz description required!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>
          <div className="create-quiz-body mb-4">
            <PollQuestion dataSend={(values) => dataGet(values)} />
          </div>

          {pollQuestions.map((el, i) => (
            <>
              {el.type === 1 ? (
                <RadioComponent question={el} />
              ) : (
                <RadioWithImageComponent question={el} />
              )}
            </>
          ))}
          {pollQuestions.length > 0 && (
            <Button
              className="Formbtn"
              // type="primary"
              htmlType="submit"
              loading={loaders.addQuizLoading ? true : false}
            >
              Submit
            </Button>
          )}
        </Form>
      </MainContainer>
    </DashboardLayout>
  );
}

export default CreateQuiz;
