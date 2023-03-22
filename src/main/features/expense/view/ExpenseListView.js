import React, { useContext, useEffect, useState } from "react";
import ExpenseDetail from "./ExpenseDetail";
import ExpenseList from "./ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpense } from "../store/actions";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { ExpenseDictionary } from "../localization";
import { clearExpense } from "../store/slice";
import { Skeleton } from "antd";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import ExpenseDetailsComposer from "./ExpenseDetailsComposer";
import { ExpenseReferenceTypeEnum } from "../enums";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";
import { ContBody } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";


function ExpenseListView({
  filterType,
  referenceId = ExpenseReferenceTypeEnum.General,
  referenceType = defaultUiid,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = ExpenseDictionary[userLanguage];

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { expenses, loader, drawerOpen } = useSelector(
    (state) => state.expenseSlice
  );
  console.log(expenses, "Drawer open in expense");
  const [id, setId] = useState("");
  useEffect(() => {
    dispatch(
      getAllExpense({
        pageNo: 1,
        pageSize: 20,
        filterType,

        referenceType,
        referenceId,
      })
    );
  }, [filterType]);

  const handleDrawerClose = () => {
    setVisible(false);
    dispatch(clearExpense());
  };
  const handleExpense = (id) => {
    setId(id);
    setVisible(true);
  };

  return (
    <>
      {/* {loader
        ? [...Array(3)].map((item) => (
            <Skeleton key={item} avatar paragraph={{ rows: 6 }} />
          )): */}
            {expenses?.length > 0 && !loader ? (  
            <CardWrapper>
              {expenses?.map((expense, index) => {
                return (
                  <ExpenseList
                    key={index}
                    onExpense={handleExpense}
                    expense={expense}
                  />
                );
              })}
          </CardWrapper>
          ) : !loader && <NoDataFound />
        } 
    
      <ExpenseDetailsComposer
        direction={Direction}
        visible={visible}
        onClose={handleDrawerClose}
        id={id}
      />
    </>
  );
}

export default ExpenseListView;
