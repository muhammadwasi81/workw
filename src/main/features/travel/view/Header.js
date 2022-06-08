import React from "react";
import { HeaderMenuContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import HeaderNavLink from "../../../sharedComponents/AppComponents/MainHeader/HeaderNavLink";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import TravelComposer from "./TravelComposer/TravelComposer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
function Header(props) {
  const { label } = props;
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
    // 			<SideDrawer
    // 				children={<TravelComposer />}
    // 				title="Create Travel Expense"
    // 				buttonText="Create Travel"
    // 				isAccessDrawer={false}
    // 			/>
    // 		</div>
    // 	</div>
    // </ContainerHeader>
    <LayoutHeader
      items={[
        { name: label.appHeader.travel.travels, to: ROUTES.TRAVEL.DEFAULT },
        { name: "asdsa", to: "333" },
        { name: "aas", to: "333" },
      ]}
    />
  );
}

export default Header;
