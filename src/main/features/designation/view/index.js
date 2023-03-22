import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import {
  addDesignation,
  removeDesignation,
  updateDesignation,
} from "../store/actions";
import DesignationForm from "./form.js";
import DesignationTable from "./table.js";

export default function Designation() {
  const initialState = { name: "", description: "" };
  const [designations, setDesignations] = useState(initialState);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.designationSlice);

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e, "delete");
    dispatch(removeDesignation(e));
  };

  const onSubmit = (e) => {
    if (e.name === "" || e.description === "") {
      return message.error("Please fill all required fields");
    } else {
      if (!e.id) {
        dispatch(addDesignation(e));
        setDesignations(initialState);
        return;
      }
      dispatch(updateDesignation(e));
      setDesignations(initialState);
    }
  };
  return (
    <AdminContainer>
      <DesignationForm
        data={designations}
        onSubmit={onSubmit}
        loading={loader}
      />
      <DesignationTable
        handleEdit={setDesignations}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
