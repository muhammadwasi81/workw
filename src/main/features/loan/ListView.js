import React, { useContext, useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useSelector, useDispatch } from "react-redux";
import { CardWrapper } from "../../sharedComponents/Card/CardStyle";
// import { GetLoanById } from "../../../store/appReducer/loanSlice";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { ExpenseDictionary, LoanDictionary } from "./localization";
import { getAllLoans } from "./store/actions";
import { Skeleton } from "antd";
import Notdata from "../../../content/NewContent/eLearning/Nodata.svg";
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
    <>
      <div className="loanCardWrapper" style={{ direction: Direction }}>
        {loader ? (
          [...Array(15)].map((item) => (
            <Skeleton key={item} avatar paragraph={{ rows: 6 }} />
          ))
        ) : (
          <>
            {loanList.length === 0
              ? null
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
          </>
        )}

        <DetailedView id={id} visible={visible} onClose={handleDrawerClose} />
      </div>
      {!loader && loanList.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <img src={Notdata} className="h-96 w-96" alt="Not-found" />
        </div>
      )}
    </>
  );
};

export default ListView;
