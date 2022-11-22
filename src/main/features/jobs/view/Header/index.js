import React from "react";
import { ROUTES } from "../../../../../utils/routes";
import MainHeader from "../../../../layout/header";

const Header = () => {
  const items = [
    {
      name: "Job Board",
      to: `${ROUTES.JOBS.ROOT}`,
      renderButton: [1],
    },
  ];
  return <MainHeader items={items} />;
};

export default Header;
