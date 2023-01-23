import React, { useEffect, useState } from "react";
import { Button, Form, Input, Skeleton } from "antd";
import WorkBoardMemberSelect from "./WorkBoardMemberSelect";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { useDispatch } from "react-redux";
// import { addWorkBoard, updateWorkBoard } from "../store/action";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { jsonToFormData } from "../../../../../utils/base";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import { addLeadManager, updateLeadManager } from "../../store/actions";
import { useSelector } from "react-redux";
function BoardComposer({
	isEdit,
	loading,
	dataLoading = false,
	dictionary,
	direction,
}) {
	const leadDetail = useSelector(
		state => state.leadMangerSlice.leadManagerDetail
	);
	const { placeHolder, labels } = dictionary;
	const { createGrp, updateGrp } = labels;
	const [form] = Form.useForm();
	const userId = useSelector(state => state.userSlice.user.id);
	const dispatch = useDispatch();

	const [image, setImage] = useState("");
	const [privacyId, setPrivacyId] = useState(1);

	const onFinish = values => {
		let members = values.members.map(member => {
			return { memberId: member };
		});
		let imgObj = { file: image, id: defaultUiid };
		let tempObj = { ...values };
		tempObj.members = members;
		tempObj.image = imgObj;
		tempObj.privacyId = privacyId;
		if (isEdit) {
			if (typeof image === "string" && image) {
				tempObj.image = { ...imgObj, id: leadDetail.imageId };
			}
			tempObj.id = leadDetail.id;
			dispatch(updateLeadManager(jsonToFormData(tempObj)));
			return;
		}
		dispatch(addLeadManager(jsonToFormData(tempObj)));
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	const onPrivacyChange = value => {
		setPrivacyId(value);
	};
	useEffect(() => {
		setImage("");
	}, []);

	useEffect(() => {
		if (leadDetail && isEdit) {
			// console.log("lead detail", leadDetail);
			form.setFieldsValue({ ...leadDetail });
			form.setFieldsValue({
				members: leadDetail.members
					.map(members => {
						return members.memberId;
					})
					.filter(member => member !== userId),
			});
			setImage(leadDetail.image);
			setPrivacyId(leadDetail.privacyId);
		}
	}, [form, leadDetail]);

	return (
		<Form
			name="lead manager form"
			layout="vertical"
			initialValues={{ name: "", description: "", members: [] }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			form={form}
			dir={direction}
			className={`${direction}`}
		>
			
			<Form.Item>
				<div className="flex items-center gap-2">
					{dataLoading ? (
						<>
							<Skeleton.Avatar
								active={true}
								size={"large"}
								shape={"square"}
							/>
							<Skeleton.Button
								active={true}
								size={"large"}
								shape={"square"}
								block
							/>
						</>
					) : (
						<>
							<PrivacyOptions
								privacyId={privacyId}
								onPrivacyChange={onPrivacyChange}
								labels={labels}
							/>
							<Button
								type="primary"
								htmlType="submit"
								block
								className="ThemeBtn"
								size="large"
								loading={loading}
							>
								{isEdit ? updateGrp : createGrp}
							</Button>
						</>
					)}
				</div>
			</Form.Item>
		</Form>
	);
}

export default BoardComposer;
