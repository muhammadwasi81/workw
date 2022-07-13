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
	width,
}) {
	return (
		<Modal
			title={title}
			visible={isModalVisible}
			centered={centered}
			footer={footer}
			destroyOnClose={destroyOnClose}
			onCancel={onCancel}
			width={width}
		>
			{children}
		</Modal>
	);
}

export default CustomModal;
