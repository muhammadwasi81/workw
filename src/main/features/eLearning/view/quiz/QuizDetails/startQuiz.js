import React, { useEffect } from "react";
import WhiteCard from "../../../UI/WhiteCard";
import QuestionWithoutImage from "./questionWithoutImage";
import { useSelector } from "react-redux";
import { AddStartQuiz } from "../../../store/action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";

const StartQuiz = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const { loaders } = useSelector((state) => state.eLearningSlice);
  // const { questions } = quizDetail;

  useEffect(() => {
    dispatch(AddStartQuiz(id));
  }, []);

  if (loaders.startQuizLoader) {
    return (
      <WhiteCard className="h-screen flex justify-center">
        <Skeleton
          active
          paragraph={{
            rows: 3,
          }}
        />
      </WhiteCard>
    );
  }

  return (
    <WhiteCard className="h-screen flex justify-center">
      {/* <QuestionWithoutImage questions={startQuiz} /> */}
      <QuestionWithoutImage />
    </WhiteCard>
  );
};

export default StartQuiz;
