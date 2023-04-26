import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import ThumbnailSkeleton from "../../../eLearning/view/Dashboard/UI/thumbnailSkeleton";
import ArticleCard from "../../../eLearning/view/Dashboard/Components/ArticleCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import { handleTab } from "../../store/slice";

function ArticleContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchQuery = searchParams.get("q");
  const {keyword,tab} = useSelector((state) => state.globalSearchSlice);
  const { loaders, articles } = useSelector((state) => state.eLearningSlice);
  let loading = loaders.articlesLoading;
  const navigate = useNavigate();

  const searchHandler = () => {
    dispatch(handleTab("e_learning_article"))
  };
  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Articles</h5>
        <div
          className={
          keyword?.ELearningArticles?.length > 0
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
          : ""}
        >
          {
            keyword?.ELearningArticles?.length > 0 ? 
              (
                keyword?.ELearningArticles?.slice(0,4).map((item)=>{
                return <ArticleCard data={item}/>})
              ) 
              :
              (<></>)
          }
        </div>
          {tab==="All" ? 
          (
            <div
              onClick={searchHandler}
              className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
            >
              See more
            </div>
          )
          :
          (
          <div></div>)
          }
        </div>
    </>
  );
}
export default ArticleContainer;
