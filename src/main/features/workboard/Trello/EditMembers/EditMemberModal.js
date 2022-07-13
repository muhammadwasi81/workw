import React from "react";
import { useSelector } from "react-redux";
import MemberModal from "../../Modal/MemberModal";
import { openMembersModal } from "../../store/slice";

function EditMemberModal({ isOpen, onSave, showModal }) {
	const memberDefaulIds = useSelector(
		state => state.trelloSlice.memberDefaulIds
	);
	return (
		<MemberModal
			onSave={onSave}
			isModalVisible={isOpen}
			value={memberDefaulIds}
			showModal={showModal}
		/>
	);
}

export default EditMemberModal;
