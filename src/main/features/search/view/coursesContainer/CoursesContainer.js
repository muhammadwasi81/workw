import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import CourseCard from "../../../eLearning/view/Dashboard/Components/CourseCard";

function CoursesContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const { loaders, courses } = useSelector((state) => state.eLearningSlice);

  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/eLearning?q=${searchQuery}`);
  };
  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Courses</h5>
        <div className="coursListing">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mb-2">
            {courses.slice(0, 4).map((item) => {
              return <CourseCard data={item} />;
            })}
          </div>
        </div>
        <div
          onClick={searchHandler}
          className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
        >
          See more
        </div>
      </div>
    </>
  );
}
export default CoursesContainer;
