import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardLayout from "../Dashboard/Layout/DashboardLayout";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { FormContainer, Heading, MainContainer } from "./styleObjects";
import "./style.css";
import { Avatar, Button, Form, Input, Radio, Select } from "antd";
import { useState } from "react";
import { addBook } from "../../store/action";
// import QuestionWithType from "../../../forms/view/forms/CreateForm/QuestionWithType"
import PollQuestion from "./PollQuestion";
import DrangableQuestions from "./DraggableItem";
import RadioWithImage from "../../../forms/view/forms/CreateForm/QuestionsItems/RadioWithImage";
import TextFields from "../../../forms/view/forms/CreateForm/QuestionsItems/TextFields";
import { createGuid } from "../../../../../utils/base";
import RadioComponent from "./Radio";

let initialData = {
  id: createGuid(),
  name: "",
  description: "",
  questions: [],
};

function CreateQuiz(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];

  const [pollData, setPollData] = useState(initialData);
  const [pollQuestions, setPollQuestions] = useState([]);

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
                id: createGuid(),
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
        ? { id: createGuid(), file: values.questionImage.file }
        : {},
      answers: filteredAnswers,
    };

    setPollQuestions([...pollQuestions, question]);
    console.log(question, "filtered questions");
    //TODO: here to set data accordingly to render below and send to api...
  };
  console.log(pollQuestions);
  return (
    <DashboardLayout>
      <MainContainer className="AddCourseMainContainer">
        <Heading>Create Quiz</Heading>
        <div className="create-quiz-body mb-4">
          <PollQuestion dataSend={(values) => dataGet(values)} />
        </div>

        {pollQuestions.map((el, i) => (
          <RadioComponent question={el} />
        ))}
      </MainContainer>
    </DashboardLayout>
  );
}

export default CreateQuiz;
