import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import EmployeeCard from "../../../employee/view/employeeCard";
import { CardGrid } from "../../../employee/Styles/employeeCard.styles";

function EmployeesContainer() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const { employees, loader } = useSelector((state) => state.employeeSlice);
  const { employeeShort } = useSelector((state) => state.sharedSlice);

  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/employees?q=${searchQuery}`);
  };
  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Employees</h5>
        {/* <CardGrid>
          {employees.slice(0, 4).map((employee, index) => {
            return <EmployeeCard employees={employee} key={index} />;
          })}
        </CardGrid> */}

        <div
          onClick={searchHandler}
          className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
        >
          See more
        </div>
      </div>
    </>
  );
}
export default EmployeesContainer;
