import React from "react";
import ListItem from "./ListItem";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";
import {
  OpenDetailView,
  CloseDetailView,
} from "../../../../store/appReducer/resignationSlice";

const ListView = () => {
  const dispatch = useDispatch();
  const getRewardId = (id) => {
    dispatch(OpenDetailView(id));
  };

  return (
    <CardWrapper>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <ListItem id={item} getRewardId={getRewardId} />
      ))}
    </CardWrapper>
  );
};

export default ListView;
