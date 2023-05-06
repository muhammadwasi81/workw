import React, { useContext, useState , useEffect} from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import ThumbnailSkeleton from "../../../eLearning/view/Dashboard/UI/thumbnailSkeleton";
import EbookCard from "../../../eLearning/view/Dashboard/Components/EbookCard";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import { geteLearningBook } from "../../store/actions";
import { handleTab } from "../../store/slice";

function BookContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const dispatch = useDispatch();
  const {keyword , tab , eBookData} = useSelector((state) => state.globalSearchSlice);
  const navigate = useNavigate();
  
   const searchHandler = () => {
      dispatch(handleTab("e_learning_book"))
      callApiAgain();
      
    };

    const callApiAgain = () =>{
      dispatch(geteLearningBook({
        pageNo:1,
        pageSize: 20,
        search: searchQuery,
        filterType: 15,
      }))
    }
  
    const loadMoreHandler = () =>{
      // callApiAgain();
    }
  
    useEffect(()=>{
      callApiAgain();
    },[tab==="e_learning_book" ])
  
    

  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">eBook</h5>
        <div
            className={
            keyword?.ELearningBook?.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
            :  ""
        }>
          {
            tab=="All" ? 
            (
              keyword?.ELearningBook?.map((item)=>{
              return <EbookCard data={item} />;})
            )
            :
            (
              eBookData?.map((item)=>{
                return <EbookCard data={item} />;})
            )

          }
        </div>
        {tab==="All" && keyword?.ELearningBook?.length === 3 && 
              (
                <div
                  onClick={searchHandler}
                  className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                >
                  See more
                </div>
              )
            
            }
            {tab==="e_learning_book" && eBookData?.length === 20 &&
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
export default BookContainer;
