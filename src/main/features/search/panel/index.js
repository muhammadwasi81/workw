import React from "react";

import { AdminPanelContainer } from "../styles/admin.style";
import MenuList from "../panel/menulist";
import MenuRoutes from "../panel/menuRoutes";
// import mainContainer from "../view/mainContainer/MainContainer";
import MainContainer from "../view/mainContainer/MainContainer";
function GlobalSearch() {
  return (
    <AdminPanelContainer>
      <MenuList />
      <MenuRoutes />
     {/* <MainContainer/> */}
    </AdminPanelContainer>
  );
} 

export default GlobalSearch;
