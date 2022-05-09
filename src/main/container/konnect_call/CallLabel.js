import React, { useState } from "react";
import "./call.css";
import { CallLabelView } from "./KonnectCall.style";
import store from "../../../store/store";
import { callSlice } from "../../../store/appReducer/callSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

export function CallLabel({ type = "Meeting" }) {
	const [time, setTime] = useState(new Date());
	const navigate = useNavigate();

	setInterval(() => {
		setTime(new Date());
	}, 1000);

	function minimizeCall() {
		store.dispatch(callSlice.actions.minimizeCall({ minimize: true }));
		navigate(ROUTES.ROOT);
	}

	return (
		<CallLabelView onClick={minimizeCall}>
			<p>
				{time.toLocaleTimeString("en-us", {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</p>
			<p>|</p>
			<p>{type}</p>
		</CallLabelView>
	);
}
