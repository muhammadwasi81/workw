import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Tune from '../../../../content/audio/recivecalltune.mp3'
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { InitializeCallingSocket } from "../services/socket";
import { handleAddCallWindow, handleIncomingCall } from "../store/slice";

export default function IncomingCall() {
	const incomingCallData = useSelector(state => state.callingSlice.incomingCallData);
	const userSlice = useSelector(state => state.userSlice);
	const userDetail = incomingCallData?.data?.callInitializer && incomingCallData?.data?.callInitializer
	const dispatch = useDispatch();
	const [timerState, setTimerState] = useState(null);

	const handleOpenCallWindow = (callURL) => {
		dispatch(handleIncomingCall(null));
		dispatch(handleAddCallWindow({
			callUrl: `${callURL}?token=${userSlice.token}`,
			isOpen: true
		}));
	};

	const handleAccept = (callURL) => {
		const callingSocket = InitializeCallingSocket.getInstance();
		callingSocket.acceptCall(userDetail?.id);
		handleOpenCallWindow(callURL)
	}
	const handleDecline = () => {
		const callingSocket = InitializeCallingSocket.getInstance();
		callingSocket.declineCall(userDetail?.id);
		dispatch(handleIncomingCall(null))
	}

	return (
		<>
			{
				incomingCallData &&
				<div className="app-modal">
					<div className="call-dialog">
						<div className="caller-det">
							<Avatar
								round={true}
								size={72}
								name={userDetail?.name}
								src={userDetail?.image}
							/>
							<div className="caller-name">{userDetail?.name}</div>
							<div className="call-status">
								{"Incoming call"}
							</div>
							<audio controls hidden loop autoPlay>
								<source src={Tune} type="audio/mpeg" />
							</audio>
						</div>
						<div className="call-footer" style={{ position: "unset" }}>
							<div className="call-options">
								{/* {mode === STRINGS.TYPES.CALL.MODE.VIDEO && ( */}
								<div className="call-opt-btn gr"
									onClick={() => handleAccept(incomingCallData.data.CallURL)}
								//  onClick={() => this.acceptCall(STRINGS.TYPES.CALL.MODE.VIDEO_ANSWER)}
								>
									<i className="ic-facetime" style={{ width: "14px", height: "14px" }} />
								</div>
								{/* )} */}
								<div className="call-opt-btn gr"
									onClick={() => handleAccept(incomingCallData.data.CallURL)}
								//  onClick={() => this.acceptCall(STRINGS.TYPES.CALL.MODE.ANSWER)}
								>
									<i className="ic-phone" />
								</div>
								<div className="call-opt-btn hang-up rd"
									onClick={() => handleDecline()}
								//  onClick={this.declineCall}
								>
									<i className="ic-phone" />
								</div>
							</div>
						</div>
					</div>
				</div>
			}
			{
				false &&
				// For Missed Call view here
				<div className="app-modal">
					<div className="call-dialog">
						<div className="caller-det">
							{/* <Avatar size={72} src={sender.profile_picture} name={sender.name}/> */}
							<Avatar
								round={true}
								size={72}
								name={"Abubakar Memon"}
								src={"https://konnect.im/upload/2022/10/88c35581-97aa-4e88-be91-584a667fd5eb.jpg"}
							/>
							<div className="caller-name">{"sender.name"}</div>
							<div className="call-status">
								Missed Call
							</div>
						</div>
					</div>
				</div>
			}
		</>

	)
}
