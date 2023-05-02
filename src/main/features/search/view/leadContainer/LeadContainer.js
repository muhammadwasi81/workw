import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import GridView from "../../../leadmanager/view/Dashboard/GridView/GridView";
import { LeadManagerDictionary } from "../../../leadmanager/localization";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import BoardComposer from "../../../leadmanager/view/Composer/BoardComposer";
import { handleComposer } from "../../../leadmanager/store/slice";
import { Drawer } from "antd";
import { SearchFilterEnum } from "../../utils/enums";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import SearchFilter from "../../utils/searchFilter";

function LeadContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
   const {keyword} = useSelector((state) => state.globalSearchSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchQuery = searchParams.get("q");

  const { userLanguage } = useContext(LanguageChangeContext);
  const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
    userLanguage
  ];
  const leadManagerData = useSelector(
    (state) => state.leadMangerSlice.leadManagersData
  );
  const { loading, isComposerOpen, isEditComposer } = useSelector(
    (state) => state.leadMangerSlice
  );
  const handleClickNavigation = (id) => {
    navigate(`${ROUTES.LEAD_MANAGER.LEAD_GROUP_DETAIL}${id}`);
  };
  const searchHandler = () => {
    navigate(`/leadManager?q=${searchQuery}`);
  };
  const handleEditComposer = () => {
    dispatch(handleComposer({ isOpen: false, isEdit: false }));
  };
  // useEffect(() => {
  //   if (SearchFilterEnum.Lead) {
  //     return SearchFilter(SearchFilterEnum.Lead);
  //   }
  // }, []);
  return (
    <>
    {
      keyword?.Lead?.length > 0 ? ( <div>
        <div className="SearchMainContainer">
          <h5 className="containerHeading">Lead Manager</h5>
          <GridView
            data={keyword?.Lead ? keyword?.Lead?.slice(0, 4) : []}
            // loading={loading}
            dispatch={dispatch}
            handleClickNavigation={handleClickNavigation}
            dictionary={LeadManagerDictionaryList}
          />
          {
            keyword?.Lead?.length > 3 ? (<div
              onClick={searchHandler}
              className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
            >
              See more
            </div>) : (<></>)
          }
          
        </div>
        <Drawer
          open={isComposerOpen}
          width={"786px"}
          onClose={handleEditComposer}
          title={"Update Lead Manager"}
          className={"shared_drawer drawerSecondary"}
        >
          <BoardComposer isEdit={isEditComposer} loading={loading} />
        </Drawer>
        </div>) : (<div className="SearchMainContainer">
          <div><NoDataFound/></div></div>
    )
    }
   
    </>
  );
}
export default LeadContainer;
