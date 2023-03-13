import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../sharedComponents/Administration/StyledComponents/admin";
import {
  addComplainCategory,
  removeComplainCategory,
  updateComplainCategory,
} from "../store/actions";
import Form from "./form.js";
import TableView from "./table.js";

export default function ComplainCategory() {
  const initialState = { name: "", description: "" };
  const [complainCategory, setComplainCategory] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.complainCategorySlice);

  const handleDelete = (e) => {
    dispatch(removeComplainCategory(e));
  };

  const onSubmit = (e) => {
    if (e.name === "" || e.description === "") {
      message.error("Please fill required fields");
    } else {
      if (!e.id) {
        dispatch(addComplainCategory(e));
        setComplainCategory(initialState);
        setClearButton(true);
        return;
      }
      dispatch(updateComplainCategory(e));
      setComplainCategory(initialState);
    }
  };

  return (
    <AdminContainer>
      <Form
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={complainCategory}
        onSubmit={onSubmit}
        loading={loader}
      />
      <TableView
        handleEdit={setComplainCategory}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
