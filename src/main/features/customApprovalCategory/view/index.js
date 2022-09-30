import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
import { addCustomApprovalCategory, removeCustomApprovalCategory, updateCustomApprovalCategory } from "../store/actions";
import CustomApprovalCategoryForm from "./form.js";
import CustomApprovalCategoryTable from "./table.js";

export default function CustomApprovalCategory() {
  const initialState = { name: "", description: "" };
  const [customApprovalCategory, setcustomApprovalCategory] = useState(initialState);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.customApprovalCategorySlice);

  const handleDelete = (e) => {
    dispatch(removeCustomApprovalCategory(e));
  };

  const onSubmit = (e) => {
    if (e.description === "") {
      message.error("Please fill all required fields")
    } else {
      if (!e.id) {
        dispatch(addCustomApprovalCategory(e));
        setcustomApprovalCategory(initialState);
        return;
      }
      dispatch(updateCustomApprovalCategory(e));
      setcustomApprovalCategory(initialState);
    }
  };
  return (
    <AdminContainer>
      <CustomApprovalCategoryForm data={customApprovalCategory} onSubmit={onSubmit} loading={loader} />
      <CustomApprovalCategoryTable
        handleEdit={setcustomApprovalCategory}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
