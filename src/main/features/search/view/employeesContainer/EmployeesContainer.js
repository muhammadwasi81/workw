import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import EmployeeCard from "../../../employee/view/employeeCard";
import { CardGrid } from "../../../employee/Styles/employeeCard.styles";
import {Link} from "../../styles/admin.style";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
function EmployeesContainer() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const {keyword} = useSelector((state) => state.globalSearchSlice);
  const { employees, loader } = useSelector((state) => state.employeeSlice);
  const { employeeShort } = useSelector((state) => state.sharedSlice);

  const navigate = useNavigate();
  const searchHandler = () => {
    // window.location.href = '/search/employee';
    // navigate('/search/employee');
    navigate(`/search/employee`);
  };
  return (
    <>
    {
      keyword?.Employee?.length > 0 ? (    <div className="SearchMainContainer">
      <h5 className="containerHeading">Employees</h5>
      <CardGrid>
        {keyword?.Employee?.slice(0, 4).map((employee, index) => {
          return <EmployeeCard employees={employee} key={index} />;
        })}
      </CardGrid>
        {keyword?.Employee?.length > 3 ? (<div
        onClick={searchHandler}
        className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
      >
        See more
      </div>):(<div></div>)}
    </div>) :  (<div className="SearchMainContainer">
          <div><NoDataFound/></div></div>
    )
    }
  
    </>
  );
}
export default EmployeesContainer;
