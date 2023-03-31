import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import VideoCard from "../../../eLearning/view/Dashboard/Components/VideoCard";

function VideoContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const { loaders, videos } = useSelector((state) => state.eLearningSlice);
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/eLearning?q=${searchQuery}`);
  };
  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Videos</h5>
        {videos.slice(0, 4).map((item) => {
          return <VideoCard data={item} />;
        })}

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
export default VideoContainer;
