import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import ThumbnailSkeleton from "../../../eLearning/view/Dashboard/UI/thumbnailSkeleton";
import ArticleCard from "../../../eLearning/view/Dashboard/Components/ArticleCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";

function ArticleContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const {keyword} = useSelector((state) => state.globalSearchSlice);
  console.log("Data",keyword)
  const { loaders, articles } = useSelector((state) => state.eLearningSlice);
  let loading = loaders.articlesLoading;
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/eLearning?q=${searchQuery}`);
  };
  return (
    <>
    {
       keyword?.ELearningArticles?.length > 0 ? (    <div className="SearchMainContainer">
       <h5 className="containerHeading">Articles</h5>
       <div
         className={
           keyword?.ELearningArticles?.length > 0
             ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
             : ""
         }
       >

         {
           keyword?.ELearningArticles?.length > 0 ? (
             keyword?.ELearningArticles?.slice(0,4).map((item)=>{
               return <ArticleCard data={item}/>
             })
           ) : (<>
             {" "}
             {/* <NoDataFound /> */}
           </>)
         }
         {/* {loading ? (
           <ThumbnailSkeleton count={[1, 2]} />
         ) : keyword?.ELearningArticles?.length > 0 ? (
           articles.slice(0, 4).map((item) => {
             return <ArticleCard data={item} />;
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
       {keyword?.ELearningArticles?.length > 3 ? (<div
        onClick={searchHandler}
        className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
      >
        See more
      </div>):(<div></div>)}
     </div>) :  (<div className="SearchMainContainer">
          <div><NoDataFound/></div></div>
    )
    }
  
    </>
  );
}
export default ArticleContainer;
