import React, { useState } from "react";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import Composer from "../Composers/index";
import MainHeader from "../../../../layout/header/index";

const Header = () => {
  const [close, setClose] = useState(false);
  const items = [
    {
      name: "Careers",
      to: `/careers`,
      renderButton: [1],
    },
  ];

  const handleClose = (val) => {
    console.log(val);
    setClose(val);
  };
  return (
    <>
      <MainHeader
        buttons={[
          {
            buttonText: "Create Department",
            render: (
              <Button
                className="ThemeBtn"
                onClick={() => dispatch(handleOpenComposer(true))}
              >
                Create Job
              </Button>

              // <SideDrawer
              //   title={"Create Job"}
              //   buttonText={"Create Job"}
              //   isAccessDrawer={false}
              //   handleClose={handleClose}
              // >
              //   <Composer handleClose={(val) => handleClose(val)} />
              // </SideDrawer>
            ),
          },
        ]}
        items={items}
      />
    </>
  );
};

export default Header;
