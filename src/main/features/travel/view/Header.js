import React, { useState } from "react";
import { HeaderMenuContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import HeaderNavLink from "../../../sharedComponents/AppComponents/MainHeader/HeaderNavLink";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import TravelComposer from "./TravelComposer/TravelComposer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import { PlusOutlined } from "@ant-design/icons";
import { buttonsEnum } from "../enums/enums";
import { Drawer } from "antd";

function Header(props) {
  const { label } = props;
  const [visible, setVisible] = useState(false);

  const items = [
    {
      name: label.appHeader.travel.travels,
      to: ROUTES.TRAVEL.DEFAULT,
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
          title="Create Travel Expense"
          buttonText="Create Travel"
          isAccessDrawer={true}
          setOpenDrawer={setVisible}
          openDrawer={visible}
        />
      ),
    },
  ];
  return (
    // <ContainerHeader>
    // 	<HeaderMenuContainer>
    // 		<HeaderNavLink
    // 			activeName={"travel"}
    // 			to={}
    // 			isDefault={true}
    // 			linkName={}
    // 		/>
    // 	</HeaderMenuContainer>

    // 	<div className="right-menu">
    // 		<div className="travel_drawer">
    //
    // 		</div>
    // 	</div>
    // </ContainerHeader>
    <>
      {/* <SideDrawer
        children={<TravelComposer />}
        title="Create Travel Expense"
        buttonText="Create Travel"
        isAccessDrawer={false}
      /> */}

      <LayoutHeader items={items} buttons={buttons} />
    </>
  );
}

export default Header;
