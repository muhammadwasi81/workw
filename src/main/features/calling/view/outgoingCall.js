import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Tune from '../../../../content/audio/callertune.mp3'
import { callingWindowOptions, handleOpenCallWindow } from "../../../../utils/base";
import { servicesUrls } from "../../../../utils/services/baseURLS";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { CALL_MEDIA_TYPE, OUTGOING_CALL_STATUS_MESSAGE } from "../constant/enum";
import { InitializeCallingSocket } from "../services/socket";
import { handleIncomingCall, handleOutgoingCall } from "../store/slice";

export default function OutgoingCall() {
	const outgoingCallData = useSelector(state => state.callingSlice.outgoingCallData);
	const videoRef = useRef();
	const dispatch = useDispatch();
	const callMember = outgoingCallData.members[0];
	const [stream, setStream] = useState(null);

	useEffect(() => {
		if (outgoingCallData.members.length > 1) {
			handleOpenCallWindow(servicesUrls.callingSocket + outgoingCallData.roomId, callingWindowOptions);
			handleClose();
		}
		outgoingCallData.isOpen &&
			outgoingCallData.members.length === 1 &&
			outgoingCallData.mediaType === CALL_MEDIA_TYPE.VIDEO && getMedia();

		outgoingCallData.isOpen === false &&
			outgoingCallData.mediaType === CALL_MEDIA_TYPE.VIDEO && stopVideo();
	}, [outgoingCallData]);

	const handleClose = () => {
		dispatch(handleOutgoingCall({
			isOpen: false,
			members: [],
			status: 0,
			roomId: "",
			mediaType: outgoingCallData.mediaType
		}))
	}
	async function getMedia() {
		try {
			let myStream = await navigator?.mediaDevices?.getUserMedia?.({ video: true });
			setStream(myStream)
			let video = videoRef.current;
			video.srcObject = myStream;
			video.play();
		} catch (err) {
			console.log(err)
		}
	}
	async function stopVideo() {
		try {
			stream?.getTracks()?.forEach(function (track) {
				track.stop();
			});
		} catch (err) {
			console.log(err)
		}
	}
	console.log(outgoingCallData, "outgoingCallData")

	const axis = {
		x_axis: 0,
		y_axis: 0,
	};
	return (
		<>
			{
				outgoingCallData.isOpen &&
				outgoingCallData.members.length === 1 &&
				<Draggable
					Draggable
					defaultPosition={{ x: axis.x_axis, y: axis.y_axis }}
					handle=".outgoing-call"
					// grid={[25, 25]}
					scale={1}
					// bounds="parent"
					// allowAnyClick={true}
				>
					<div className="app-modal-without-block">
						<div className="outgoing-call">
							<div className="outgoing-call-body">
								<div className="section-1">
									<Avatar
										round={true}
										size={36}
										name={callMember?.name}
										src={callMember?.image}
									/>
								</div>

								<div className="section-2">
									<div className="caller-name">{callMember?.name}</div>
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

							{outgoingCallData.mediaType === CALL_MEDIA_TYPE.VIDEO &&
								<div>
									<video ref={videoRef} />
								</div>
							}
						</div>
					</div>
				</Draggable>
			}

		</>

	)
}
