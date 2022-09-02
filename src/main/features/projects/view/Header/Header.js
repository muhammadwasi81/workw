import React from "react";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import Layout from "../../../../layout/header/index";
import Composer from "../../UI/Composer";

function Header(props) {
	const { createTextBtn } = props;
	return (
		<Layout
			buttons={[
				{
					buttonText: createTextBtn,
					render: (
						<SideDrawer
							title={createTextBtn}
							buttonText={createTextBtn}
							isAccessDrawer={false}
						>
							<Composer />
						</SideDrawer>
					),
				},
			]}
		/>
	);
}

export default Header;
