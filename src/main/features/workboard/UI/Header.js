import React, { useEffect, useState } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import BoardComposer from "../Composer/BoardComposer";
import { useSelector, useDispatch } from "react-redux";
import { handleBoardComposer } from "../store/slice";

const initialComposerData = {
	name: "",
	description: "",
	members: [],
	attachments: [],
	privacyId: 1,
	image: "",
};

function Header() {
	const dispatch = useDispatch();
	const [composerData, setComposerData] = useState(initialComposerData);
	const workboardDetail = useSelector(
		state => state.trelloSlice.workboardDetail
	);
	const success = useSelector(state => state.trelloSlice.success);
	const loading = useSelector(state => state.trelloSlice.loader);
	const isComposerVisible = useSelector(
		state => state.trelloSlice.isComposerVisible
	);
	const [visible, setVisible] = useState(false);
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
		setVisible(val);
		dispatch(handleBoardComposer({ isEdit: false, isVisible: val }));
	};

	useEffect(() => {
		if (isComposerEdit && workboardDetail) {
			setComposerData({ ...composerData, ...workboardDetail });
			setVisible(true);
		}
		if (isComposerVisible && !isComposerEdit) {
			setComposerData(initialComposerData);
		}
		if (!isComposerVisible) {
			setComposerData(initialComposerData);
		}
	}, [workboardDetail, isComposerEdit, isComposerVisible]);

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
							loading={loading}
						/>
					}
					title={(isComposerEdit ? "Update" : "Create") + " Board"}
					buttonText="Create Board"
					isAccessDrawer={true}
					setOpenDrawer={handleOpenDrawer}
					openDrawer={visible}
					success={success}
				/>
			),
		},
	];
	return <LayoutHeader items={items} buttons={buttons} />;
}

export default Header;
