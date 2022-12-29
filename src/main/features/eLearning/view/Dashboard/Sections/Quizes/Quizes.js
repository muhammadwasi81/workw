import { Skeleton } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllQuiz } from "../../../../store/action";

import QuizCard from "../../Components/QuizCard";

function Quizes() {
  const dispatch = useDispatch();
  const { loaders, quizzes } = useSelector((state) => state.eLearningSlice);

  useEffect(() => {
    console.log("use effect for quizes card");
    //here dispatch getall quiz
    dispatch(
      getAllQuiz({
        pageNo: 1,
        pageSize: 20,
        search: "",
        sortBy: 1,
      })
    );
  }, []);

  if (loaders.quizLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2">
        {[...Array(15)].map((item) => (
          <Skeleton avatar paragraph={{ rows: 6 }} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2">
      {/**
       * map here quiz card
       */
      quizzes.map((el) => (
        <QuizCard item={el} />
      ))}
      {/* <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard /> */}
    </div>
  );
}

export default Quizes;
