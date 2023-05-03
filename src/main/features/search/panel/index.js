import React from "react";
import { AdminPanelContainer } from "../styles/admin.style";
import MenuList from "../panel/menulist";
import MenuRoutes from "../panel/menuRoutes";
function GlobalSearch() {
  return (
    <AdminPanelContainer>
      <MenuList />
      <MenuRoutes />
    </AdminPanelContainer>
  );
} 
export default GlobalSearch;
