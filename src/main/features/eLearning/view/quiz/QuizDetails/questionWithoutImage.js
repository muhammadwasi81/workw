import { Button, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addQuizAnswerAttempt } from "../../../store/action";
import "./style.css";

const QuestionWithoutImage = ({ questions }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [radioAnswer, setRadioAnswer] = useState("");
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const { startQuiz } = useSelector((state) => state.eLearningSlice);

  //   useEffect(() => {
  //     if (questions.length) {
  //       setQuestion(questions[0]);
  //     }
  //   }, [questions]);
  //   console.log(question);
  console.log(questions);

  const onchangeRadio = (e) => {
    setRadioAnswer(e.target.value);
    console.log(e.target.value);
  };

  const onSubmit = () => {
    console.log("on submit console");
    //TODO: dispatch action for respsonse quiz question here
    let payload = {
      questionId: questions.questions[questionIndex].id,
      answerId: radioAnswer,
      attemptId: questions.id,
    };
    dispatch(addQuizAnswerAttempt(payload));
    if (questions.questions.length === questionIndex + 1) {
      console.log("ssss");
      setIsLastQuestion(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
    // setQuestion(questions[1]);
  };

  if (isLastQuestion) {
    return <div>Last question thank you</div>;
  }

  return (
    <div className="question-box flex flex-col">
      <span className="text-xl">{`Question ${questionIndex + 1}/${
        questions.questions.length
      }`}</span>
      {questions.questions[questionIndex].attachment && (
        <div className="flex self-center">
          <img
            src={
              "https://58.65.211.234:4436/Resources\\0ab5f9c0-f948-4c40-8dad-c58ba99fb765\\Images\\f41b2b3c-e18e-4d78-b594-74c3b01cbf25.png"
            }
            className="w-[300px] h-[300px] flex self-center"
          />
        </div>
      )}

      <span className=" text-base font-black mt-6">
        {questions.questions[questionIndex].question}
      </span>
      {/**will map here options */}
      <Radio.Group
        onChange={onchangeRadio}
        rules={[
          {
            required: true,
          },
        ]}
      >
        {questions.questions[questionIndex]?.answers.map((el, i) => (
          <>
            <div className="inputBox mt-4">
              <Radio value={el.id}> {el.answer}</Radio>
            </div>
          </>
        ))}
      </Radio.Group>
      <Button
        className="Formbtn w-[5rem] mt-4 flex justify-center self-end"
        onClick={onSubmit}
      >
        Next
      </Button>
    </div>
  );
};

export default QuestionWithoutImage;
