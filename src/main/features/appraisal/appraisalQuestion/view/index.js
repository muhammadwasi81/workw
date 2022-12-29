import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../../components/HrMenu/Administration/StyledComponents/admin";
import { addQuestion, removeQuestion, updateQuestion } from "../store/actions";
import AppraisalForm from "./form.js";
import AppraisalTable from "./table.js";
import { message } from "antd";

export default function Appraisal() {
  const initialState = { name: "", description: "" };
  const [question, setQuestion] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.appraisalSlice);

  const handleDelete = (e) => {
    dispatch(removeQuestion(e));
  };

  const onSubmit = (e) => {
    if (!e.description) {
      return message.error(`Please fill all the fields`);
    } else if (!e.id) {
      dispatch(addQuestion(e));
      setQuestion(initialState);
      setClearButton(true);
      return;
    }
    dispatch(updateQuestion(e));
    setQuestion(initialState);
  };

  return (
    <AdminContainer>
      <AppraisalForm
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={question}
        onSubmit={onSubmit}
      />
      <AppraisalTable
        setClearButton={setClearButton}
        clearButton={clearButton}
        handleEdit={setQuestion}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
