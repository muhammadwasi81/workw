import React from "react";

import { Route, Routes } from "react-router";
import { BrokenPage, STRINGS } from "../../../../utils/base";
import Expense from "../index";

function Index() {
  return (
    <Routes>
      <Route path={`/`} element={<Expense />} />
    </Routes>
  );
}

export default Index;
