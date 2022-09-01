import React, { useContext, useEffect } from "react";
import EmployeeCard from "./employeeCard";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../store/actions";
import { Skeleton } from "antd";
import { dictionaryList } from "../../../../utils/localization/languages";

function EmployeeList() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  const dispatch = useDispatch();
  const { employees, loader } = useSelector((state) => state.employeeSlice);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  let classes = "empolyeesListContainer  ";
  classes += Direction === "ltr" ? "ltr" : "rtl";
  if (loader) {
    return (
      <div className="empolyeesListContainer">
        {[...Array(40)].map(() => (
          <>
            <Skeleton.Avatar shape={"circle"} size={"large"} />
            <Skeleton loading={true} active></Skeleton>
          </>
        ))}
      </div>
    );
  } else {
    return (
      <div className={classes}>
        {employees.map((employee, index) => {
          return <EmployeeCard employees={employee} key={index} />;
        })}
      </div>
    );
  }
}

export default EmployeeList;
