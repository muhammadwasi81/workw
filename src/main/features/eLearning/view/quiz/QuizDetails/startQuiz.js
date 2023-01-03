import React from "react";
import WhiteCard from "../../../UI/WhiteCard";
import { Form, Radio } from "antd";
import QuestionWithoutImage from "./questionWithoutImage";
import { useSelector } from "react-redux";

const StartQuiz = () => {
  const { quizDetail, startQuiz } = useSelector(
    (state) => state.eLearningSlice
  );
  const { questions } = quizDetail;
  return (
    <WhiteCard className="h-screen flex justify-center">
      <QuestionWithoutImage questions={startQuiz} />
    </WhiteCard>
  );
};

export default StartQuiz;
