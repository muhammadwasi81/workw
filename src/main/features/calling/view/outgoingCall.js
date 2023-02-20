import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Tune from '../../../../content/audio/callertune.mp3'
import { callingWindowOptions, handleOpenCallWindow } from "../../../../utils/base";
import { servicesUrls } from "../../../../utils/services/baseURLS";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { OUTGOING_CALL_STATUS_MESSAGE } from "../constant/enum";
import { InitializeCallingSocket } from "../services/socket";
import { handleIncomingCall, handleOutgoingCall } from "../store/slice";

export default function OutgoingCall() {
	const outgoingCallData = useSelector(state => state.callingSlice.outgoingCallData);
	const dispatch = useDispatch();
	const callMember = outgoingCallData.members[0]
	useEffect(() => {
		if (outgoingCallData.members.length > 1) {
			handleOpenCallWindow(servicesUrls.callingSocket + outgoingCallData.roomId, callingWindowOptions);
			handleClose();
		}
	}, [outgoingCallData]);

	const handleClose = () => {
		dispatch(handleOutgoingCall({
			isOpen: false,
			members: [],
			status: 0,
			roomId: ""
		}))
	}

	console.log(outgoingCallData)

	return (
		<>
			{
				outgoingCallData.isOpen &&
				outgoingCallData.members.length === 1 &&
				<div className="app-modal-without-block">
					<div className="outgoing-call">
						<div className="section-1">
							<Avatar
								round={true}
								size={36}
								name={callMember.name}
								src={callMember.image}
							/>
						</div>

						<div className="section-2">
							<div className="caller-name">{callMember.name}</div>
							<div className="call-status">
								{OUTGOING_CALL_STATUS_MESSAGE[outgoingCallData.status]}
							</div>
							<audio controls hidden loop autoPlay>
								<source src={Tune} type="audio/mpeg" />
							</audio>
						</div>


						<div className="call-footer">
							<div className="call-options">

								<div className="call-opt-btn hang-up rd"
									onClick={() => handleClose()}
								>
									<i className="ic-phone" />
								</div>

							</div>
						</div>
					</div>
				</div>
			}

		</>

	)
}
