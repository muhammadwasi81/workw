import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../../components/HrMenu/Administration/StyledComponents/admin";
import { removeRewardCategory, addRewardCategory, updateRewardCategory } from "../store/actions";
import RewardCategoryForm from "./form.js";
import RewardCategoryTable from "./table.js";

export default function RewardCategory() {
  const initialState = { name: "", description: "" };
  const [rewardCategory, setRewardCategory] = useState(initialState);
  const [clearButton, setClearButton] = useState(false)

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.rewardCategorySlice);

  const handleDelete = (e) => {
    dispatch(removeRewardCategory(e));
  };

  const onSubmit = (e) => {
    if (!e.id) {
      dispatch(addRewardCategory(e));
      setRewardCategory(initialState);
      setClearButton(true)
      return;
    }
    dispatch(updateRewardCategory(e));
    setRewardCategory(initialState);
  };
  return (
    <AdminContainer>
      <RewardCategoryForm 
        clearButton={clearButton} 
        setClearButton={setClearButton} 
        data={rewardCategory} 
        onSubmit={onSubmit} 
        loading={loader} 
      />
      <RewardCategoryTable 
         setClearButton={setClearButton}
         clearButton={clearButton}
        handleEdit={setRewardCategory}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
