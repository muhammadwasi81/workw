import React, { useContext, useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useSelector, useDispatch } from "react-redux";
import { CardWrapper } from "../../sharedComponents/Card/CardStyle";
// import { GetLoanById } from "../../../store/appReducer/loanSlice";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { ExpenseDictionary, LoanDictionary } from "./localization";
import { getAllLoans } from "./store/actions";
import { Skeleton } from "antd";
import { ContBody } from "../../sharedComponents/AppComponents/MainFlexContainer";
import DetailedView from "./DetailedView";

const ListView = ({ filter }) => {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = LoanDictionary[userLanguage];
  const [id, setId] = useState();
  const [visible, setVisible] = useState(false);
  const { loanList, loader } = useSelector((state) => state.loanSlice);

  const handleDrawerClose = () => {
    setVisible(false);
  };

  const handleDrawerOpen = (id) => {
    setVisible(true);
    setId(id);
    console.log("id", id);
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

  return (
    <div className="loanCardWrapper" style={{ direction: Direction }}>
      {loader
        ? [...Array(3)].map((item) => (
            <Skeleton key={item} avatar paragraph={{ rows: 6 }} />
          ))
        : loanList.map((item) => {
            return (
              <ListItem
                id={item.id}
                item={item}
                onListItem={handleDrawerOpen}
                visible={visible}
              />
            );
          })}
      <DetailedView id={id} visible={visible} onClose={handleDrawerClose} />
    </div>
  );

  // if (loader)
  //   return [...Array(6)].map((item) => (
  //     <>
  //       <Skeleton avatar />
  //     </>
  //   ));
  // return (
  //   <CardWrapper>
  //     {loanList.map((item) => (
  //       // console.log(item)
  //       <ListItem id={item.id} item={item} onListItem={handleDrawerOpen} />
  //     ))}
  //     <DetailedView visible={visible} onClose={handleDrawerClose} />
  //   </CardWrapper>
  // );
};

export default ListView;
