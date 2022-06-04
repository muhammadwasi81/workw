import React from "react";
import "./call.css";
import Avatar from "../../../components/SharedComponent/Avatar/avatar";
import { MdCallEnd, MdCancel } from "react-icons/md";
import {
	Button,
	ButtonIcon,
	ButtonLabel,
	Heading1,
	Heading3,
	InComingCallModel,
	InComingCallView,
} from "./KonnectCall.style";
import { useDispatch, useSelector } from "react-redux";
import {
	acceptCallAction,
	declineCallAction,
} from "../../../store/appReducer/callSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

export function InComingCallContainer() {
	const dispatcher = useDispatch();
	const navigate = useNavigate();
	const { sender } = useSelector(({ call }) => call.callData);

	function declineCall() {
		dispatcher(declineCallAction());
	}

	function acceptCall() {
		navigate(ROUTES.CALL.KONNECT_CALL);
		dispatcher(acceptCallAction());
	}

	return (
		<InComingCallModel>
			<InComingCallView>
				<Avatar
					src={sender.profile_picture}
					name={sender.name}
					width={24 * 4}
					height={24 * 4}
					round={true}
				/>
				<div className="space" />
				<div>
					<Heading1>{sender.name}</Heading1>
					<Heading3>{sender.designation}</Heading3>
				</div>
				<div className="space" />
				<Button onClick={declineCall}>
					<ButtonIcon negative>
						<MdCancel size="24px" color="white" />
					</ButtonIcon>
					<ButtonLabel>Decline</ButtonLabel>
				</Button>
				<div className="space" />
				<Button onClick={acceptCall}>
					<ButtonIcon positive>
						<MdCallEnd
							size="24px"
							color="white"
							style={{ transform: "rotate(180deg)" }}
						/>
					</ButtonIcon>
					<ButtonLabel>Accept</ButtonLabel>
				</Button>
			</InComingCallView>
		</InComingCallModel>
	);
}
