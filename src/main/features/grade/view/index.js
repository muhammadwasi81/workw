import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import { addGrade, removeGrade, updateGrade } from "../store/actions";
import GradeForm from "./form.js";
import GradeTable from "./table.js";

export default function Grade() {
  const initialState = { name: "", description: "" };
  const [grade, setGrade] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.gradeSlice);

  const handleDelete = (e) => {
    dispatch(removeGrade(e));
  };

  const onSubmit = (e) => {
    if (e.name === "" || e.description === "") {
      message.error("Please fill all required fields");
    } else {
      if (!e.id) {
        dispatch(addGrade(e));
        setGrade(initialState);
        setClearButton(true);
        return;
      }
      dispatch(updateGrade(e));
      setGrade(initialState);
    }
  };

  return (
    <AdminContainer>
      <GradeForm
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={grade}
        onSubmit={onSubmit}
        loading={loader}
      />
      <GradeTable
        handleEdit={setGrade}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
