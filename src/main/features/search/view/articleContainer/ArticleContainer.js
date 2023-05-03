import React, { useContext, useState , useEffect} from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import ThumbnailSkeleton from "../../../eLearning/view/Dashboard/UI/thumbnailSkeleton";
import ArticleCard from "../../../eLearning/view/Dashboard/Components/ArticleCard";
import { handleTab } from "../../store/slice";
import { geteLearningArticle } from "../../store/actions";

function ArticleContainer() {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchQuery = searchParams.get("q");
  const {keyword,tab , eArticleData} = useSelector((state) => state.globalSearchSlice);
  
  const searchHandler = () => {
    dispatch(handleTab("e_learning_article"))
    callApiAgain()

  };

  const callApiAgain = () =>{
    dispatch(geteLearningArticle({
      pageNo:1,
      pageSize: 20,
      search: searchQuery,
      filterType: 13,
    }))
  }

  const loadMoreHandler = () =>{
    // callApiAgain();
  }

  useEffect(()=>{
    callApiAgain();
  },[tab==="e_learning_article"])

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
            tab === "All" ? 
            (
              keyword?.ELearningArticles?.map((item)=>{
                return <ArticleCard data={item}/>})
            )
            :
            (
              eArticleData?.map((item)=>{
                return <ArticleCard data={item}/>})
            )
          }
        </div>
          {tab==="All" && keyword?.ELearningArticles?.length === 3 && 
              (
                <div
                  onClick={searchHandler}
                  className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                >
                  See more
                </div>
              )
            
            }
            {tab==="e_learning_article" && eArticleData?.length === 20 &&
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
export default ArticleContainer;
