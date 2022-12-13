import React, { useState } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";

function MinutesOfMeetings({ data }) {
	const [showMilePad, setShowMilePad] = useState(false);
	const handleMilePad = () => {
		setShowMilePad(!showMilePad);
	};
	const user = useSelector(state => state.userSlice.user);
	return (
		<>
			<div
				className="p-2 border rounded-lg border-[#757d86]"
				onClick={handleMilePad}
			>
				Minutes of Meetings
			</div>
			<Modal
				open={showMilePad}
				onCancel={handleMilePad}
				closable={false}
				footer={null}
				className=""
				width={1000}
				centered={false}
				style={{ top: 20 }}
			>
				<div className="w-full h-[90vh]">
					<iframe
						src={`https://milepad.konnect.im/p/${data?.id}?userName=${user.name}`}
						className="w-full h-full"
					/>
				</div>
			</Modal>
		</>
	);
}

export default MinutesOfMeetings;
