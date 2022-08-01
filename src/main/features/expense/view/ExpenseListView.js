import React, { useContext, useEffect, useState } from "react";
import ExpenseDetail from "./ExpenseDetail";
import ExpenseList from "./ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpense } from "../store/actions";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { ExpenseDictionary } from "../localization";

function ExpenseListView({ filterType }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = ExpenseDictionary[userLanguage];

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { expenses, loader } = useSelector((state) => state.expenseSlice);
  const [id, setId] = useState("");
  useEffect(() => {
    dispatch(
      getAllExpense({
        pageNo: 1,
        pageSize: 20,
        filterType,
      })
    );
  }, [filterType]);

  const handleDrawerClose = () => {
    setVisible(false);
  };
  const handleExpense = (id) => {
    setId(id);
    setVisible(true);
  };
  if (!loader) return <div>Loading</div>;
  return (
    <div className="expenseCardWrapper" style={{ direction: Direction }}>
      {expenses.map((expense, index) => {
        return (
          <ExpenseList
            key={index}
            onExpense={handleExpense}
            expense={expense}
          />
        );
      })}
      <ExpenseDetail
        direction={Direction}
        visible={visible}
        onClose={handleDrawerClose}
        id={id}
      />
    </div>
  );
}

export default ExpenseListView;
