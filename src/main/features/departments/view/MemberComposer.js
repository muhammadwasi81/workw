import React, { useState, useContext, useEffect } from "react";
import { Form, message } from "antd";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import Select from "../../../sharedComponents/Select/Select";
import { DepartmentMemberTypeList } from "../constant/index";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";

function MemberComposer(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, departmentDictionary } =
		departmentDictionaryList[userLanguage];

	const [newState, setNewState] = useState({
		user: {
			id: null,
		},
		memberType: null,
	});

	const handleMember = (val, obj) => {
		setNewState({
			...newState,
			user: obj,
		});
	};

	const handleMemberType = val => {
		setNewState({
			...newState,
			memberType: val,
		});
	};
	const handleAdd = () => {
		if (newState.user && newState.memberType) {
			//   Submit Here
			// After Submit
			props.handleAdd(newState);
			setNewState({
				user: {
					id: null,
				},
				memberType: null,
			});
		} else {
			message.error("Please Fill Required Fields");
		}
	};

	return (
		<>
			<div className="flex justify-between gap-4">
				<div className="w-full">
					<Form.Item
						name="members"
						showSearch={true}
						direction={Direction}
						rules={[{ required: true }]}
					>
						{/* <NewCustomSelect
              name="members"
              label={"Select Members"}
              showSearch={true}
              onChange={handleMember}
              direction={Direction}
              endPoint="api/Reference/GetAllUserReference"
              valueObject={true}
              requestType="get"
              value={user.id}
              defaultValue={user.id}
              placeholder={departmentDictionary.selectMember}
            /> */}
						<MemberSelect
							data={props.firstTimeEmpData}
							selectedData={handleMember}
							canFetchNow={props.isFirstTimeDataLoaded}
							fetchData={props.fetchEmployees}
							name="hodId"
							placeholder={departmentDictionary.selectMember}
							isObject={true}
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
						/>
					</Form.Item>
				</div>
				<div className="memberTypeInput">
					<Form.Item
						name="membersType"
						rules={[
							{
								required: true,
								message: "Select Members",
							},
						]}
					>
						<Select
							placeholder={"Select Members"}
							data={DepartmentMemberTypeList()}
							onChange={handleMemberType}
							style={{
								width: "100%",
								borderRadius: "5px",
							}}
							size="large"
						/>
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
