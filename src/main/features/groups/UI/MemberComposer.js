import React, { useState, useContext, useEffect } from "react";
import { Form, message, Select, Avatar } from "antd";
import { DepartmentMemberTypeList } from "../constant/index";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
// import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import { getNameForImage } from "../../../../utils/base";

function MemberComposer(props) {
	// const form = Form.useFormInstance();
	const { Option } = Select;
	const { defaultData, Direction, form } = props;
	const dispatch = useDispatch();
	const employees = useSelector(state => state.sharedSlice.employees);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const [value, setValue] = useState([]);

	useEffect(() => {
		fetchEmployees("", 0);
	}, []);

	useEffect(() => {
		setValue(defaultData);
		// setLoading(true);
	}, [defaultData]);

	useEffect(() => {
		if (employees.length > 0 && !isFirstTimeDataLoaded) {
			setIsFirstTimeDataLoaded(true);
			setFirstTimeEmpData(employees);
		}
	}, [employees]);

	const fetchEmployees = (text, pgNo) => {
		dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
	};

	const selectedData = (data, obj) => {
		setValue(data);
		handleMember(obj);
		// setMembers(obj);
		// onChange(data, obj);
	};
	const [newState, setNewState] = useState({
		members: [],
		memberType: null,
	});

	const handleMember = val => {
		setNewState({
			...newState,
			members: [...val],
		});
	};

	const handleMemberType = val => {
		setNewState({
			...newState,
			memberType: val,
		});
	};
	const handleAdd = () => {
		if (newState.members.length > 0 && newState.memberType) {
			props.handleAdd(newState);
			form.setFieldsValue({ members: [], memberType: null });
			setNewState({
				members: [],
				memberType: null,
			});
			setValue([]);
		} else {
			message.error("Please Fill Required Fields");
		}
	};

	return (
		<>
			<div className="flex justify-between gap-4">
				<div className="w-full">
					<MemberSelect
						data={firstTimeEmpData}
						selectedData={selectedData}
						canFetchNow={isFirstTimeDataLoaded}
						fetchData={fetchEmployees}
						placeholder={props.placeholder.membersPh}
						mode={""}
						isObject={true}
						loadDefaultData={true}
						optionComponent={opt => {
							return (
								<>
									<Avatar src={opt.image}>
										{getNameForImage(opt.name)}
									</Avatar>
									{opt.name}
								</>
							);
						}}
						dataVal={value}
						name="members"
						showSearch={true}
						direction={Direction}
						rules={[
							{
								required: true,
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
								required: true,
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
