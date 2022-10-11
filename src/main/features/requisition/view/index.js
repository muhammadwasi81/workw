import React from "react";
import { Switch, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import Requisition from "./Requisition";

const Index = () => {
  return (
    <Switch>
      <Route
        exact
        path={`${ROUTES.REQUISITION}`}
        component={Requisition}
      />
      <Route component={BrokenPage} />
    </Switch>
  );
};

export default Index;
