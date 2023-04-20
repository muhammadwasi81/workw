import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import CourseCard from "../../../eLearning/view/Dashboard/Components/CourseCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";

function CoursesContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const {keyword} = useSelector((state) => state.globalSearchSlice);
  const { books, loaders } = useSelector((state) => state.eLearningSlice);
  let loading = loaders.bookLoading;
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/eLearning?q=${searchQuery}`);
  };
  return (
    <>
    {
      keyword?.ELearningCourse?.length > 0 ? ( <div className="SearchMainContainer">
      <h5 className="containerHeading">Courses</h5>
      <div
        className={
          keyword?.ELearningCourse?.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
            :  ""
        }
      >
        {
          keyword?.ELearningCourse?.length > 0 ? (
            keyword?.ELearningCourse?.slice(0,4).map((item)=>{
              return <CourseCard data={item} />;
            })
          ) : (<>
            {" "}
            {/* <NoDataFound /> */}
          </>)
        }
        {/* {loading ? (
          <ThumbnailSkeleton count={[1, 2]} />
        ) : books?.length > 0 ? (
          books.slice(0, 4).map((item) => {
            return <EbookCard data={item} />;
          })
        ) : (
          !loading && (
            <>
              {" "}
              <NoDataFound />
            </>
          )
        )} */}
      </div>
      {keyword?.ELearningCourse?.length > 3 ? (<div
      onClick={searchHandler}
      className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
    >
      See more
    </div>):(<div></div>)}
    </div>): (<div className="SearchMainContainer">
          <div><NoDataFound/></div></div>
    )
    }
     
    </>
  );
}
export default CoursesContainer;
