import React, { useEffect, useState } from "react";
import ExpenseDetail from "./ExpenseDetail";
import ExpenseList from "./ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpense } from "../store/actions";

function ExpenseListView() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { expenses, loader } = useSelector((state) => state.expenseSlice);
  const [id, setId] = useState("");
  useEffect(() => {
    dispatch(
      getAllExpense({
        pageNo: 1,
        pageSize: 20,
        filterType: 1,
      })
    );
  }, []);

  const handleDrawerClose = () => {
    setVisible(false);
  };
  const handleExpense = (id) => {
    setId(id);
    setVisible(true);
  };
  if (!loader) return <div>Loading</div>;
  return (
    <div className="expenseCardWrapper">
      {expenses.map((expense, index) => {
        return (
          <ExpenseList
            key={index}
            onExpense={handleExpense}
            expense={expense}
          />
        );
      })}
      <ExpenseDetail visible={visible} onClose={handleDrawerClose} id={id} />
    </div>
  );
}

export default ExpenseListView;
