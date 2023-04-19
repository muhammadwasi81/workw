import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import Scroll from "../../../../sharedComponents/ScrollSelect/infinteScoll";
import PostItem from "../../../feed/ui/posts_list/post/index"
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
function FeedContainer(){

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");
    const {keyword} = useSelector((state) => state.globalSearchSlice);
    const navigate = useNavigate();
    const searchHandler = () => {
      navigate("/search/feed")
      // navigate(`/eLearning?q=${searchQuery}`);
    };

    return (
        <>
        {
            keyword?.Feed?.length > 0 ? (<div>  <div className="SearchMainContainer">
            <h5 className="containerHeading">Post</h5>
            <div className={
          keyword.ELearningTedTalks?.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
            :  ""
        }>
              <Scroll
                // isLoading={feedSlice.allFeed.loading}
                data={keyword?.Feed}
                // fetchMoreData={pageNo => {
                //   setPageNo(pageNo);
                // }}
                // loader={<PostSkeleton />}
                // endMessage={"No more posts..."}
              >
                {/* Need to Remove static value , will take for enum */}
                {keyword?.Feed?.slice(0,4).map((post, index) => (
                  <PostItem
                    key={index}
                    post={post}
                    viewAllComments={true}
                    referenceType={1}
                    referenceId={'00000000-0000-0000-0000-000000000000'}
                    reactionModule={1}
                  />
                ))}
				      </Scroll>
            </div>
            {keyword?.Feed?.length>3 ? (<div
              onClick={searchHandler}
              className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
            >
              See more
            </div>):( <div></div> )}
            
          </div></div>) :  (<div className="SearchMainContainer">
          <div><NoDataFound/></div></div>
    )
        }
        
        </>
      );
}

export default FeedContainer;