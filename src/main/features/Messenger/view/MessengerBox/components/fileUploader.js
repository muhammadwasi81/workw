import { Form } from "antd";
import React, { useRef } from "react";
import SingleUpload from "../../../../../sharedComponents/Upload/singleUpload";

function FileUploader({inputRef}) {
	return (
		<div className="messengerUpload">
			<Form.Item area="true">
				<SingleUpload
					handleImageUpload={(data) => { console.log(data, "Files") }}
					img="Add Image"
					position="flex-start"
					uploadText={"Upload"}
					multiple={true}
					inputRef={inputRef}
					uploadButton={null}
					/>
			</Form.Item>
		</div>
	);
}
export default FileUploader;
