import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import {TeamTable} from "../../companies/view/TaskTable/TeamTable";
import {getAllSignupAction} from "../../companies/store/action";
import tableColumn from "./tableColumn";

function Table() {

  const { signup }  = useSelector((state) => state.companySlice);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSignupAction());
  }, []);

  
  return (

        <TeamTable
         bordered
         className="custom_table"
         columns={tableColumn()}
         dataSource={signup}
         />  
  );
}

export default Table;
