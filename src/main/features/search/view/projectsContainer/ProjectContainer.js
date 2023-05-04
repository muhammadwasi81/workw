import React, { useContext, useState ,useEffect} from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle";
import ListItem from "../../../projects/UI/ListItem";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import { getSearchProject } from "../../store/actions";
import { handleTab } from "../../store/slice";

function ProjectContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchQuery = searchParams.get("q");
  const {keyword , tab, ProjectData} = useSelector((state) => state.globalSearchSlice);
  
  const searchHandler = () => {
    dispatch(handleTab("Project"))
    callApiAgain();
    
  };

  const callApiAgain = () =>{
    dispatch(getSearchProject({
      pageNo:1,
      pageSize: 20,
      search: searchQuery,
      filterType: 5,
    }))
  }
  const loadMoreHandler = () =>{
    // callApiAgain();
   }
  useEffect(()=>{
    callApiAgain();
   },[tab==="Project"])

  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Project</h5>
          <CardWrapper2>
            {
              tab==="All" ? 
              (
                keyword?.Project?.map((item, index) => {
                  return <ListItem item={item} id={item.id} key={index} />;
                })
              )
              :
              (
                ProjectData?.map((item, index) => {
                  return <ListItem item={item} id={item.id} key={index} />;
                })
              )
            }
          </CardWrapper2>
      
          {tab==="All" && keyword?.Project?.length === 3 && 
              (
                <div
                  onClick={searchHandler}
                  className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                >
                  See more
                </div>
              )
            
          }
           {tab==="Project" && ProjectData?.length === 20 &&
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
export default ProjectContainer;
