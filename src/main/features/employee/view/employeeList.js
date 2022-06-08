import React, { useContext, useEffect } from "react";
import EmployeeCard from "./employeeCard";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { AllEmpolyeeContainer } from "../Styles/employee.style";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../store/actions";
import { Skeleton } from "antd";

function EmployeeList() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  const dispatch = useDispatch();
  const { employees, loader } = useSelector((state) => state.employeeSlice);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);
  if (loader) return <Skeleton loading={true} active></Skeleton>;
  return (
    <AllEmpolyeeContainer direction={Direction}>
      {employees.map(({ businessId, designation, email, image, name }) => {
        return (
          <EmployeeCard
            key={businessId}
            name={name}
            email={email}
            designation={designation}
            empNum={businessId}
            image={image}
          />
        );
      })}
    </AllEmpolyeeContainer>
  );
}

export default EmployeeList;
