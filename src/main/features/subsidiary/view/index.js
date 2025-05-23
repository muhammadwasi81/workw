import { message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import {
  addBranch,
  addDefaultHiringCriteria,
  getAllBranch,
  getAllDefaultHiringCriteria,
  removeBranch,
  removeDefaultHiringCriteria,
  updateBranch,
  updateDefaultHiringCriteria,
} from "../store/actions";
import Form from "./form.js";
import TableView from "./table.js";

export default function Subsidiary() {
  const initialState = { branchTitle: "" };
  const [subsidiary, setSubsidiary] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();

  const { loader } = useSelector((state) => state.subsidiarySlice);

  const handleDelete = (e) => {
    dispatch(removeBranch(e));
  };

  const onSubmit = (e) => {
    if (e.branchTitle === "") {
      message.error("Title can't be empty");
    } else {
      if (!e.id) {
        dispatch(addBranch(e));
        dispatch(getAllBranch());
        setSubsidiary(initialState);
        setClearButton(true);
        return;
      }
      dispatch(updateBranch(e));

      setSubsidiary(initialState);
    }
  };
  return (
    <AdminContainer>
      <Form
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={subsidiary}
        onSubmit={onSubmit}
        loading={loader}
      />
      <TableView
        handleEdit={setSubsidiary}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
