import React, { useEffect, useState } from "react";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import { ROUTES } from "../../../../../utils/routes";
import LayoutHeader from "../../../../layout/header";
import BoardComposer from "../Composer/BoardComposer";
import { useSelector, useDispatch } from "react-redux";
import { handleComposer, resetLeadManagerDetail } from "../../store/slice";
// import { handleBoardComposer } from "../store/slice";

const initialComposerData = {
	name: "",
	description: "",
	members: [],
	attachments: [],
	privacyId: 1,
	image: "",
};

function Header({ dictionary, direction }) {
	const dispatch = useDispatch();
	const { createTextBtn, dashboard, labels } = dictionary;
	const { createGrp, updateGrp } = labels;
	const { loading, success, isComposerOpen, isEditComposer } = useSelector(
		state => state.leadMangerSlice
	);

	const items = [
		{
			name: dashboard,
			to: `${ROUTES.LEAD_MANAGER.DEFAULT}`,
			renderButton: [1],
		},
	];
	const handleOpenDrawer = isOpen => {
		dispatch(handleComposer({ isOpen }));
	};

	const buttons = [
		{
			// buttonText: createTextBtn,
			// onClick: () => handleOpenDrawer(true),
			render: (
				<SideDrawer
					children={
						<BoardComposer
							isEdit={isEditComposer}
							loading={loading}
							dictionary={dictionary}
							direction={direction}
							labels={labels}
						/>
					}
					title={isEditComposer ? updateGrp : createGrp}
					buttonText={createTextBtn}
					isAccessDrawer={true}
					openDrawer={isComposerOpen}
					success={success}
					handleClose={() => {
						setTimeout(() => {
							dispatch(resetLeadManagerDetail());
						}, 100);
					}}
				/>
			),
		},
	];
	return <LayoutHeader items={items} buttons={buttons} />;
}

export default Header;
