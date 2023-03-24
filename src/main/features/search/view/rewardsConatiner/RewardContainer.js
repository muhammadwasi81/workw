import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
import DetailedView from "../../../reward/view/DetailedView";
import ListItem from "../../../reward/view/ListItem";

function RewardContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [detailId, setDetailId] = useState(false);

  const searchQuery = searchParams.get("q");
  const navigate = useNavigate();
  const { rewards, loader, drawerOpen } = useSelector(
    (state) => state.rewardSlice
  );

  const searchHandler = () => {
    navigate(`/rewards?q=${searchQuery}`);
  };
  const onClose = () => {
    setDetailId(null);
  };

  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Rewards</h5>
        <CardWrapper>
          {rewards.slice(0, 4).map((item, index) => {
            return (
              <>
                <ListItem
                  item={item}
                  id={item.id}
                  key={index}
                  onClick={() => setDetailId(item.id)}
                />
              </>
            );
          })}
        </CardWrapper>
        <div
          onClick={searchHandler}
          className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
        >
          See more
        </div>
      </div>
      {<DetailedView onClose={onClose} id={detailId} />}
    </>
  );
}

export default RewardContainer;
