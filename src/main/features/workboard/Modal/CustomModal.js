import React from "react";
import { Modal } from "antd";

function CustomModal({
	title,
	isModalVisible,
	children,
	centered,
	footer,
	destroyOnClose = true,
	onCancel,
}) {
	return (
		<Modal
			title={title}
			visible={isModalVisible}
			centered={centered}
			footer={footer}
			destroyOnClose={destroyOnClose}
			onCancel={onCancel}
		>
			{children}
		</Modal>
	);
}

export default CustomModal;
