import React from "react";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import Composer from "../Composers/index";
import MainHeader from "../../../../layout/header/index";

const Header = () => {
  const items = [
    {
      name: "Careers",
      to: `/careers`,
      renderButton: [1],
    },
  ];
  return (
    <>
      <MainHeader
        buttons={[
          {
            buttonText: "Create Department",
            render: (
              <SideDrawer
                title={"Create Job"}
                buttonText={"Create Job"}
                isAccessDrawer={false}
              >
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
