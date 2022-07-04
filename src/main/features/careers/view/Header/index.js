import React, { useEffect, useContext, useState } from "react";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import Composer from "../Composer/index";
import { ROUTES } from "../../../../../utils/routes";
import MainHeader from "../../../../layout/header/index";

const Header = () => {
  const items = [
    {
      name: "Careers",
      to: `${ROUTES.CAREER.DEFAULT}`,
      renderButton: [1],
    },
  ];
  return (
    <>
      <MainHeader
        buttons={[
          {
            buttonText: "Create Department",
            // onClick: () => setVisible(true),
            render: (
              <SideDrawer title={"Create Job"} buttonText={"Create Job"} isAccessDrawer={false}>
                <Composer />
              </SideDrawer>
            ),
          },
        ]}
        items={items}
      />
    </>
  );
};

export default Header;
