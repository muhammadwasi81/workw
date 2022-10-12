import React, { useState, useContext, useEffect } from "react";
import { Avatar, Form, message, Select } from "antd";
// import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
// import Select from "../../../sharedComponents/Select/Select";
import { DepartmentMemberTypeList } from "../constant/index";
import { projectsDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { getNameForImage } from "../../../../utils/base";

function MemberComposer(props) {
	const { Option } = Select;
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, projectsDictionary } = projectsDictionaryList[
		userLanguage
	];
	const employees = useSelector(state => state.sharedSlice.employees);
	const dispatch = useDispatch();
	useEffect(() => {
		fetchEmployees("", 0);
	}, []);
	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};

	const [newState, setNewState] = useState({
		member: {},
		memberType: null,
	});

	const handleMember = val => {
		setNewState({
			...newState,
			member: val,
		});
	};

	const handleMemberType = val => {
		setNewState({
			...newState,
			memberType: val,
		});
	};
	const selectedData = (data, obj) => {
		handleMember(obj[0]);
	};
	const handleAdd = () => {
		if (newState.member && newState.memberType) {
			props.handleAdd(newState);
			props.form.setFieldsValue({ members: [], memberType: null });
			setNewState({
				member: [],
				memberType: null,
			});
		} else {
			message.error("Please add member and member type.");
		}
	};

	return (
		<>
			<div className="flex justify-between gap-4">
				<div className="w-full">
					<MemberSelect
						data={employees}
						selectedData={selectedData}
						canFetchNow={employees && employees.length > 0}
						fetchData={fetchEmployees}
						placeholder={"Search members"}
						mode={""}
						isObject={true}
						loadDefaultData={true}
						optionComponent={opt => {
							return (
								<>
									<Avatar
										src={opt.image}
										className="!bg-black"
									>
										{getNameForImage(opt.name)}
									</Avatar>
									{opt.name}
								</>
							);
						}}
						name="members"
						showSearch={true}
						// rules={[
						// 	{
						// 		required: true,
						// 		message: "Please add members",
						// 	},
						// ]}
					/>
				</div>
				<div className="memberTypeInput">
					<Form.Item
						name="memberType"
						// rules={[
						// 	{
						// 		required: true,
						// 		message: props.error.type,
						// 	},
						// ]}
					>
						<Select
							placeholder={props.placeholder.type}
							onChange={handleMemberType}
							style={{
								width: "100%",
								borderRadius: "5px",
							}}
							size="large"
						>
							{DepartmentMemberTypeList().map(({ id, name }) => (
								<Option value={id}>{name}</Option>
							))}
						</Select>
					</Form.Item>
				</div>

				<div className="">
					<PlusOutlined
						className="ThemeBtn text-xl"
						size="large"
						style={{ borderRadius: 4, border: 0, padding: "10px" }}
						onClick={handleAdd}
					/>
				</div>
			</div>
		</>
	);
}

export default MemberComposer;
