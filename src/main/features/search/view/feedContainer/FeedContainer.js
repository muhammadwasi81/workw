import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import PostItem from "../../../feed/ui/posts_list/post/index"
import { handleTab } from "../../store/slice";
import { getSearchFeed, globalSearch } from "../../store/actions";

function FeedContainer(){

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [pageNo , setPageNo] = useState(1);
    const searchQuery = searchParams.get("q");
    const [AllFeedData , setAllFeedData] = useState([]);
    const {keyword , tab ,FeedData} = useSelector((state) => state.globalSearchSlice);
    const navigate = useNavigate();
    
    const searchHandler = () => {
      dispatch(handleTab("feed"))
      callApiAgain();
      
    };

    const callApiAgain = (pageNo=1,pageSize=20) =>{
      dispatch(getSearchFeed({
        pageNo:pageNo,
        pageSize: pageSize,
        search: searchQuery,
        filterType: 1,
      }))
    }
    
    
    const loadMoreHandler = () =>{
      // setPageNo(pageNo+1);
      // callApiAgain(pageNo);
    }
    
    useEffect(()=>{
      if(tab === "feed") {
        callApiAgain();
        // setAllFeedData([ ...AllFeedData  , ...FeedData])
      }
    },[tab === "feed"])
    
    useEffect(()=>{
      if(tab==="feed")
      {
        // setAllFeedData([ ...AllFeedData  , ...FeedData])
      }
    },[pageNo])
    
    return (
      <>
          <div className="SearchMainContainer">
            <h5 className="containerHeading">Post</h5>
              <div className={
                FeedData?.length > 0
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
                  :  ""
              }>
                {/* Static Value need to be Removed */}
                {
                  tab==="All" ? 
                  (
                    keyword?.Feed?.map((post, index) => (
                      <PostItem
                        key={index}
                        post={post}
                        viewAllComments={true}
                        referenceType={1}
                        referenceId={'00000000-0000-0000-0000-000000000000'}
                        reactionModule={1}
                      />
                    ))
                  )
                  :
                  (
                    FeedData?.map((post, index) => (
                      <PostItem
                        key={index}
                        post={post}
                        viewAllComments={true}
                        referenceType={1}
                        referenceId={'00000000-0000-0000-0000-000000000000'}
                        reactionModule={1}
                      />
                    ))
                  )
                } 
            </div>
            {tab==="All" && keyword?.Feed?.length === 3 && 
              (
                <div
                  onClick={searchHandler}
                  className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                >
                  See more
                </div>
              )
            
            }
            {tab==="feed" && FeedData?.length === 20 &&
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

export default FeedContainer;