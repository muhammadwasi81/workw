import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import ListItem from "./ListItem";
import GroupsCard from "../../../groups/view/GridView/GridView";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import { groupsDictionaryList } from "../../../groups/localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle";
import DashboardCardLayout from "../../../groups/view/UI/DashboardCard/DashboardCardLayout";

function RewardContainer() {
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

  const displayCount = 4;
  const filteredCards = groups.slice(0, displayCount);
  console.log(filteredCards, "filterrr");
  return (
    <>
      <h5 className="containerHeading">Groups</h5>

      <CardWrapper2>
        {filteredCards.map((data) => (
          <ListItem data={data} />
        ))}
      </CardWrapper2>

      <div
        onClick={searchHandler}
        className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
      >
        See more
      </div>
    </>
  );
}

export default RewardContainer;
