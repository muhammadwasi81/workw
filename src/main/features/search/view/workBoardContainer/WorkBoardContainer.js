import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle";
import WorkBoardCard from "../../../workboard/Dashboard/WorkBoardCard";
import { Drawer } from "antd";
import BoardComposer from "../../../workboard/Composer/BoardComposer";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../../../workboard/localization";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import { resetComposerDetail } from "../../../workboard/store/slice";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
function WorkBoardContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, workBoard, createTextBtn } = WorkBoardDictionaryList;
  const searchQuery = searchParams.get("q");
  const {keyword} = useSelector((state) => state.globalSearchSlice);
  const workboardsListData = useSelector(
    (state) => state.trelloSlice.workboardsList
  );
  const isComposerVisible = useSelector(
    (state) => state.trelloSlice.isComposerVisible
  );
  const isComposerEdit = useSelector(
    (state) => state.trelloSlice.isComposerEdit
  );
  const loading = useSelector((state) => state.trelloSlice.loader);
  const success = useSelector((state) => state.trelloSlice.success);

  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/workboard?q=${searchQuery}`);
  };
  return (
    <>
    {
      keyword?.WorkBoard?.length > 0 ? (<div> <div className="SearchMainContainer">
      <h5 className="containerHeading">WorkBoard</h5>
      <CardWrapper2>
        {keyword?.WorkBoard?.slice(0, 4).map((data) => (
          <WorkBoardCard data={data} />
        ))}
      </CardWrapper2>
      {keyword?.WorkBoard?.length > 3 ? (<div
        onClick={searchHandler}
        className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
      >
        See more
      </div>):(<div></div>)}
    </div>
    <SideDrawer
      children={<BoardComposer isEdit={isComposerEdit} loading={loading} />}
      title={(isComposerEdit ? labels.Update : labels.Create) + " Board"}
      // buttonText={createTextBtn}
      isAccessDrawer={true}
      handleClose={() => {
        setTimeout(() => {
          dispatch(resetComposerDetail());
        }, 100);
      }}
      openDrawer={isComposerVisible}
      success={success}
    /></div>) : ( 
      <div className="SearchMainContainer">
      <NoDataFound/>
      </div>
   )
    }
     
    </>
  );
}
export default WorkBoardContainer;
