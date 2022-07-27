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

function Header() {
	const dispatch = useDispatch();

	const {
		loading,
		success,
		isComposerOpen,
		isEditComposer,
		leadMangerDetail,
		isComposerDataLoading,
	} = useSelector(state => state.leadMangerSlice);

	const [composerData, setComposerData] = useState(initialComposerData);

	const items = [
		{
			name: "Dashboard",
			to: `${ROUTES.LEAD_MANAGER.DEFAULT}`,
			renderButton: [1],
		},
	];
	const handleOpenDrawer = isOpen => {
		dispatch(handleComposer({ isOpen }));
	};

	useEffect(() => {
		if (isEditComposer && leadMangerDetail && !isComposerDataLoading) {
			setComposerData(leadMangerDetail);
		} else {
			setComposerData(initialComposerData);
		}
	}, [
		isComposerOpen,
		isEditComposer,
		leadMangerDetail,
		isComposerDataLoading,
	]);

	const buttons = [
		{
			buttonText: "Create Lead Manager",
			onClick: () => handleOpenDrawer(true),
			render: (
				<SideDrawer
					children={
						<BoardComposer
							isEdit={isEditComposer}
							composerData={composerData}
							dataLoading={isComposerDataLoading}
							loading={loading}
						/>
					}
					title={isEditComposer ? "Update" : "Create" + " Group"}
					buttonText="Create Lead Category Group"
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
