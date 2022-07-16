import React, { useEffect, useState } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import BoardComposer from "../Composer/BoardComposer";
import { useSelector, useDispatch } from "react-redux";
import { handleBoardComposer } from "../store/slice";
// import { openNotification } from "../../../../utils/Shared/store/slice";
function Header() {
	const dispatch = useDispatch();
	const composerData = useSelector(state => state.trelloSlice.composerData);
	// const [data, setData] = useState(composerData);
	const success = useSelector(state => state.trelloSlice.success);
	const visible = useSelector(state => state.trelloSlice.isComposerVisible);
	const isComposerEdit = useSelector(
		state => state.trelloSlice.isComposerEdit
	);

	const items = [
		{
			name: "Dashboard",
			to: `${ROUTES.WORKBOARD.DEFAULT}`,
			renderButton: [1],
		},
	];
	const handleOpenDrawer = val => {
		dispatch(handleBoardComposer({ isEdit: false, isVisible: val }));
	};
	// useEffect(() => {
	// 	setData(composerData);
	// }, [composerData]);
	const buttons = [
		{
			buttonText: "Create WorkBoard",
			onClick: () => handleOpenDrawer(true),
			render: (
				<SideDrawer
					children={
						<BoardComposer
							isEdit={isComposerEdit}
							composerData={composerData}
						/>
					}
					title={(isComposerEdit ? "Update" : "Create") + " Board"}
					buttonText="Create Board"
					isAccessDrawer={true}
					setOpenDrawer={handleOpenDrawer}
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
