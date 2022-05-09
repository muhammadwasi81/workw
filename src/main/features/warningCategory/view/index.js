import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
import { addWarningCategory, removeWarningCategory, updateWarningCategory } from "../store/actions";
import WarningCategoryForm from "./form.js";
import WarningCategoryTable from "./table.js";

export default function WargningCategory() {
  const initialState = { name: "", description: "" };
  const [warningCategory, setWarnigCategory] = useState(initialState);
  const [clearButton, setClearButton] = useState(false)


  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.warningCategorySlice);

  const handleDelete = (e) => {
    dispatch(removeWarningCategory(e));
  };

  const onSubmit = (e) => {
    if (!e.id) {
      dispatch(addWarningCategory(e));
      setWarnigCategory(initialState);
      setClearButton(true)
      return;
    }
    dispatch(updateWarningCategory(e));
    
    setWarnigCategory(initialState);
  };
  return (
    <AdminContainer>
      <WarningCategoryForm 
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={warningCategory}
        onSubmit={onSubmit}
        loading={loader}
      />
      <WarningCategoryTable
        handleEdit={setWarnigCategory}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
