import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import { addCustomTag,updateCustomTag,removeCustomTag } from "../store/action";
import CustomTagForm from "./form.js";
import CustomTagTable from "./table.js";

export default function CustomTag() {
  const initialState = { name: "", description: "" };
  const [custom, setCustom] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();
  const  loader  = useSelector((state) => state.customTagSlice);

  const handleDelete = (e) => {
    dispatch(removeCustomTag(e));
  };

  const onSubmit = (e) => {
    if (e.name === "" || e.description === "") {
      message.error("Please fill all required fields");
    } else {
      if (!e.id) {
        dispatch(addCustomTag(e));
        setCustom(initialState);
        setClearButton(true);
        return;
      }
      dispatch(updateCustomTag(e));
      setCustom(initialState);
    }
  };

  return (
    <AdminContainer>
      <CustomTagForm
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={custom}
        onSubmit={onSubmit}
        //loading={loader}
      />
      <CustomTagTable
        handleEdit={setCustom}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
