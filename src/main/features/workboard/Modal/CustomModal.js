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
	className,
	bodyStyle,
}) {
	return (
		<Modal
			title={title}
			open={isModalVisible}
			centered={centered}
			footer={footer}
			destroyOnClose={destroyOnClose}
			onCancel={onCancel}
			width={width}
			className={className}
		>
			{children}
		</Modal>
	);
}

export default CustomModal;
