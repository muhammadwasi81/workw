// import React from "react";
// import { Switch, Route } from "react-router-dom";
// import { BrokenPage, STRINGS } from "../../../../utils/base";
// // import Reward from "./Reward";

// const Index = () => {
//   return (
//     <></>
//     // <Switch>
//     //   <Route
//     //     exact
//     //     path={`${STRINGS.ROUTES.HR.RESIGNATIONS}`}
//     //     component={Reward}
//     //   />
//     //   <Route component={BrokenPage} />
//     // </Switch>
//   );
// };

// export default Index;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import IndividualDetail from "./IndividualDetail";

import Resignation from "./resignations";
const Index = () => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Resignation />} />
      <Route
        exact
        path={`${ROUTES.RESIGNATION.DETAIL}/:id`}
        element={<IndividualDetail />}
      />
      <Route component={BrokenPage} />
    </Routes>
  );
};

export default Index;
