import React, { useEffect, useState } from "react";
import {
  AddStartQuiz,
  CheckQuizAttempt,
  getQuizById,
} from "../../../store/action";
import WhiteCard from "../../../UI/WhiteCard";
import DetailLayout from "../../Dashboard/Layout/DetailLayout";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DefaultPage from "./defaultPage";
import StartQuiz from "./startQuiz";
import ResultPage from "./resultPage";

function QuizDetail(props) {
  const disptach = useDispatch();
  //   const navigate = useNavigate();
  const { state } = useLocation();
  const id = useParams().id;
  const [CurrentPage, setCurrentPage] = useState("DetailPage");
  console.log(state, "poo");
  //   const { courseDetail } = useSelector((state) => state.eLearningSlice);
  //   let {
  //     image,
  //     name,
  //     creator,
  //     assignMembers,
  //     members,
  //     description,
  //     curriculums,
  //   } = courseDetail;
  let Default = "https://www.makeintern.com/learning/img/online-course12.jpg";

  useEffect(() => {
    // disptach(getQuizById(id));
    disptach(AddStartQuiz(id));
  }, []);

  let renderPage = {
    DetailPage: (
      <DefaultPage pageChangeFunc={setCurrentPage} data={state.data} />
    ),
    QuizPage: <StartQuiz />,
    QuizResultPage: <ResultPage id={id} />,
  };

  return (
    <DetailLayout>
      {/* <WhiteCard className={"h-screen"}>
        <div className="flex flex-col">
          <span className="text-4xl font-extrabold">
            Test your Knowledge on the importance of usability studies{" "}
          </span>
          <span className="text-[#707070] text-lg font-bold mt-1">
            Quiz. 20 questions
          </span>
          <span className="text-[#707070] text-lg font-bold">
            "Even classics can be updated and improved ... Highly
            recommended."―Choice "This book changed the field of design. As the
            pace of technological change accelerates, the principles in this
            book are increasingly important. The new examples and ideas about
            design and product development make it essential reading."―Patrick
            Whitney, Dean, Institute of Design, and Steelcase/Robert C. Pew
            Professor of Design, Illinois Institute of Technology....
          </span>
          <button className="w-[15rem] h-[3rem] mt-[1rem] self-end bg-[#1A5669] text-[#fff] rounded-[10px]">
            Start Quiz
          </button>
        </div>
      </WhiteCard> */}
      {renderPage[CurrentPage]}
    </DetailLayout>
  );
}

export default QuizDetail;
