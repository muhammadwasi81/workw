import { Button, Form, Input } from "antd";
import React, { useState, useContext, useEffect } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import { useDispatch } from "react-redux";
import NewCustomSelect from "../../../../sharedComponents/CustomSelect/newCustomSelect";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { PostPrivacyType } from "../../../../../utils/Shared/enums/enums";
import { addDocument } from "../../store/actions";
import { DOCUMENT_ENUM } from "../../constant";
import { useSelector } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { modifySelectData } from "../../../../../utils/base";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";

const CreateMilegrid = ({
	isOpen,
	handleClose,
	referenceId,
	referenceType,
}) => {
	const dispatch = useDispatch();
	const loader = useSelector(state => state.documentSlice.loader);
	const ParentId = useSelector(state => state.documentSlice.parentId);
	const [form] = Form.useForm();
	const [privacyId, setPrivacyId] = useState(PostPrivacyType.PUBLIC);
	const [value, setValue] = useState([]);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);

	const employees = useSelector(state => state.sharedSlice.employees);

	const selectedData = (data, obj) => {
		setValue(data);
		handleMember(obj);
	};
	useEffect(() => {
		fetchEmployees("", 0);
	}, []);

	const handleMember = val => {
		setNewState({
			...newState,
			members: [...val],
		});
	};

	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};

	const [newState, setNewState] = useState({
		members: [],
		memberType: null,
	});

	useEffect(() => {
		if (employees.length > 0 && !isFirstTimeDataLoaded) {
			setIsFirstTimeDataLoaded(true);
			setFirstTimeEmpData(employees);
		}
	}, [employees]);

	const onPrivacyChange = value => {
		setPrivacyId(value);
	};

	const onFinish = values => {
		console.log(values);
		let readers = values.readers ? modifySelectData(values.readers) : [];
		let collaborators = values.collaborators
			? modifySelectData(values.collaborators)
			: [];
		let members = [
			...readers.map(item => ({
				memberId: item,
				memberType: 1,
				memberRightType: DOCUMENT_ENUM.MEMBER_RIGHT_TYPE.READER,
			})),
			...collaborators.map(item => ({
				memberId: item,
				memberType: 1,
				memberRightType: DOCUMENT_ENUM.MEMBER_RIGHT_TYPE.COLLABRATOR,
			})),
		];
		let payload = {
			name: values.name,
			description: values.description,
			approvers: values.approvers
				? modifySelectData(values.approvers).map(item => ({
						approverId: item,
				  }))
				: [],
			members: members,
			parentId: ParentId,
			documentType: DOCUMENT_ENUM.DUCOMENT_TYPE.grid,
			privacyId: privacyId,
			referenceId,
			referenceType,
		};
		dispatch(addDocument({ payload, form }));
	};

	const onFinishFailed = errorInfo => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<SideDrawer
				title={"Create Milegrid"}
				isDisable={true}
				isOpen={isOpen}
				isAccessDrawer={false}
				handleClose={handleClose}
			>
				<Form
					form={form}
					name="addMilegrid"
					labelCol={{
						span: 24,
					}}
					wrapperCol={{
						span: 24,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label={"Name"}
						name="name"
						labelPosition="top"
						rules={[
							{
								required: true,
								message: "Name",
							},
						]}
					>
						<TextInput placeholder={"Enter Name"} />
					</Form.Item>

					<Form.Item label={"Description"} name="description">
						<Input.TextArea placeholder={"Enter Description"} />
					</Form.Item>

					<Form.Item
						name="approvers"
						label={"Approvers"}
						showSearch={true}
						style={{ marginBottom: "0px" }}
					>
						<CustomSelect
							style={{ marginBottom: "0px" }}
							data={firstTimeEmpData}
							selectedData={selectedData}
							canFetchNow={isFirstTimeDataLoaded}
							fetchData={fetchEmployees}
							placeholder={"Approvers"}
							mode={"multiple"}
							isObject={true}
							loadDefaultData={false}
							optionComponent={opt => {
								return (
									<>
										<Avatar
											name={opt.name}
											src={opt.image}
											round={true}
											width={"30px"}
											height={"30px"}
										/>
										{opt.name}
									</>
								);
							}}
							dataVal={value}
							name="approvers"
							showSearch={true}
							// direction={Direction}
						/>
					</Form.Item>

					<Form.Item
						name="collaborator"
						label={"Collaborators"}
						showSearch={true}
						style={{ marginBottom: "0px" }}
					>
						<CustomSelect
							style={{ marginBottom: "0px" }}
							data={firstTimeEmpData}
							selectedData={selectedData}
							canFetchNow={isFirstTimeDataLoaded}
							fetchData={fetchEmployees}
							placeholder={"collaborators"}
							mode={"multiple"}
							isObject={true}
							loadDefaultData={false}
							optionComponent={opt => {
								return (
									<>
										<Avatar
											name={opt.name}
											src={opt.image}
											round={true}
											width={"30px"}
											height={"30px"}
										/>
										{opt.name}
									</>
								);
							}}
							dataVal={value}
							name="collaborators"
							showSearch={true}
						/>
					</Form.Item>

					{privacyId === PostPrivacyType.PRIVATE && (
						<Form.Item
							name="readers"
							label={"Readers"}
							showSearch={true}
							// direction={Direction}
						>
							<CustomSelect
								style={{ marginBottom: "0px" }}
								data={firstTimeEmpData}
								selectedData={selectedData}
								canFetchNow={isFirstTimeDataLoaded}
								fetchData={fetchEmployees}
								placeholder={"Readers"}
								mode={"multiple"}
								isObject={true}
								loadDefaultData={false}
								optionComponent={opt => {
									return (
										<>
											<Avatar
												name={opt.name}
												src={opt.image}
												round={true}
												width={"30px"}
												height={"30px"}
											/>
											{opt.name}
										</>
									);
								}}
								dataVal={value}
								name="readers"
								showSearch={true}
							/>
						</Form.Item>
					)}
					<Form.Item>
						<div className="flex items-center gap-2">
							<PrivacyOptions
								privacyId={privacyId}
								onPrivacyChange={onPrivacyChange}
							/>
							<Button
								type="primary"
								size="medium"
								className="ThemeBtn"
								block
								htmlType="submit"
								title={"Create Milepad"}
								loading={loader}
							>
								{" "}
								{"Create"}{" "}
							</Button>
						</div>
					</Form.Item>
				</Form>
			</SideDrawer>
		</>
	);
};

export default CreateMilegrid;
