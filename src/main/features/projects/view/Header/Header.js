import React from "react";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import Layout from "../../../../layout/header/index";
import Composer from "../../UI/Composer";
import { useSelector } from "react-redux";

function Header(props) {
	const { createTextBtn } = props;
	const success = useSelector(state => state.projectSlice.success);
	return (
		<Layout
			buttons={[
				{
					buttonText: createTextBtn,
					render: (
						<SideDrawer
							title={createTextBtn}
							buttonText={createTextBtn}
							isAccessDrawer={true}
							success={success}
						>
							<Composer buttonText={createTextBtn} />
						</SideDrawer>
					),
				},
			]}
		/>
	);
}

export default Header;
