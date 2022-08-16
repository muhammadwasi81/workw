import React, { useEffect, useState } from "react";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import { ROUTES } from "../../../../../utils/routes";
import LayoutHeader from "../../../../layout/header";
import BoardComposer from "../Composer/BoardComposer";
import { useSelector, useDispatch } from "react-redux";
import { handleComposer } from "../../store/slice";
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
		leadManagerDetail,
		isComposerDataLoading,
	} = useSelector(state => state.leadMangerSlice);

	const [composerData, setComposerData] = useState(initialComposerData);
	// console.log("composerData", leadManagerDetail);
	const isEdited = isEditComposer;
	// const [isEdited, setIsEdited] = useState(false);

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

	useEffect(() => {
		if (isEditComposer && leadManagerDetail && !isComposerDataLoading) {
			setComposerData(leadManagerDetail);
		} else {
			setComposerData(initialComposerData);
		}
	}, [
		isComposerOpen,
		isEditComposer,
		leadManagerDetail,
		isComposerDataLoading,
	]);

	const buttons = [
		{
			buttonText: createTextBtn,
			onClick: () => handleOpenDrawer(true),
			render: (
				<SideDrawer
					children={
						<BoardComposer
							isEdit={isEdited}
							composerData={composerData}
							dataLoading={isComposerDataLoading}
							loading={loading}
							dictionary={dictionary}
							direction={direction}
						/>
					}
					title={isEdited ? updateGrp : createGrp}
					buttonText={createTextBtn}
					isAccessDrawer={true}
					setOpenDrawer={handleOpenDrawer}
					openDrawer={isComposerOpen}
					success={success}
				/>
			),
		},
	];
	return <LayoutHeader items={items} buttons={buttons} />;
}

export default Header;
