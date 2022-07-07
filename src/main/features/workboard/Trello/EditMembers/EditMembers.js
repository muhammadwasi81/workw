import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MemberModal from "../../Modal/MemberModal";
import { addListCardMembers, openMembersModal } from "../../store/slice";

function EditMembers() {
	const isOpen = useSelector(state => state.trelloSlice.addMember);
	const memberDefaulIds = useSelector(
		state => state.trelloSlice.memberDefaulIds
	);
	const addMemberCardId = useSelector(
		state => state.trelloSlice.addMemberCardId
	);
	const dispatch = useDispatch();

	const onSaveMembers = members => {
		dispatch(addListCardMembers({ members, cardId: addMemberCardId }));
		dispatch(openMembersModal({ addMember: !isOpen }));
	};
	// console.log("edit members", memberDefaulIds);
	return (
		<MemberModal
			onSave={onSaveMembers}
			showModal={() => {
				dispatch(openMembersModal({ addMember: !isOpen }));
			}}
			isModalVisible={isOpen}
			value={memberDefaulIds}
		/>
	);
}

export default EditMembers;
