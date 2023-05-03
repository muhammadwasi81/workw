import React, { useContext, useState  , useEffect} from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import CourseCard from "../../../eLearning/view/Dashboard/Components/CourseCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import { geteLearningCourse } from "../../store/actions";
import { handleTab } from "../../store/slice";

function CoursesContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const dispatch = useDispatch();
  const {keyword , tab , eCourseData} = useSelector((state) => state.globalSearchSlice);
  
   const searchHandler = () => {
      dispatch(handleTab("e_learning_course"))
      callApiAgain();
      
    };

    const callApiAgain = () =>{
      dispatch(geteLearningCourse({
        pageNo:1,
        pageSize: 20,
        search: searchQuery,
        filterType: 11,
      }))
    }
  
    const loadMoreHandler = () =>{
      // callApiAgain();
    }
  
    useEffect(()=>{
      callApiAgain();
    },[tab==="e_learning_course"])
  
    

  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Courses</h5>
        <div
          className={
            keyword?.ELearningCourse?.length > 0
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
              :  ""
          }
        >
          {
            tab==="All" ? 
            (
              keyword?.ELearningCourse?.map((item)=>{
                return <CourseCard data={item} />;
              })
            )
            :
            (
              eCourseData.map((item)=>{
                return <CourseCard data={item} />;
              })
            )
          }
        </div>
        {tab==="All" && keyword?.ELearningCourse?.length === 3 && 
              (
                <div
                  onClick={searchHandler}
                  className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                >
                  See more
                </div>
              )
            
            }
            {tab==="e_learning_course" && eCourseData?.length === 20 &&
              (
                <div
                  onClick={loadMoreHandler}
                  className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                >
                  Load More
                </div>   
              )
            }
      </div>
    </>
  );
}
export default CoursesContainer;
