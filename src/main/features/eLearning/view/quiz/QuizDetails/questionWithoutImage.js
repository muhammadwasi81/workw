import { Button, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addQuizAnswerAttempt } from "../../../store/action";
import blackLogo from "../../../../../../content/blackLogo.svg";
import ThankyouPage from "../../../../../../content/thankyoupage.jpeg";
import "./style.css";

const QuestionWithoutImage = ({ questions }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [radioAnswer, setRadioAnswer] = useState("");
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const { startQuiz } = useSelector((state) => state.eLearningSlice);

  const onchangeRadio = (e) => {
    setRadioAnswer(e.target.value);
  };

  const onSubmit = () => {
    let payload = {
      questionId: startQuiz.questions[questionIndex].id,
      answerId: radioAnswer,
      attemptId: startQuiz.id,
    };
    dispatch(addQuizAnswerAttempt(payload));
    if (startQuiz.questions.length === questionIndex + 1) {
      setIsLastQuestion(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };
  if (isLastQuestion) {
    return (
      // <div className="h-[50%] w-[50%] border-[#195669] border-[30px]">
      //   <div className="flex flex-col justify-center items-center">
      //     <img
      //       src={blackLogo}
      //       alt=""
      //       className="w-[8rem] h-[8rem] lg:w-[10rem]  lg:w-[10rem]"
      //     />
      //     <span className="text-2xl font-black">Successfully Attempted</span>
      //     <span className="text-4xl font-black mt-4">Thankyou</span>
      //   </div>
      // </div>
      <div className="flex justify-center">
        <img src={ThankyouPage} alt="" className="w-[50vw] h-[90vh]" />
      </div>
    );
  }
  return (
    <div className="question-box flex flex-col">
      <span className="text-xl">{`Question ${questionIndex + 1}/${
        startQuiz.questions.length
      }`}</span>
      {startQuiz.questions[questionIndex].attachment && (
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
        {startQuiz.questions[questionIndex].question}
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
        {startQuiz.questions[questionIndex]?.answers.map((el, i) => (
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
