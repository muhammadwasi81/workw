import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import { groupsDictionaryList } from "../../../groups/localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import GridView from "../../../groups/view/GridView/GridView";

function GroupContainer() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const { userLanguage } = useContext(LanguageChangeContext);
  const { groupsDictionary, Direction } = groupsDictionaryList[userLanguage];
  const { groups, success, getDataLoading, drawerOpen, loader } = useSelector(
    (state) => state.groupSlice
  );
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/groups?q=${searchQuery}`);
  };
  const handleClickNavigation = (id) => {
    navigate(`${ROUTES.GROUP.DEFAULT}/${id}`);
  };

  return (
    <>
      <h5 className="containerHeading">Groups</h5>

      <GridView
        data={groups ? groups.slice(0, 4) : []}
        loading={getDataLoading}
        dispatch={dispatch}
        handleClickNavigation={handleClickNavigation}
        dictionary={groupsDictionary}
      />

      <div
        onClick={searchHandler}
        className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
      >
        See more
      </div>
    </>
  );
}

export default GroupContainer;
