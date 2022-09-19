import React, { useState } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
// import TravelComposer from "./TravelComposer/TravelComposer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import { buttonsEnum } from "../enums/enums";
import NewTravelComposer from "./TravelComposer/NewTravelComposer";

function Header(props) {
	const { label, backButton, route } = props;
	// console.log("label", labels);
	const [visible, setVisible] = useState(false);
	const { success } = props;
	const items = [
		{
			name: label.travels,
			to: route ? route : `${ROUTES.TRAVEL.DEFAULT}?f=trv`,
			renderButton: buttonsEnum.travel,
		},
	];
	const buttons = [
		{
			buttonText: label.createTextBtn,
			onClick: () => setVisible(true),
			render: (
				<SideDrawer
					children={
						// <TravelComposer label={label} />
						<NewTravelComposer label={label} />
					}
					title={label.labels.createTravel}
					buttonText={label.createTextBtn}
					isAccessDrawer={true}
					setOpenDrawer={setVisible}
					setIsEdited={() => {}}
					openDrawer={visible}
					success={success}
				/>
			),
		},
	];
	return (
		<LayoutHeader items={items} buttons={buttons} backButton={backButton} />
	);
}

export default Header;
