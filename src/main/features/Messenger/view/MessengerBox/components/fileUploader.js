import { Form } from "antd";
import React, { useRef } from "react";
import SingleUpload from "../../../../../sharedComponents/Upload/singleUpload";

function FileUploader({
	inputRef,
	handleUpload,
	fileList,
	uploadButton = null,
	classes = "messengerUpload"
}) {
	return (
		<div className={classes}>
			<Form.Item area="true">
				<SingleUpload
					handleImageUpload={(files) => handleUpload(
						files.map(file => file.originFileObj)
					)}
					img="Add Image"
					position="flex-start"
					uploadText={"Upload"}
					multiple={true}
					inputRef={inputRef}
					uploadButton={uploadButton}
					localFileList={fileList}
				/>
			</Form.Item>
		</div>
	);
}
export default FileUploader;
