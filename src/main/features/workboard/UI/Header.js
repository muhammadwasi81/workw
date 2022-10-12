import React, { useEffect, useState } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import BoardComposer from "../Composer/BoardComposer";
import { useSelector, useDispatch } from "react-redux";
import { handleBoardComposer, resetComposerDetail } from "../store/slice";

function Header({ width, routeLink, backButton }) {
	const dispatch = useDispatch();

	const success = useSelector(state => state.trelloSlice.success);
	const loading = useSelector(state => state.trelloSlice.loader);
	const isComposerVisible = useSelector(
		state => state.trelloSlice.isComposerVisible
	);
	const isComposerEdit = useSelector(
		state => state.trelloSlice.isComposerEdit
	);

	const items = [
		{
			name: "Workboard Dashboard",
			to: routeLink ? routeLink : `${ROUTES.WORKBOARD.DEFAULT}`,
			renderButton: [1],
		},
	];

	const buttons = [
		{
			render: (
				<SideDrawer
					children={
						<BoardComposer
							isEdit={isComposerEdit}
							loading={loading}
						/>
					}
					title={(isComposerEdit ? "Update" : "Create") + " Board"}
					buttonText="Create Board"
					isAccessDrawer={true}
					handleClose={() => {
						setTimeout(() => {
							dispatch(resetComposerDetail());
						}, 100);
					}}
					openDrawer={isComposerVisible}
					success={success}
				/>
			),
		},
	];
	return (
		<LayoutHeader
			items={items}
			buttons={buttons}
			width={width}
			backButton={backButton}
		/>
	);
}

export default Header;
