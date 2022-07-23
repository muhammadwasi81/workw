import React from "react";
import CustomModal from "../CustomModal";
import ModalTitle from "../UI/ModalTitle";
import LabelInput from "./LabelInput";

function LabelModal({ showLabelModal, isLabelModalVisible }) {
	const labelColors = [
		{ color: "#61bd4f", name: "", id: 1, checked: false },
		{ color: "#f2d600", name: "", id: 2, checked: true },
		{ color: "#ff9f1a", name: "", id: 3, checked: true },
		{ color: "#eb5a46", name: "", id: 4, checked: true },
		{ color: "#c377e0", name: "", id: 5, checked: true },
		{ color: "#0079bf", name: "", id: 6, checked: true },
		{ color: "#00c2e0", name: "", id: 7, checked: true },
		{ color: "#51e898", name: "", id: 8, checked: true },
		{ color: "#ff78cb", name: "", id: 9, checked: true },
		{ color: "#344563", name: "", id: 10, checked: true },
	];
	return (
		<CustomModal
			title={<ModalTitle title={"Labels"} />}
			centered={false}
			isModalVisible={isLabelModalVisible}
			onCancel={showLabelModal}
			footer={null}
		>
			<>
				<div>Labels</div>
				<div className="">
					{labelColors.map(label => (
						<LabelInput label={label} />
					))}
				</div>
			</>
		</CustomModal>
	);
}

export default LabelModal;
