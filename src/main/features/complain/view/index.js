import React from "react";
import { Switch, Route } from "react-router-dom";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import "./reward.css";
import Reward from "./Complain";

const Index = () => {
  return (
    <Switch>
      <Route
        exact
        path={`${STRINGS.ROUTES.HR.COMPLAINS.DEFAULT}`}
        component={Reward}
      />
      <Route component={BrokenPage} />
      
    </Switch>
  );
};

export default Index;
