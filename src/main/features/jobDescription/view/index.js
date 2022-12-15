import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
import {
  addJobDescription,
  removeJobDescription,
  updateJobDescription,
} from "../store/actions";
import JobDescriptionForm from "./form.js";
import JobDescriptionTable from "./table.js";

export default function JobDescription() {
  const initialState = { designationId: "", description: "" };
  const [jobDescription, setJobDescription] = useState(initialState);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.jobDescriptionSlice);

  const handleDelete = (id) => {
    console.log(id, "delete");
    dispatch(removeJobDescription(id));
  };

  const onSubmit = (e) => {
    if (!e.description) {
      return message.error("Please fill required fields");
    } else {
      if (!e.id) {
        dispatch(addJobDescription(e));
        setJobDescription(initialState);
        return;
      }
      dispatch(updateJobDescription(e));
      setJobDescription(initialState);
    }
  };
  return (
    <AdminContainer>
      <JobDescriptionForm
        data={jobDescription}
        onSubmit={onSubmit}
        loading={loader}
      />
      <JobDescriptionTable
        handleEdit={setJobDescription}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
