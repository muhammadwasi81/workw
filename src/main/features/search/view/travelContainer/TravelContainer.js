import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { TravelDictionary } from "../../../travel/localization";
import ListView from "../../../travel/view/ListView/ListView";

function TravelContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { travels, loader, success, isAdded } = useSelector(
    (state) => state.travelSlice
  );
  const { userLanguage } = useContext(LanguageChangeContext);
  const { TravelDictionaryList, Direction } = TravelDictionary[userLanguage];
  const { topBar, headings, table } = TravelDictionaryList;
  const searchQuery = searchParams.get("q");

  const searchHandler = () => {
    navigate(`/travel?f=trv?q=${searchQuery}`);
  };
  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Travel</h5>

        <ListView
          data={travels ? travels.slice(0, 4) : []}
          loader={loader}
          labels={headings}
        />
        <div
          onClick={searchHandler}
          className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
        >
          See more
        </div>
      </div>
    </>
  );
}
export default TravelContainer;
