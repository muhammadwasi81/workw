import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import VideoCard from "../../../eLearning/view/Dashboard/Components/VideoCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
function VideoContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const { loaders, videos } = useSelector((state) => state.eLearningSlice);
  const {keyword} = useSelector((state) => state.globalSearchSlice);
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/eLearning?q=${searchQuery}`);
  };
  return (
    <>
    {keyword?.ELearningVideos?.length > 0 ? (   <div className="SearchMainContainer">
        <h5 className="containerHeading">Videos</h5>
        {keyword?.ELearningVideos?.slice(0, 4).map((item) => {
          return <VideoCard data={item} />;
        })}

          {keyword?.ELearningVideos?.length>3 ? (<div
              onClick={searchHandler}
              className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
            >
              See more
            </div>):( <div></div> )}
      </div>) : (<div className="SearchMainContainer">
          <div><NoDataFound/></div></div>
    )}
   
    </>
  );
}
export default VideoContainer;
