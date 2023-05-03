import React, { useContext, useState , useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import ThumbnailSkeleton from "../../../eLearning/view/Dashboard/UI/thumbnailSkeleton";
import TedTalkCard from "../../../eLearning/view/Dashboard/Components/TedTalkCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import { geteLearningTedTalks } from "../../store/actions";
import { handleTab } from "../../store/slice";

function TedTalks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const dispatch = useDispatch();
  const { tedTalks, loaders } = useSelector((state) => state.eLearningSlice);
  const {keyword ,tab , eTedTalkData} = useSelector((state)=> state.globalSearchSlice);
  let loading = loaders.tedTalkLoading;
  const navigate = useNavigate();
 
  const searchHandler = () => {
    dispatch(handleTab("e_learning_tedTalks"))
    callApiAgain();
    
  };

  const callApiAgain  = () =>{
    dispatch(geteLearningTedTalks({
      pageNo:1,
      pageSize: 20,
      search: searchQuery,
      filterType: 16,
    }))
  }

 const loadMoreHandler = () =>{
  // callApiAgain();
 }

 useEffect(() => {
    callApiAgain();
}, [tab === "e_learning_tedTalks"]);


  return (
    <>
    <div className="SearchMainContainer">
      <h5 className="containerHeading">TedTalks</h5>
      <div
        className={
          keyword.ELearningTedTalks?.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
            :  ""
        }
      >
        { tab === "All" ?
          (
            keyword?.ELearningTedTalks?.map((item) => {
              return <TedTalkCard data={item} />;
            })
          )
          :
          (
            eTedTalkData?.map((item) => {
              return <TedTalkCard data={item} />;
            })
          )
         }
      </div>
      {tab==="All" && keyword?.ELearningTedTalks?.length === 3 && 
                (
                  <div
                    onClick={searchHandler}
                    className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                  >
                    See more
                  </div>
                )
              
        }
         {tab==="e_learning_tedTalks" && eTedTalkData?.length === 20 &&
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
export default TedTalks;
