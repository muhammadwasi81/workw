import { useContext, useEffect, useState } from "react";
import EmployeeCard from "./employeeCard";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";
// import { getAllEmployees } from '../store/actions';
import { Skeleton } from "antd";
import { dictionaryList } from "../../../../utils/localization/languages";
import TopBar from "../../../sharedComponents/topBar/topBar";
import EmployeeTableView from "./employeeTableView";
import { getAllEmployeeShort } from "../../../../utils/Shared/store/actions";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";
import { EmployeeDisableFilterEnum } from "../util/EmployeeEnum";
import { CardGrid } from "../Styles/employeeCard.styles";

function EmployeeList() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  const dispatch = useDispatch();
  const { sharedLabels } = dictionaryList[userLanguage];
  const { loader } = useSelector((state) => state.employeeSlice);
  const { employeeShort } = useSelector((state) => state.sharedSlice);
  const [view, setView] = useState("List");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(EmployeeDisableFilterEnum.Enable);

  const filteredEmployees = employeeShort.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.designation.toLowerCase().includes(search.toLowerCase())
  );
  console.log(employeeShort, "employeeShort");

  useEffect(() => {
    dispatch(
      getAllEmployeeShort({
        pageNo: 1,
        pageSize: 20,
        disableFilter: filter,
      })
    );
  }, [filter]);

  let classes = "empolyeesListContainer";
  classes += Direction === " ltr" ? " ltr" : " rtl";

  return (
    <>
      {loader ? (
        [...Array(40)].map((_, index) => (
          <div className={`${classes} empolyeesListContainer`}>
            <Skeleton key={index} loading={true} active />
          </div>
        ))
      ) : (
        <>
          <div style={{ flexDirection: "column", width: "100%" }}>
            <TopBar
              style={{ margin: 0, width: "100%" }}
              onSearch={(val) => setSearch(val)}
              buttons={[
                {
                  name: "Employees",
                  onClick: () => setFilter(EmployeeDisableFilterEnum.Enable),
                },
                {
                  name: "Disabled",
                  onClick: () => setFilter(EmployeeDisableFilterEnum.Disable),
                },
                {
                  onClick: () => setFilter(EmployeeDisableFilterEnum.Both),
                  name: "All Employees",
                },
              ]}
              segment={{
                onSegment: (value) => {
                  setView(value);
                },
                label1: sharedLabels.List,
                label2: sharedLabels.Table,
              }}
            />
            {filteredEmployees.length > 0 ? (
              view === "List" ? (
                <CardGrid>
                  {filteredEmployees.map((employee, index) => {
                    return <EmployeeCard employees={employee} key={index} />;
                  })}
                </CardGrid>
              ) : (
                <EmployeeTableView filterEmployees={filteredEmployees} />
              )
            ) : (
              <NoDataFound />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default EmployeeList;
