import React from "react";
import { Routes, Route } from "react-router-dom";
import TeamList from "../view/TeamList";
import { ROUTES } from "../../../../utils/routes";
import { BrokenPage } from "../../../../utils/base";
import TeamUpdate from "../view/UpdateTeam/TeamPannel";
import TeamRoutes from "../view/UpdateTeam/TeamRoutes/routes";
import MyTeam from "..";

function teamRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyTeam />} />
        <Route path={"/info/*"} element={<TeamUpdate />} />
        <Route path="*" element={BrokenPage} />
      </Routes>
    </>
  );
}
export default teamRoutes;
