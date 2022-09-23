import { message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
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

export default function SubsidiaryOffice() {
	const initialState = {
		name: "",
		address: "",
		lat: "",
		lng: "",
		isDefault: "",
	};
	const [subsidiary, setSubsidiary] = useState(initialState);
	const [clearButton, setClearButton] = useState(false);

	const dispatch = useDispatch();

	const handleDelete = e => {
		dispatch(removeBranch(e));
	};

  const onSubmit = (e) => {
    if (e.name === "" || e.address === "" || e.lat === "" || e.lng === "" || e.isDefault === "") {
      message.error("Please fill all required fields")
    } else {
      if (!e.id) {
        dispatch(addBranch(e));
        dispatch(getAllBranch())
        setSubsidiary(initialState);
        setClearButton(true)
        return;
      }
      dispatch(updateBranch(e));

      setSubsidiary(initialState);
    }
  };
  return (
    <AdminContainer>
      <Form clearButton={clearButton} setClearButton={setClearButton} data={subsidiary} onSubmit={onSubmit} />
      <TableView
        handleEdit={setSubsidiary}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
