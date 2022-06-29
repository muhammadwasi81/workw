import { EditOutlined } from "@ant-design/icons";
import React from "react";
import CustomModal from "../CustomModal";
import ModalTitle from "../UI/ModalTitle";

function LabelModal({ showLabelModal, isLabelModalVisible }) {
	const labelColors = [
		{ color: "bg-green-400", name: "Green", id: 1 },
		{ color: "bg-yellow-300	", name: "", id: 2 },
		{ color: "bg-green-200	", name: "", id: 3 },
		{ color: "bg-red-500 ", name: "", id: 4 },
		{ color: "bg-purple-500	", name: "", id: 5 },
		{ color: "bg-blue-500	", name: "", id: 6 },
		{ color: "bg-sky-500", name: "", id: 7 },
		{ color: "bg-green-300", name: "", id: 8 },
		{ color: "bg-pink-400	", name: "", id: 9 },
		{ color: "bg-zinc-500	", name: "", id: 10 },
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
					{labelColors.map(color => (
						<div className="flex items-center gap-2 w-full">
							<div
								className={`${color.color} h-10 text-white font-bold p-2 w-full my-1 rounded-sm cursor-pointer hover:border-l-lime-300 hover:border-l-8 `}
							>
								{color.name}
							</div>
							<EditOutlined className="cursor-pointer hover:bg-neutral-100 rounded-sm p-2" />
						</div>
					))}
				</div>
			</>
		</CustomModal>
	);
}

export default LabelModal;
