import React, { useContext, useState  ,useEffect} from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import EmployeeCard from "../../../employee/view/employeeCard";
import { CardGrid } from "../../../employee/Styles/employeeCard.styles";
import { handleTab } from "../../store/slice";
import { getSearchEmployee } from "../../store/actions";

function EmployeesContainer() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const {keyword , tab ,EmployeeData } = useSelector((state) => state.globalSearchSlice);
  
  const searchHandler = () => {
    dispatch(handleTab("Employee"))
    callApiAgain();
    
  };

  const callApiAgain  = () =>{
    dispatch(getSearchEmployee({
      pageNo:1,
      pageSize: 20,
      search: searchQuery,
      filterType: 10,
    }))
  }

 const loadMoreHandler = () =>{
  // callApiAgain();
 }

 useEffect(() => {
  if (tab === "Employee") {
    callApiAgain();
  }
}, [tab === "Employee"]);


  return (
    <>
      <div className="SearchMainContainer">
        <h5 className="containerHeading">Employees</h5>
        <CardGrid>
          {
            tab === "All" ? 
            (
              keyword?.Employee?.map((employee, index) => {
                return <EmployeeCard employees={employee} key={index} />;
              })
            )
            :
            (
              EmployeeData?.map((employee, index) => {
                return <EmployeeCard employees={employee} key={index} />;
              })
            )
          }
        </CardGrid>
        {tab==="All" && keyword?.Employee?.length === 3 && 
                (
                  <div
                    onClick={searchHandler}
                    className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                  >
                    See more
                  </div>
                )
              
        }
         {tab==="Employee" && EmployeeData?.length === 20 &&
              (
                <div
                  onClick={loadMoreHandler}
                  className="flex justify-center !text-[18px] cursor-pointer !text-[#707070]"
                >
                  Load More
                </div>   
              )
          }
      </div>
    </>
  );
}
export default EmployeesContainer;
