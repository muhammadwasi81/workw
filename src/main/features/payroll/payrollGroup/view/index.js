import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../../components/HrMenu/Administration/StyledComponents/admin";
import { addPayrollGroup, getAllPayrollGroup, removePayrollGroup, updateaPayrollGroup} from "../store/actions";
import Form from "./form.js";
import TableView from "./table.js";

export default function PayrollGroup() {
  const initialState = { name: "" };
  const [payrollGroup, setPayrollGroup] = useState(initialState);
  const [clearButton, setClearButton] = useState(false)


  const dispatch = useDispatch();
  // const { loader } = useSelector((state) => state.payrollGroupSlice);

  const handleDelete = (e) => {
    dispatch(removePayrollGroup(e));
  };

  const onSubmit = (e) => {
    if (e.name === "") {
      message.error("Name can't be empty")
    } else {
      if (!e.id) {
        dispatch(addPayrollGroup(e));
        dispatch(getAllPayrollGroup())
        setPayrollGroup(initialState);
        setClearButton(true)
        return;
      }
      dispatch(updateaPayrollGroup(e));

      setPayrollGroup(initialState);
    }
  };
  return (
    <AdminContainer>
      <Form clearButton={clearButton} setClearButton={setClearButton} data={payrollGroup} onSubmit={onSubmit} />
      <TableView
        handleEdit={setPayrollGroup}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
