import React from "react";
import ListItem from "./ListItem";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";

function RewardContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const navigate = useNavigate();
  const { rewards, loader, drawerOpen } = useSelector(
    (state) => state.rewardSlice
  );
  const displayCount = 4;
  const filteredCards = rewards.slice(0, displayCount);
  const searchHandler = () => {
    navigate(`/rewards?q=${searchQuery}`);
  };
  return (
    <>
      {/* <div className="SearchMainContainer"> */}
      <h5 className="containerHeading">Rewards</h5>
      {/* <div className="groupContainer"> */}
      <CardWrapper>
        {filteredCards.map((data) => (
          <ListItem data={data} />
        ))}
      </CardWrapper>
      {/* </div> */}
      <div
        onClick={searchHandler}
        className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
      >
        See more
      </div>
      {/* </div> */}
    </>
  );
}

export default RewardContainer;
