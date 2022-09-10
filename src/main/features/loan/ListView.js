import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useSelector, useDispatch } from "react-redux";
import { CardWrapper } from "../../sharedComponents/Card/CardStyle";
// import { GetLoanById } from "../../../store/appReducer/loanSlice";
import { getAllLoans } from "./store/actions";
import { Skeleton } from "antd";
import DetailedView from "./DetailedView";

const ListView = ({ filter }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { loanList, loader } = useSelector((state) => state.loanSlice);

  const handleDrawerClose = () => {
    setVisible(false);
  };

  const handleDrawerOpen = () => {
    setVisible(true);
  };
  useEffect(() => {
    dispatch(
      getAllLoans({
        pageNo: 1,
        pageSize: 20,
        search: "",
        approverStatus: [],
        filterType: filter.filterType,
        sortBy: 1,
      })
    );
  }, [filter.filterType]);

  if (loader)
    return [...Array(6)].map((item) => (
      <>
        <Skeleton avatar />
      </>
    ));
  return (
    <CardWrapper>
      {loanList.map((item) => (
        <ListItem id={item.id} item={item} onListItem={handleDrawerOpen} />
      ))}
      <DetailedView visible={visible} onClose={handleDrawerClose} />
    </CardWrapper>
  );
};

export default ListView;
