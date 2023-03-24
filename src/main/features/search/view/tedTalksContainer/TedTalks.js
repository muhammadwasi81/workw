import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import ThumbnailSkeleton from "../../../eLearning/view/Dashboard/UI/thumbnailSkeleton";
import TedTalkCard from "../../../eLearning/view/Dashboard/Components/TedTalkCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";

function TedTalks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const { tedTalks, loaders } = useSelector((state) => state.eLearningSlice);
  let loading = loaders.tedTalkLoading;
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/eLearning?q=${searchQuery}`);
  };
  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">TedTalks</h5>
        <div
          className={
            loading || tedTalks?.length > 0
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
              : !loading && ""
          }
        >
          {loading ? (
            <ThumbnailSkeleton count={[1, 2]} />
          ) : tedTalks?.length > 0 ? (
            tedTalks.slice(0, 4).map((item) => {
              return <TedTalkCard data={item} />;
            })
          ) : (
            !loading && (
              <>
                {" "}
                <NoDataFound />
              </>
            )
          )}
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
export default TedTalks;
