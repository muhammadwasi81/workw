import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
import GradeForm from "./form.js";
import GradeTable from "./table.js";
import {
  addDepartmentAppraisalQuestion,
  getAllDepartmentAppraisalQuestion,
  updateDepartmentAppraisalQuestion,
} from "../store/actions";
import { createGuid } from "../../../../utils/base";

export default function Appraisal() {
  const initialState = { question: "" };
  const [question, setQuestion] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();
  const { loader, departmentDetail } = useSelector(
    (state) => state.departmentSlice
  );
  const questionId = createGuid();
  const handleDelete = (e) => {
    // dispatch(removeGrade(e));
    console.log("handle delete done");
  };

  useEffect(() => {
    console.log(departmentDetail.id);
    if (departmentDetail.id) {
      dispatch(getAllDepartmentAppraisalQuestion(departmentDetail.id));
      console.log("dispatch get all appraisal questions");
    }
  }, []);

  const onSubmit = (e) => {
    console.log("on submit event", e);
    if (!e.id) {
      dispatch(
        addDepartmentAppraisalQuestion({
          id: questionId,
          departmentId: departmentDetail.id,
          question: e.question,
          isDefault: true,
        })
      );
    }
    console.log("dispatch update");
    dispatch(
      updateDepartmentAppraisalQuestion({
        id: e.id,
        departmentId: departmentDetail.id,
        question: e.question,
        isDefault: true,
      })
    );
    setQuestion(initialState);
    setClearButton(true);
    return;
    // dispatch(updateGrade(e));

    // setGrade(initialState);
  };
  return (
    <AdminContainer>
      <GradeForm
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={question}
        onSubmit={onSubmit}
        loading={loader}
      />
      <GradeTable
        handleEdit={setQuestion}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
