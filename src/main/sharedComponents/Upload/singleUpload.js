import React from "react";
import "antd/dist/antd.min.css";
import "./style.css";
import { Upload, Modal, message } from "antd";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import produce from "immer";

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

class SingleUpload extends React.Component {
	state = {
		previewVisible: false,
		previewImage: "",
		previewTitle: "",
		fileList: [],
		defaultFileList:[]
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.url !== this.props.url && this.props.url.length > 0) {
			this.setState(
				produce(state => {
					state.fileList.push({ url: this.props.url });
				})
			);
		}
	}
	componentDidMount() {
		let {url, defaultFile} = this.props;
		if (url.length > 0) {
			this.setState(
				produce(state => {
					state.fileList.push({ url: url });
					// state.defaultFileList = defaultFile;
				})
			);
			this.setState({defaultFileList:defaultFile})
		}
	}

	handleCancel = () => this.setState({ previewVisible: false });

	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle:
				file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
		});
	};

	handleChange = info => {
		let { fileList } = info;
		const status = info.file.status;
		if (status !== "uploading") {
			// console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
		this.setState({ fileList });
		this.props.handleImageUpload(fileList);
	};
	render() {
		console.log(this.state, "FileList")
		console.log(this.props.defaultFile, "FileList")
		const {
			previewVisible,
			previewImage,
			fileList,
			previewTitle,
			defaultFileList
		} = this.state;
		const uploadButton = (
			<div className="px-1">
				<PlusOutlined />
				<div style={{ marginTop: 8 }}>{this.props.uploadText}</div>
			</div>
		);
		return (
			<>
				<Upload
					listType="picture-card"
					fileList={fileList}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
					className={`uploadImg ${this.props.position}`}
					accept="*"
					beforeUpload={() => false}
					multiple={this.props.multiple}
					maxCount={1}
					defaultFileList={defaultFileList}
				>
					{fileList.length === 1 ? null : uploadButton}
				</Upload>
				<Modal
					visible={previewVisible}
					title={previewTitle}
					footer={null}
					onCancel={this.handleCancel}
				>
					<img
						alt="example"
						style={{ width: "100%" }}
						src={previewImage}
					/>
				</Modal>
			</>
		);
	}
}

export default SingleUpload;
SingleUpload.propTypes = {
	multiple: PropTypes.bool,
	handleImageUpload: PropTypes.func,
	uploadText: PropTypes.string,
	position: PropTypes.string,
	url: PropTypes.string,
};
SingleUpload.defaultProps = {
	multiple: false,
	handleImageUpload: () => {},
	uploadText: "Upload",
	position: "justify-end",
	url: "",
};
