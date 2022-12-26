// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import { BrokenPage } from "../../../../utils/base";
// import CreateSalary from "./SalaryCreate";
// import SalaryList from "./SalaryList/index";
// import "./style.css";

// const Index = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<SalaryList />} />
//       <Route path="/create" element={<CreateSalary />} />
//       <Route element={<BrokenPage />} />
//     </Routes>
//   );
// };

// export default Index;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import IndividualDetail from "../view/SalaryList/IndividualDetail";

import Salaries from "../view/SalaryList/index";
import CreateSalary from "./SalaryCreate";

const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Salaries />} />
      <Route path="/create" element={<CreateSalary />} />
      <Route
        exact
        path={`${ROUTES.SALARY.DETAIL}/:id`}
        element={<IndividualDetail />}
      />
      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
