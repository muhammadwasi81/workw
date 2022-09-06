import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useSelector, useDispatch } from "react-redux";
import { CardWrapper } from "../../sharedComponents/Card/CardStyle";
import { GetLoanById } from "../../../store/appReducer/loanSlice";
import { getAllLoans } from "./store/actions";
import { Skeleton } from "antd";

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
  const { loanList, loader } = useSelector((state) => state.loanSlice);

  console.log(loanList, "loan data from list view");
  console.log("loader", loader);
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
  if (loader)
    return [...Array(6)].map((item) => (
      <>
        {console.log("array console skeleton")}
        <Skeleton avatar />
      </>
    ));
  return (
    // <CardWrapper>
    //   {loanData.map((item) => (
    //     <Skeleton key={item.id} avatar />
    //   ))}
    // </CardWrapper>

    <CardWrapper>
      {loanList.map((item) => (
        <ListItem getLoanById={getLoanById} id={item.id} item={item} />
      ))}
    </CardWrapper>
  );
};

export default ListView;
