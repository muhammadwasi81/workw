import React from "react";
import { Upload } from "antd";

function UploadBgImg({ children, onUploadImg }) {
	return (
		<Upload
			className="w-full workboard_upload"
			onChange={onUploadImg}
			beforeUpload={() => false}
			showUploadList={false}
			maxCount={1}
		>
			{children}
		</Upload>
	);
}

export default UploadBgImg;
