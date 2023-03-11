import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import {
  addRebateCategory,
  removeRebateCategoryAction,
  updateRebateCategory,
} from "../store/actions";
import RebateCategoryTable from "./table.js";
import RebateCategoryForm from "./form";
import { message } from "antd";

export default function AssetsCategory() {
  const initialState = {
    name: "",
    maxPercentage: "",
    maxAmount: "",
    rebateType: "",
  };
  const [rebateCategories, setRebateCategories] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.rebateCategorySlice);

  const handleDelete = (e) => {
    dispatch(removeRebateCategoryAction(e));
  };

  const onSubmit = (e) => {
    if (e.name === "" || e.description === "") {
      message.error("Please fill required fields");
    } else {
      if (!e.id) {
        dispatch(addRebateCategory(e));
        setRebateCategories(initialState);
        setClearButton(true);
        return;
      }
      dispatch(updateRebateCategory(e));
      setRebateCategories(initialState);
    }
  };

  return (
    <AdminContainer>
      <RebateCategoryForm
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={rebateCategories}
        onSubmit={onSubmit}
        loading={loader}
      />
      <RebateCategoryTable
        handleEdit={setRebateCategories}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
