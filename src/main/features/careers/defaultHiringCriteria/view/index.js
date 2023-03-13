import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../sharedComponents/Administration/StyledComponents/admin";
import {
  addDefaultHiringCriteria,
  getAllDefaultHiringCriteria,
  removeDefaultHiringCriteria,
  updateDefaultHiringCriteria,
} from "../store/actions";
import Form from "./form.js";
import TableView from "./table.js";

export default function DefaultHiringCriteria() {
  const initialState = { question: "" };
  const [defaultHiringCriteria, setDefaultHiringCriteria] = useState(
    initialState
  );
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();
  // const { loader } = useSelector((state) => state.payrollGroupSlice);

  const handleDelete = (e) => {
    dispatch(removeDefaultHiringCriteria(e));
  };

  const onSubmit = (e) => {
    if (e.question === "") {
      message.error("Question can't be empty");
    } else {
      if (!e.id) {
        dispatch(addDefaultHiringCriteria(e));
        dispatch(getAllDefaultHiringCriteria());
        setDefaultHiringCriteria(initialState);
        setClearButton(true);
        return;
      }
      dispatch(updateDefaultHiringCriteria(e));

      setDefaultHiringCriteria(initialState);
    }
  };
  return (
    <AdminContainer>
      <Form
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={defaultHiringCriteria}
        onSubmit={onSubmit}
      />
      <TableView
        handleEdit={setDefaultHiringCriteria}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
