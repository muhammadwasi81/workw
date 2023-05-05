import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../sharedComponents/Administration/StyledComponents/admin";
import {
  addAllowance,
  removeAllowance,
  updateAllowance,
} from "../store/actions";
import AllowanceTable from "./table.js";
import AllowanceForm from "./form.js";
import "./allowance.css";
import { message } from "antd";

export default function Allowance() {
  const initialState = {
    name: "",
    description: "",
    gradeId: "",
    allowanceType: 1,
    allowanceUnit: 1,
    isTaxable: true,
    value: "",
  };
  const [allowance, setAllowance] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.allowanceSlice);

  const handleDelete = (e) => {
    dispatch(removeAllowance(e));
  };

  const onSubmit = (e) => {
    console.log(e, "FROM MAIN");
    if (!e.name || !e.description) {
      return message.error(`Please fill all the fields`);
    }
    if (!e.id) {
      dispatch(addAllowance(e));
      setAllowance(initialState);
      setClearButton(true);
      return;
    }
    dispatch(updateAllowance(e));
    setAllowance(initialState);
  };
  return (
    <AdminContainer>
      <AllowanceForm
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={allowance}
        onSubmit={onSubmit}
        loading={loader}
      />
      <AllowanceTable
        handleEdit={setAllowance}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
        setClearButton={setClearButton}
      />
    </AdminContainer>
  );
}
