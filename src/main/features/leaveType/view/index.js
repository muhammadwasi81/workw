import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
import {addLeaveType, removeLeaveType, updateGrade, updateLeaveType } from "../store/actions";
import LeaveTypeForm from "./form.js";
import LeaveTypeTable from "./table.js";

export default function LeaveType() {
  const initialState = { name: "", description: "" };
  const [leaveTypes, setLeaveType] = useState(initialState);
  const [clearButton, setClearButton] = useState(false)

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.leaveTypeSlice);

  const handleDelete = (e) => {
    dispatch(removeLeaveType(e));
  };

  const onSubmit = (e) => {
    if (!e.id) {
      dispatch(addLeaveType(e));
      setLeaveType(initialState);
      setClearButton(true)
      return;
    }
    dispatch(updateLeaveType(e));
    setLeaveType(initialState);
  };
  return (
    <AdminContainer>
      <LeaveTypeForm 
        clearButton={clearButton} 
        setClearButton={setClearButton} 
        data={leaveTypes} 
        onSubmit={onSubmit} 
        loading={loader} 
      />
      <LeaveTypeTable
        clearButton={clearButton} 
        setClearButton={setClearButton}
        handleEdit={setLeaveType}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
