import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import Scroll from "../../../../sharedComponents/ScrollSelect/infinteScoll";
import PostItem from "../../../feed/ui/posts_list/post/index"
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import { handleTab } from "../../store/slice";
import { globalSearch } from "../../store/actions";
function FeedContainer(){

    const [searchParams, setSearchParams] = useSearchParams();
    const [pageNo , setPageNo] = useState(1);
    const dispatch = useDispatch();
    const searchQuery = searchParams.get("q");
    console.log("QueryParams",searchQuery);
    const {keyword , tab} = useSelector((state) => state.globalSearchSlice);
    console.log(keyword, "keyword")
    const navigate = useNavigate();
    const searchHandler = () => {
      console.log('see more')
      dispatch(handleTab("feed"))
    };

    const handleScroll = () => {
      console.log("calll")
      document.body.style.background = "red"
     

      // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // const scrollHeight = Math.max(
      //   document.documentElement.scrollHeight,
      //   document.body.scrollHeight
      // );
      // const clientHeight = document.documentElement.clientHeight;
      // if (scrollTop + clientHeight >= scrollHeight) {
      //   // User has scrolled to the bottom
       
      //   dispatch(
      //     globalSearch({
      //       pageNo,
      //       pageSize: 20,
      //       search: searchQuery,
      //       filterType: 0,
      //     })
      //   );
      //   setPageNo(pageNo+1);
      // }
    };


    useEffect(() => {
      console.log("Called")
      document.body.style.background = "blue"
      // Attach scroll event listener when component mounts
      window.addEventListener("keydown", handleScroll);
      return () => {
        // Remove scroll event listener when component unmounts
        window.removeEventListener("keydown", handleScroll);
      };
    }, [handleScroll]); // Empty dependency array to only run effect on mount and unmount

    
    // useEffect(()=>{
    //   const promise = dispatch(
    //     globalSearch({
    //       pageNo,
    //       pageSize: 20,
    //       search: searchQuery,
    //       filterType: 0,
    //     })
    //   );

    //   return ()=>{
    //       promise.abort();
    //     }
    // },[pageNo])
    return (
        <>
          <div className="SearchMainContainer">
            <h5 className="containerHeading">Post</h5>
              <div className={
                keyword?.Feed?.length > 0
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2"
                  :  ""
              }>
                <Scroll
                  // isLoading={feedSlice.allFeed.loading}
                  data={keyword?.Feed}
                  // fetchMoreData={pageNo => {
                  //   setPageNo(pageNo+1);
                  // }}
                  // loader={<PostSkeleton />}
                  // endMessage={"No more posts..."}
                >
                  {/* Need to Remove static value , will take for enum */}
                  {keyword?.Feed?.map((post, index) => (
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
                <div></div>
              )
            }
          </div>
        </>
      );
}

export default FeedContainer;