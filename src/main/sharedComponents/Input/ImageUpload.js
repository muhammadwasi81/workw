import React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function getBase64(img, callback) {
	console.log(img, "FROM BASE 64");
	if (img && img.type.match("image.*")) {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(img);
	}
}

function beforeUpload(file) {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
}

export default class Avatar extends React.Component {
	state = {
		loading: false,
	};

	handleChange = info => {
		if (beforeUpload(info.file)) {
			getBase64(info.file, imageUrl =>
				this.setState(
					{
						imageUrl,
					},
					() => {
						this.props.setFile(info.fileList);
					}
				)
			);
		} else {
			console.log("IN-VALID FILE");
		}
	};

	render() {
		const { loading, imageUrl } = this.state;
		const uploadButton = (
			<div>
				{loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		);
		return (
			<Upload
				name="avatar"
				accept=".png, .jpeg, .jpg"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				// action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				beforeUpload={() => false}
				onChange={this.handleChange}
			>
				{imageUrl ? (
					<img
						src={imageUrl}
						alt="avatar"
						style={{
							width: "100%",
							height: "100%",
							borderRadius: "10px",
						}}
					/>
				) : (
					uploadButton
				)}
			</Upload>
		);
	}
}
