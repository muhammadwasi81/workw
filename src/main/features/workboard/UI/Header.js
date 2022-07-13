import React, { useEffect, useState } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import BoardComposer from "../Composer/BoardComposer";
// import { buttonsEnum } from "../enums/enums";

function Header(props) {
	const { label } = props;
	const [visible, setVisible] = useState(false);
	const { success } = props;
	const items = [
		{
			name: "Dashboard",
			to: `${ROUTES.WORKBOARD.DEFAULT}`,
			renderButton: [1],
		},
	];
	const buttons = [
		{
			buttonText: "Create WorkBoard",
			onClick: () => setVisible(true),
			render: (
				<SideDrawer
					children={<BoardComposer />}
					title="Create Board"
					buttonText="Create Board"
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
