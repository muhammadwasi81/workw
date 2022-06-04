import React from "react";
import "./call.css";
import store from "../../../store/store";
import { callSlice } from "../../../store/appReducer/callSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

export function CallMiniContainer() {
	const navigate = useNavigate();

	function maximize() {
		store.dispatch(callSlice.actions.minimizeCall({ minimize: false }));
		navigate(ROUTES.CALL.KONNECT_CALL);
	}

	return <div className="minicall" onClick={maximize} />;
}
