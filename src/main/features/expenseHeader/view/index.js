import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import { addExpense, removeExpense, updateExpense } from "../store/actions";
import ExpenseHeaderForm from "./form.js";
import ExpenseHeaderTable from "./table.js";

export default function ExpenseHeader() {
  const initialState = { name: "", description: "" };
  const [expenseHeaders, setexpenseHeaders] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.expenseHeaderSlice);

  const handleDelete = (e) => {
    dispatch(removeExpense(e));
  };

  const onSubmit = (e) => {
    if (e.name === "" || e.description === "") {
      message.error("Please fill all required fields");
    } else {
      if (!e.id) {
        dispatch(addExpense(e));
        setexpenseHeaders(initialState);
        setClearButton(true);
        return;
      }
      dispatch(updateExpense(e));
      setexpenseHeaders(initialState);
    }
  };
  return (
    <AdminContainer>
      <ExpenseHeaderForm
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={expenseHeaders}
        onSubmit={onSubmit}
        loading={loader}
      />
      <ExpenseHeaderTable
        setClearButton={setClearButton}
        clearButton={clearButton}
        handleEdit={setexpenseHeaders}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
