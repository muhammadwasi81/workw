import React, { useContext, useState ,useEffect} from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import { groupsDictionaryList } from "../../../groups/localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import GridView from "../../../groups/view/GridView/GridView";
import { handleTab } from "../../store/slice";
import { getSearchGroup } from "../../store/actions";

function GroupContainer() {
  
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const {keyword ,tab ,GroupData } = useSelector((state) => state.globalSearchSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { groupsDictionary, Direction } = groupsDictionaryList[userLanguage];

  const navigate = useNavigate();
  
  const callApiAgain = () =>{
    dispatch(getSearchGroup({
      pageNo:1,
      pageSize: 20,
      search: searchQuery,
      filterType: 7,
    }))
  }

  const loadMoreHandler = () =>{
    // callApiAgain();
  }

  const searchHandler = () => {
    dispatch(handleTab("Group"))
    callApiAgain();
  };


  const handleClickNavigation = (id) => {
    navigate(`${ROUTES.GROUP.DEFAULT}/${id}`);
  };

  useEffect(()=>{
    callApiAgain();
   },[tab==="Group"])

  return (
      <>
        <div className="SearchMainContainer">
          <h5 className="containerHeading">Groups</h5>
          <GridView
                data={tab === "All" ? keyword?.Group : GroupData}
                // loading={getDataLoading}
                dispatch={dispatch}
                handleClickNavigation={handleClickNavigation}
                dictionary={groupsDictionary}
          />

          {tab==="All" && keyword?.Group?.length === 3 && 
            (
              <div
                onClick={searchHandler}
                className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
              >
                See more
              </div>
            )
          }   
          {tab==="Group" && GroupData?.length === 20 &&
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

export default GroupContainer;
