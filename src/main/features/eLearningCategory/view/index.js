import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
import { addELearningCategory, updateELearningCategory,removeELearningCategory } from "../store/action";
import ELearningCategoryForm from "./form.js";
import ELearningCategoryTable from "./table.js";

export default function ELearningCategory() {
  const initialState = { name: "", description: "" };
  const [grade, setGrade] = useState(initialState);
  const [clearButton, setClearButton] = useState(false)


  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.ELearningCategorySlice);

  const handleDelete = (e) => {
    dispatch(removeELearningCategory(e));
  };

  const onSubmit = (e) => {
    if (e.name === "" || e.description === "") {
      message.error("Please fill all required fields")
    } else {
      if (!e.id) {
        dispatch(addELearningCategory(e));
        setGrade(initialState);
        setClearButton(true)
        return;
      }
      dispatch(updateELearningCategory(e));
      setGrade(initialState);
    }
  };

  return (
    <AdminContainer>
      <ELearningCategoryForm clearButton={clearButton} setClearButton={setClearButton} 
           data={grade} onSubmit={onSubmit} loading={loader} />
      <ELearningCategoryTable
        handleEdit={setGrade}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
