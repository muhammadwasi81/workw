import React, { useEffect, useState, useContext } from "react";
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
	handleComposeEmail,
	handleContactDetailModal,
	handleSectionDetailModal,
} from "../../store/slice";
import ContactDetailSkeleton from "../../UI/Skeleton/ContactDetailSkeleton";
import SectionDetailSkeleton from "../../UI/Skeleton/SectionDetailSkeleton";
import ComposeEmail from "../Email/ComposeEmail";
import AssignMemberModal from "../Modal/AssignMemberModal";
import Board from "./Board";
import BoardTopBar from "./BoardTopBar/BoardTopBar";
import ContactDetail from "./ContactDetail";
import LeadsOverview from "./LeadsOverview";
import SectionDetail from "./SectionDetail";
import BoardTable from "./Table/BoardTable";
import { LeadManagerDictionary } from "../../localization";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function BoardViews() {
	const [view, setView] = useState("List");
	const [selectedMembers, setSelectedMembers] = useState([]);
	// const [emailModal, setEmailModal] = useState(false);
	const [leadSectionId, setLeadSectionId] = useState("");
	const dispatch = useDispatch();
	const { id } = useParams();
	const success = useSelector(state => state.leadMangerSlice.success);
	const isContactDetailLoading = useSelector(
		state => state.leadMangerSlice.isContactDetailLoading
	);
	const contactDetail = useSelector(
		state => state.leadMangerSlice.contactDetail
	);
	const isSectionDetailLoading = useSelector(
		state => state.leadMangerSlice.isSectionDetailLoading
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
	const isSectionModalOpen = useSelector(
		state => state.leadMangerSlice.isSectionModalOpen
	);
	const assignToMemberId = useSelector(
		state => state.leadMangerSlice.assignToMemberId
	);
	const loading = useSelector(state => state.leadMangerSlice.loading);

	const leadManagerDetail = useSelector(
		state => state.leadMangerSlice.leadManagerDetail

	);

	console.log(leadManagerDetail,"leadManagerDetail");
	const { userLanguage } = useContext(LanguageChangeContext);
	const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
		userLanguage
	];
	const { detail, labels, placeHolder } = LeadManagerDictionaryList;

	useEffect(() => {
		dispatch(getLeadManagerById(id));
	}, []);

	useEffect(() => {
		if (success) {
			closeContactDetailModal();
		}
	}, [success]);

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
					sectionId: leadSectionId,
				},
			])
		);
	};

	const setMembersToSelectedMembers = (val, obj) => {
		const tempObj = obj.map(member => {
			return {
				...member.member,
			};
		});
		// let unique = getUniqueListBy([...selectedMembers, ...tempObj], "id");
		setSelectedMembers([...tempObj]);
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
				sectionId: leadSectionId,
			})
		);
	};
	// const handle
	// console.log("selectedMembers", selectedMembers);
	// console.log("leadManagerDetail", leadManagerDetail);
	return (
		<div>
			<Header items={items} />
			<BoardTopBar
				handleView={view => {
					setView(view);
				}}
				onEmailClick={() => {
					dispatch(handleComposeEmail(true));
				}}
			/>
			<TabContainer>
				<ContBody className={`!block `} direction={""}>
					{view === "List" ? (
						<LeadsOverview
							handleSelectedMembers={setMembersToSelectedMembers}
							setLeadSectionId={setLeadSectionId}
						/>
					) : view === "Board" ? (
						<Board
							handleSelectedMembers={setMembersToSelectedMembers}
						/>
					) : (
						<BoardTable
							data={leadManagerDetail}
							handleSelectedMembers={setMembersToSelectedMembers}
							setLeadSectionId={setLeadSectionId}
						/>
					)}
				</ContBody>
			</TabContainer>
			<CustomModal
				isModalVisible={contactModal.isOpen}
				onCancel={closeContactDetailModal}
				width={"50%"}
				title={detail.contactDetail}
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
				title={detail.assignMembers}
				footer={null}
				centered={true}
				children={
					<AssignMemberModal
						defaultData={leadManagerDetail?.members}
						leadManagerDetail={leadManagerDetail}
						onChange={handleSelectedMembers}
						placeholder={placeHolder.serachMembersPH}
						selectedMembers={selectedMembers}
						handleDeleteMember={handleDeleteMember}
					/>
				}
				className={""}
			/>
			<ComposeEmail />

			<CustomModal
				isModalVisible={isSectionModalOpen}
				onCancel={() => dispatch(handleSectionDetailModal())}
				width={"60%"}
				title={detail.details}
				footer={null}
				className={""}
				children={
					<SectionDetail
						isSectionDetailLoading={isSectionDetailLoading}
						setLeadSectionId={setLeadSectionId}
						handleSelectedMembers={setMembersToSelectedMembers}
						handleContactDetailModal={() => {
							dispatch(
								handleContactDetailModal({
									open: true,
									add: false,
								})
							);
						}}
						handleMemberModal={id => {
							dispatch(
								handleAssignMemberModal({
									id,
								})
							);
						}}
						data={leadManagerSectionDetailData}
						onClickContact={value => {
							dispatch(
								handleContactDetailModal({
									open: true,
									add: value,
								})
							);
						}}
						loading={loading}
					/>
				}
			/>
		</div>
	);
}

export default BoardViews;
