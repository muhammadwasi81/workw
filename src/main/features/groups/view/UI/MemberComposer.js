import React, { useState, useEffect } from "react";
import { Form, message, Select, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import { DepartmentMemberTypeList } from "../../constant/index";
import MemberSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import { getNameForImage } from "../../../../../utils/base";
import "./style.css";

function MemberComposer(props) {
	const { Option } = Select;
	const { Direction, form, memberList } = props;
	const dispatch = useDispatch();
	const employees = useSelector(state => state.sharedSlice.employees);
	// const [value, setValue] = useState([]);

	useEffect(() => {
		fetchEmployees("", 0);
	}, []);

	// useEffect(() => {
	// 	setValue(defaultData);
	// }, [defaultData]);

	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};

	const selectedData = (data, obj) => {
		// setValue(data);
		handleMember(obj[0]);
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
	const handleAdd = () => {
		if (newState.member && newState.memberType) {
			props.handleAdd(newState);
			form.setFieldsValue({ members: [], memberType: null });
			setNewState({
				member: {},
				memberType: null,
			});
			// setValue([]);
		} else {
			message.error("Please Fill Required Fields");
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
						placeholder={props.placeholder.membersPh}
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
						// dataVal={value}
						name="members"
						showSearch={true}
						direction={Direction}
						rules={[
							{
								required: memberList ? false : true,
								message: props.error.members,
							},
						]}
					/>
				</div>
				<div className="memberTypeInput">
					<Form.Item
						name="memberType"
						rules={[
							{
								required: memberList ? false : true,
								message: props.error.type,
							},
						]}
					>
						<Select
							placeholder={props.placeholder.typePh}
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
						style={{
							borderRadius: 4,
							border: 0,
							padding: "10px",
						}}
						onClick={handleAdd}
					/>
				</div>
			</div>
		</>
	);
}

export default MemberComposer;
