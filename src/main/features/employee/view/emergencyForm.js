// import { UploadOutlined } from "@ant-design/icons";
import { Select, Input, DatePicker } from "antd";
import React, { useContext } from "react";
// import { useState } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import * as S from "../Styles/employee.style";
import SharedSelect from "../../../sharedComponents/Select/Select";
import { relations } from "../../../../utils/Shared/enums/enums";
// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const columns = [
// 	{
// 		title: "degree",
// 		dataIndex: "degree",
// 		key: "degree",
// 	},
// 	{
// 		title: "board",
// 		dataIndex: "board",
// 		key: "board",
// 	},
// 	{
// 		title: "start",
// 		dataIndex: "start",
// 		key: "start",
// 	},
// 	{
// 		title: "end",
// 		dataIndex: "end",
// 		key: "end",
// 	},
// ];
// const validateMessages = {
// 	required: "${label} is required!",
// };
const EmergencyForm = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { employees, Direction } = dictionaryList[userLanguage];
	const value = employees.EmergencyForm;
	const placeholder = employees.placeholders;

	// const [emergenctContact, setEmergencyContact] = useState({
	// 	name: "",
	// 	number: "",
	// 	address: "",
	// 	relation: "",
	// });

	return (
		<>
			<S.ContentDivider
				orientation={Direction === "ltr" ? "left" : "right"}
			>
				{value.EmergencyInfo}
			</S.ContentDivider>

			<S.FormContainer name="emergencyContacts">
				<S.EFormItem
					rules={[{ required: true }]}
					name="name"
					label={value.Name}
					direction={Direction}
				>
					<Input placeholder={placeholder.name} size="large" />
				</S.EFormItem>
				<S.EFormItem
					rules={[{ required: true }]}
					name="address"
					label={value.Address}
					direction={Direction}
				>
					<Input placeholder={placeholder.address} size="large" />
				</S.EFormItem>
				<S.EFormItem
					rules={[{ required: true }]}
					name="contactNo"
					label={value.Number}
					direction={Direction}
				>
					<Input placeholder={placeholder.number} size="large" />
				</S.EFormItem>

				<S.EFormItem
					rules={[{ required: true }]}
					name="relation"
					label={value.Relation}
					direction={Direction}
				>
					<SharedSelect
						data={relations}
						placeholder={placeholder.selectRelation}
						size={"large"}
					/>
				</S.EFormItem>
			</S.FormContainer>
		</>
	);
};

export default EmergencyForm;
