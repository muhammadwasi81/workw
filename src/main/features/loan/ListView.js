import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useSelector, useDispatch } from "react-redux";
import { CardWrapper } from "../../sharedComponents/Card/CardStyle";
import { GetLoanById } from "../../../store/appReducer/loanSlice";
import { getAllLoans } from "./store/actions";

const ListView = () => {
  // const items = [
  //   {
  //     id: 1,
  //   },
  //   {
  //     id: 2,
  //   },
  //   {
  //     id: 3,
  //   },
  //   {
  //     id: 4,
  //   },
  //   {
  //     id: 5,
  //   },
  //   {
  //     id: 6,
  //   },
  //   {
  //     id: 7,
  //   },
  // ];

  const dispatch = useDispatch();
  const loanData = useSelector((state) => state.loanSlice.loanList);
  console.log(loanData, "loan data from list view");
  const getLoanById = (id) => {
    dispatch(GetLoanById(id));
  };

  useEffect(() => {
    dispatch(
      getAllLoans({
        pageNo: 1,
        pageSize: 20,
        search: "",
        approverStatus: [],
        filterType: 0,
        sortBy: 1,
      })
    );
  }, []);

  return (
    <CardWrapper>
      {loanData.map((item) => (
        <ListItem getLoanById={getLoanById} id={item.id} item={item} />
      ))}
    </CardWrapper>
  );
};

export default ListView;
