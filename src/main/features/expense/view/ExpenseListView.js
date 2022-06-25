import React, { useState } from "react";
import ExpenseDetail from "./ExpenseDetail";
import ExpenseList from "./ExpenseList";

function ExpenseListView() {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const handleDrawerClose = () => {
    setVisible(false);
  };
  const handleExpense = (id) => {
    setVisible(true);
    setId(id);
  };
  return (
    <div className="expenseCardWrapper">
      <ExpenseList onExpense={handleExpense} />
      <ExpenseList onExpense={handleExpense} />
      <ExpenseList onExpense={handleExpense} />
      <ExpenseList onExpense={handleExpense} />
      <ExpenseList onExpense={handleExpense} />
      <ExpenseList onExpense={handleExpense} />
      <ExpenseList onExpense={handleExpense} />
      <ExpenseDetail visible={visible} onClose={handleDrawerClose} id={id} />
    </div>
  );
}

export default ExpenseListView;
