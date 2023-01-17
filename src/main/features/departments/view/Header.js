import React, { useEffect, useState } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import TravelComposer from "./TravelComposer/TravelComposer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import { buttonsEnum } from "../enums/enums";

function Header(props) {
  const { label } = props;
  const [visible, setVisible] = useState(false);
  const { success } = props;
  const items = [
    {
      name: label.appHeader.travel.travels,
      to: `${ROUTES.TRAVEL.ROOT}?f=trv`,
      renderButton: buttonsEnum.travel,
    },
  ];
  const buttons = [
    {
      buttonText: "Create Travel",
      onClick: () => setVisible(true),
      render: (
        <SideDrawer
          children={<TravelComposer />}
          title="Create Travel"
          buttonText="Create Travel"
          isAccessDrawer={true}
          setOpenDrawer={setVisible}
          setIsEdited={() => {}}
          openDrawer={visible}
          success={success}
        />
      ),
    },
  ];
  return <LayoutHeader items={items} buttons={buttons} />;
}

export default Header;
