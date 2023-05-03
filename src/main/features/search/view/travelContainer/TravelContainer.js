import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { TravelDictionary } from "../../../travel/localization";
import ListView from "../../../travel/view/ListView/ListView";
import { SearchFilterEnum } from "../../utils/enums";
import SearchFilter from "../../utils/searchFilter";

function TravelContainer() {
  console.log(SearchFilter, "serchhhh");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const {keyword} = useSelector((state) => state.globalSearchSlice);
  const { travels, loader, success, isAdded } = useSelector(
    (state) => state.travelSlice
  );
  const { userLanguage } = useContext(LanguageChangeContext);
  const { TravelDictionaryList, Direction } = TravelDictionary[userLanguage];
  const { topBar, headings, table } = TravelDictionaryList;
  const searchQuery = searchParams.get("q");

  const searchHandler = () => {
    setSeeMore(!seeMore);
    navigate(`/travel?f=trv?q=${searchQuery}`);
  };
  useEffect(() => {
    if (SearchFilterEnum.Travel) {
      return SearchFilter("travel");
    }
  }, []);

  const [seeMore  , setSeeMore ] = useState(false);
  return (
    <>
    {
      keyword?.Travel?.length > 0  ?  ( <div className="SearchMainContainer">
      <h5 className="containerHeading">Travel</h5>
      <ListView
        data={keyword?.Travel ? keyword?.Travel?.slice(0, 4) : []}
        // loader={loader}
        labels={headings}
      />
        {keyword?.Travel?.length > 3 ? (<div
        onClick={searchHandler}
        className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
      >
        See more
      </div>):(<div></div>)} 
    </div>) : (<div><div className="SearchMainContainer">
      <h5 className="containerHeading"></h5>
      <div></div>
      </div></div>)
    }
  
    </>
  );
}
export default TravelContainer;
