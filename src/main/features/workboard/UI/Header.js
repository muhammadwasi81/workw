import React, { useEffect, useState } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import BoardComposer from "../Composer/BoardComposer";
import { useSelector, useDispatch } from "react-redux";
import { openNotification } from "../../../../utils/Shared/store/slice";
function Header() {
	const [visible, setVisible] = useState(false);
	const success = useSelector(state => state.trelloSlice.success);
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			dispatch(
				openNotification({
					message: "WorkBoard Created Successfully",
					type: "success",
					duration: 0,
				})
			);
		}
	}, [success]);

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
