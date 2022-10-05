import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import {
	ContBody,
	TabContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import CustomModal from "../../../workboard/Modal/CustomModal";
import {
	addLeadManagerAssignTo,
	deleteLeadManagerDetailAssignTo,
	getLeadManagerById,
} from "../../store/actions";
import {
	handleAssignMemberModal,
	handleContactDetailModal,
} from "../../store/slice";
import ContactDetailSkeleton from "../../UI/Skeleton/ContactDetailSkeleton";
import ComposeEmail from "../Email/ComposeEmail";
import AssignMemberModal from "../Modal/AssignMemberModal";
import Board from "./Board";
import BoardTopBar from "./BoardTopBar/BoardTopBar";
import ContactDetail from "./ContactDetail";
import LeadsOverview from "./LeadsOverview";
import BoardTable from "./Table/BoardTable";

function BoardViews() {
	const [view, setView] = useState("List");
	const [selectedMembers, setSelectedMembers] = useState([]);
	const [emailModal, setEmailModal] = useState(false);
	const dispatch = useDispatch();
	const { id } = useParams();
	const success = useSelector(state => state.leadMangerSlice.success);
	const isContactDetailLoading = useSelector(
		state => state.leadMangerSlice.isContactDetailLoading
	);
	const contactDetail = useSelector(
		state => state.leadMangerSlice.contactDetail
	);
	const leadManagerSectionDetailData = useSelector(
		state => state.leadMangerSlice.leadManagerSectionDetailData
	);
	const contactDataUpdating = useSelector(
		state => state.leadMangerSlice.contactDataUpdating
	);
	const contactModal = useSelector(
		state => state.leadMangerSlice.contactModal
	);

	const isAssignMemberModalOpen = useSelector(
		state => state.leadMangerSlice.isAssignMemberModalOpen
	);
	const assignToMemberId = useSelector(
		state => state.leadMangerSlice.assignToMemberId
	);
	useEffect(() => {
		dispatch(getLeadManagerById(id));
	}, []);
	const leadManagerDetail = useSelector(
		state => state.leadMangerSlice.leadManagerDetail
	);
	const items = [
		{
			name: leadManagerDetail && leadManagerDetail.name,
			to: `${ROUTES.LEAD_MANAGER.LEAD_GROUP_DETAIL}${id}`,
			onClick: () => {
				dispatch(getLeadManagerById(id));
			},
		},
	];
	const closeContactDetailModal = () => {
		dispatch(handleContactDetailModal({ open: false, add: false }));
	};
	const getUniqueListBy = (arr, key) => {
		return [...new Map(arr.map(item => [item[key], item])).values()];
	};
	const handleSelectedMembers = (val, obj) => {
		const tempObj = obj.map(member => {
			return {
				...member.member,
			};
		});
		let unique = getUniqueListBy([...selectedMembers, ...tempObj], "id");
		setSelectedMembers([...unique]);
		dispatch(
			addLeadManagerAssignTo([
				{
					detailId: assignToMemberId,
					memberId: tempObj[0].id,
				},
			])
		);
	};
	const handleDeleteMember = id => {
		let filteredMembers = selectedMembers.filter(
			member => member.id !== id
		);
		setSelectedMembers([...filteredMembers]);
		dispatch(
			deleteLeadManagerDetailAssignTo({
				detailId: assignToMemberId,
				memberId: id,
			})
		);
	};

	useEffect(() => {
		if (success) {
			closeContactDetailModal();
		}
	}, [success]);
	return (
		<div>
			<Header items={items} />
			<BoardTopBar
				handleView={view => {
					setView(view);
				}}
				onEmailClick={() => {
					setEmailModal(true);
				}}
			/>
			<TabContainer>
				<ContBody className={`!block `} direction={""}>
					{view === "List" ? (
						<LeadsOverview />
					) : view === "Board" ? (
						<Board />
					) : (
						<BoardTable data={leadManagerDetail} />
					)}
				</ContBody>
			</TabContainer>
			<CustomModal
				isModalVisible={contactModal.isOpen}
				onCancel={closeContactDetailModal}
				width={"50%"}
				title="Contact Detail"
				footer={null}
				children={
					isContactDetailLoading ? (
						!contactDetail && <ContactDetailSkeleton />
					) : (
						<ContactDetail
							isContactUpdated={contactModal.add}
							data={leadManagerSectionDetailData}
							contactDetail={contactDetail}
							loading={contactDataUpdating}
						/>
					)
				}
				className={""}
			/>
			<CustomModal
				isModalVisible={isAssignMemberModalOpen}
				onCancel={() => {
					dispatch(handleAssignMemberModal({ id: "" }));
				}}
				title="Assign Members"
				footer={null}
				centered={true}
				children={
					<AssignMemberModal
						defaultData={leadManagerDetail?.members}
						onChange={handleSelectedMembers}
						placeholder="Search Members"
						selectedMembers={selectedMembers}
						handleDeleteMember={handleDeleteMember}
					/>
				}
				className={""}
			/>
			<CustomModal
				isModalVisible={emailModal}
				onCancel={() => {
					setEmailModal(false);
				}}
				title={<div className="flex justify-center">Compose Email</div>}
				footer={null}
				centered={true}
				children={<ComposeEmail />}
				className={"rounded-lg"}
				width={"50%"}
			/>
		</div>
	);
}

export default BoardViews;
