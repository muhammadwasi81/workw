import { useContext, useEffect, useState } from "react";
import Card from "../../../sharedComponents/Card/Card";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import AccessRoleComposer from "./AccessRoleComposer";
import { message, Skeleton, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllBussinessFeatures,
	getAllUserTypes,
} from "../../../../utils/Shared/store/actions";
import "../style/accessrole.css";
import {
	addAccessRole,
	getAccessRoleById,
	getAllAccessRoles,
	updateAccessRoleById,
} from "../store/action";
// import CustomTable from "./CustomTable";
// import { EditFilled } from "@ant-design/icons";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { tableColumns } from "./tableColumns";

const initialFormData = {
	name: "",
	description: "",
	features: [],
};

function AccessRole() {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { administration, Direction, sharedLabels } =
		dictionaryList[userLanguage];
	const [openDrawer, setOpenDrawer] = useState(false);
	const [isDefault, setIsDefault] = useState(false);
	const [formData, setFormData] = useState(initialFormData);
	const [isEdited, setIsEdited] = useState(false);
	const [defaultData, setDefaultData] = useState();
	const [form] = Form.useForm();
	const [id, setId] = useState();
	const dispatch = useDispatch();
	const {
		loader: loading,
		success,
		accessRoles,
		singleAccessRole,
	} = useSelector(state => state.accessRolesSlice);

	useEffect(() => {
		dispatch(getAllBussinessFeatures());
		dispatch(getAllAccessRoles());
		dispatch(getAllUserTypes());
	}, [dispatch]);

	const onSubmitData = finalData => {
		if (isEdited) {
			dispatch(updateAccessRoleById(finalData));
		} else {
			dispatch(addAccessRole(finalData));
		}
	};
	useEffect(() => {
		if (success) {
			if (isEdited && id) {
				message.success("Access Role Updated Successfuly...");
				return;
			}
			message.success("Access Role Added Successfuly...");
		}
	}, [success, id, isEdited]);

	// const onActionClick = (text, record) => {
	// 	const id = record.id;
	// 	// console.log("record", record);
	// 	setIsDefault(record.isDefault);
	// 	setFormData(prevData => ({
	// 		...prevData,
	// 		name: record.name,
	// 		description: record.description,
	// 	}));
	// 	dispatch(getAccessRoleById(id));
	// 	toggleDrawer();
	// };

	// const toggleDrawer = () => {
	// 	setOpenDrawer(!openDrawer);
	// };

	useEffect(() => {
		if (
			singleAccessRole &&
			singleAccessRole.features &&
			singleAccessRole.features.length > 0
		) {
			let defaultData = formData;
			defaultData.features = singleAccessRole.features;
			let features = JSON.stringify(defaultData.features);
			features = JSON.parse(features);
			features &&
				features.forEach(data => {
					if (data.name) {
						delete data.name;
					}
				});
			features.sort((a, b) => {
				return a.id - b.id;
			});
			defaultData.features = features;
			setDefaultData(defaultData);
		}
	}, [singleAccessRole, formData]);

	const handleEdit = data => {
		// console.log("data", data);
		setId(data.id);
		form.resetFields();
		setIsDefault(data.isDefault);
		setFormData(prevData => ({
			...prevData,
			// id: data.id,
			name: data.name,
			roleTypeId: data.roleTypeId,
			description: data.description,
		}));
		dispatch(getAccessRoleById(data.id));
		setOpenDrawer(true);
		setIsEdited(true);
	};
	useEffect(() => {
		if (!openDrawer) {
			setIsEdited(false);
			setIsDefault(false);
			setFormData(initialFormData);
		}
		// console.log("reset field");

		form.resetFields();
	}, [openDrawer, form]);

	return (
		<div className="access_role_container w-full">
			{/* <h1>abc</h1> */}
			<Card>
				<div className="w-full">
					<div
						className={`flex ${
							Direction === "rtl"
								? "justify-start"
								: "justify-end"
						}`}
					>
						<SideDrawer
							title={
								administration.accessRole.Drawer
									.CreateAccessRole
							}
							buttonText={
								administration.accessRole.Button.AddAccessRole
							}
							success={success}
							openDrawer={openDrawer}
							setOpenDrawer={setOpenDrawer}
							setIsEdited={setIsEdited}
							form={form}
							isAccessDrawer={true}
							children={
								<AccessRoleComposer
									isDefault={isDefault}
									onSubmitData={onSubmitData}
									formData={formData}
									isEdited={isEdited}
									openDrawer={openDrawer}
									id={id}
									form={form}
									defaultData={defaultData}
								/>
							}
						/>
					</div>
				</div>

				<AdminTable
					bordered
					columns={tableColumns(
						handleEdit,
						id,
						accessRoles,
						Direction,
						sharedLabels
					)}
					dataSource={accessRoles}
					pagination={false}
					direction={Direction}
					rowKey="id"
					size="small"
					scroll={{ x: true }}
					locale={
						loading && {
							emptyText: (
								<Skeleton.Input
									active="true"
									size="small"
									block={true}
									loading={loading}
									round="true"
									shape="circle"
									style={{ width: "100%", marginBottom: 2 }}
								/>
							),
						}
					}
				/>
			</Card>
		</div>
	);
}

export default AccessRole;
