import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import QuizCard from "../../../eLearning/view/Dashboard/Components/QuizCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
function QuizContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const {keyword} = useSelector((state) => state.globalSearchSlice);
  const { loaders, quizzes } = useSelector((state) => state.eLearningSlice);
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/eLearning?q=${searchQuery}`);
  };
  return (
    <>
    {
      keyword?.ELearningQuiz?.length > 0 ? (<div className="SearchMainContainer">
      <h5 className="containerHeading">Quizez</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2">
        {keyword?.ELearningQuiz?.slice(0, 4).map((el) => (
          <QuizCard item={el} />
        ))}
      </div>
      {keyword?.ELearningQuiz?.length>3 ? (<div
              onClick={searchHandler}
              className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
            >
              See more
            </div>):( <div></div> )}
    </div>) : (<div className="SearchMainContainer">
          <div><NoDataFound/></div></div>
    )
    }
      
    </>
  );
}
export default QuizContainer;
