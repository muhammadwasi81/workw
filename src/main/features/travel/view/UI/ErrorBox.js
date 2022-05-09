import React from "react";
import { message, Button, Space } from "antd";
import { Alert } from "antd";

function ErrorBox(props) {
	const success = () => {
		message.success("This is a success message");
	};

	const error = () => {
		message.error("This is an error message");
	};

	const warning = () => {
		message.warning("This is a warning message");
	};
	return <div>ErrorBox</div>;
}

export default ErrorBox;
