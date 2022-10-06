import { message } from "antd";
import { set } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
import { addSalaryHeader, removeSalaryHeader, updateSalaryHeader } from "../store/actions";
import SalaryHeaderForm from "./form.js";
import SalaryHeaderTable from "./table.js";

export default function SalaryHeader() {
  const initialState = { name: "", description: "" };
  const [salaryHeader, setSalaryHeader] = useState(initialState);
  const [clearButton, setClearButton] = useState(false)


  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.salaryHeaderSlice);

  const handleDelete = (e) => {
    dispatch(removeSalaryHeader(e));
  };

  const onSubmit = (e) => {
    if (e.description === "") {
      message.error("Please fill all required fields")
    } else {
      if (!e.id) {
        dispatch(addSalaryHeader(e));
        setSalaryHeader(initialState);
        setClearButton(true)
        return;
      }
      dispatch(updateSalaryHeader(e));
      setSalaryHeader(initialState);
    }
  };
  return (
    <AdminContainer>
      <SalaryHeaderForm
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={salaryHeader}
        onSubmit={onSubmit}
        loading={loader} />
      <SalaryHeaderTable
        clearButton={clearButton}
        setClearButton={setClearButton}
        handleEdit={setSalaryHeader}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
