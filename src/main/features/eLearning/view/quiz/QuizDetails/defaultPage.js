import React, { useEffect } from "react";
import { CheckQuizAttempt } from "../../../store/action";
import WhiteCard from "../../../UI/WhiteCard";
import DetailLayout from "../../Dashboard/Layout/DetailLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";

function DefaultPage({ pageChangeFunc, data }) {
  const disptach = useDispatch();
  const { loaders, checkquizAttempt } = useSelector(
    (state) => state.eLearningSlice
  );
  const id = useParams().id;

  useEffect(() => {
    disptach(CheckQuizAttempt(id));
  }, []);

  if (loaders.checkQuizAttemptLoading) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  return (
    <WhiteCard className={"h-screen"}>
      <div className="flex flex-col">
        <span className="text-4xl font-extrabold">
          {/* Test your Knowledge on the importance of usability studies{" "} */}
          {data.name}
        </span>
        <span className="text-[#707070] text-lg font-bold mt-1">
          Quiz. 20 questions
        </span>
        <span className="text-[#707070] text-lg font-bold">
          {/* "Even classics can be updated and improved ... Highly
          recommended."―Choice "This book changed the field of design. As the
          pace of technological change accelerates, the principles in this book
          are increasingly important. The new examples and ideas about design
          and product development make it essential reading."―Patrick Whitney,
          Dean, Institute of Design, and Steelcase/Robert C. Pew Professor of
          Design, Illinois Institute of Technology.... */}
          {data.description}
        </span>
        {!checkquizAttempt.data ? (
          <button
            className="w-[15rem] h-[3rem] mt-[1rem]  bg-[#1A5669] text-[#fff] rounded-[10px]"
            onClick={() => pageChangeFunc("QuizPage")}
          >
            Start Quiz
          </button>
        ) : (
          <button
            className="w-[15rem] h-[3rem] mt-[1rem]  bg-[#1A5669] text-[#fff] rounded-[10px]"
            onClick={() => pageChangeFunc("QuizResultPage")}
          >
            Details
          </button>
        )}
      </div>
    </WhiteCard>
  );
}

export default DefaultPage;
