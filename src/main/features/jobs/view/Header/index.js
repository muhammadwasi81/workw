import React from "react";
import MainHeader from "../../../../layout/header/index";

const Header = () => {
  const items = [
    {
      name: "Job Board",
      to: `/public/job_board`,
      renderButton: []
    },
  ];
  return (
      <MainHeader
        items={items}
      />
  );
};

export default Header;
