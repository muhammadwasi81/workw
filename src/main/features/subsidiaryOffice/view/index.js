import { message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import {
  addBranchOffice,
  removeBranchOffice,
  updateBranch,
} from "../store/actions";
import Form from "./form.js";
import TableView from "./table.js";

export default function SubsidiaryOffice() {
  const initialState = { name: "", address: "", lat: 0, lng: 0, branchId: "" };
  const [subsidiary, setSubsidiary] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();

  // const { loader } = useSelector((state) => state.subsidiaryOfficeSlice);

  const handleDelete = (e) => {
    dispatch(removeBranchOffice(e));
  };

  const onSubmit = (e) => {
    if (e.name === "" || e.address === "") {
      message.error("Please fill all required fields");
    } else {
      if (!e.id) {
        dispatch(addBranchOffice(e));
        setSubsidiary(initialState);
        setClearButton(true);
        return;
      }
      dispatch(updateBranch({ ...e, isDefault: true }));
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
