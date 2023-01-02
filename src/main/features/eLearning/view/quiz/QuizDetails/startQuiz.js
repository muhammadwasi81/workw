import React from "react";
import WhiteCard from "../../../UI/WhiteCard";
import { Form, Radio } from "antd";
import QuestionWithoutImage from "./questionWithoutImage";

const StartQuiz = () => {
  return (
    <WhiteCard className="h-screen flex justify-center">
      <QuestionWithoutImage />
    </WhiteCard>
  );
};

export default StartQuiz;
