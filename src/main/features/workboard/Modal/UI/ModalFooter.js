import { Button } from "antd";
import React from "react";

function ModalFooter({ onCancel, onSave }) {
	return (
		<div>
			<Button key="save" onClick={onSave} className="ThemeBtn">
				Save
			</Button>
		</div>
	);
}

export default ModalFooter;
