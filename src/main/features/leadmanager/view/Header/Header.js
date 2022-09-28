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
	const {
		loading,
		success,
		isComposerOpen,
		isEditComposer,
		// leadManagerDetail,
		// isComposerDataLoading,
	} = useSelector(state => state.leadMangerSlice);

	const [composerName, setComposerName] = useState(createGrp);
	// const [composerData, setComposerData] = useState(initialComposerData);
	// const isEdited = isEditComposer;
	const items = [
		{
			name: dashboard,
			to: `${ROUTES.LEAD_MANAGER.DEFAULT}`,
			renderButton: [1],
		},
	];
	const handleOpenDrawer = isOpen => {
		// setComposerName(createGrp);
		dispatch(handleComposer({ isOpen }));
	};

	useEffect(() => {
		if (isEditComposer) setComposerName(updateGrp);
	}, [isEditComposer]);

	// useEffect(() => {
	// 	if (isEditComposer && leadManagerDetail && !isComposerDataLoading) {
	// 		setComposerData(leadManagerDetail);
	// 	} else {
	// 		setComposerData(initialComposerData);
	// 	}
	// }, [
	// 	isComposerOpen,
	// 	isEditComposer,
	// 	leadManagerDetail,
	// 	isComposerDataLoading,
	// ]);

	const buttons = [
		{
			// buttonText: createTextBtn,
			onClick: () => handleOpenDrawer(true),
			render: (
				<SideDrawer
					children={
						<BoardComposer
							isEdit={isEditComposer}
							btnText={composerName}
							loading={loading}
							dictionary={dictionary}
							direction={direction}
						/>
					}
					title={composerName}
					buttonText={createTextBtn}
					isAccessDrawer={true}
					// setOpenDrawer={handleOpenDrawer}
					openDrawer={isComposerOpen}
					success={success}
					handleClose={() => {
						dispatch(resetLeadManagerDetail());
						setTimeout(() => {
							setComposerName(createGrp);
						}, 1000);
					}}
				/>
			),
		},
	];
	return <LayoutHeader items={items} buttons={buttons} />;
}

export default Header;
