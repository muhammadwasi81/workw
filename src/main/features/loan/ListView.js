import React from "react";
import ListItem from "./ListItem";
import { useSelector, useDispatch } from "react-redux";
import { CardWrapper } from "../../sharedComponents/Card/CardStyle";
import { GetLoanById } from "../../../store/appReducer/loanSlice";

const ListView = () => {
  const items = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
  ];

  const dispatch = useDispatch();

  const getLoanById = (id) => {
    dispatch(GetLoanById(id));
  };
  return (
    <CardWrapper>
      {items.map((item) => (
        <ListItem getLoanById={getLoanById} id={item.id} />
      ))}
    </CardWrapper>
  );
};

export default ListView;
