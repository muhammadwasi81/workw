import "./style.css";
import { Input } from "antd";
import { useEffect, useState,useContext } from "react";
import {
	FormButton,
	FormButtonContainer,
	FormContainer,
	FormHeader,
	FormInput,
	FormInputContainer,
	FormLabel,
} from "../../../../../components/HrMenu/Administration/StyledComponents/adminForm";

import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
//from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
//"../../utils/localization/languages";

export default function Form({
	data,
	onSubmit,
	loading,
	setClearButton,
	clearButton,
}) {
	const [form, setForm] = useState(data);

	const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,payrollGroup, Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration);


	const handleClear = e => {
		setForm({ ...form, description: "", name: "" });
		setClearButton(false);
	};

	const handelChangeName = e => {
		if (e.target.value.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		setForm({ ...form, name: e.target.value });
	};

	useEffect(() => {
		setForm(data);
	}, [data]);

	return (
		<FormContainer>
			<FormHeader>{administration.payrollGroup.PayrollGroup}</FormHeader>
			<FormInputContainer>
				<FormInput>
					<FormLabel>{administration.payrollGroup.name}</FormLabel>
					<Input
						placeholder={administration.payrollGroup.enterName}
						value={form.name}
						onChange={handelChangeName}
					/>
				</FormInput>
			</FormInputContainer>
			<FormButtonContainer>
				{form.id ? (
					<>
						<FormButton
							type="primary"
							size="medium"
							style={{}}
							className="formBtn"
							onClick={e => {
								onSubmit(form);
								setClearButton(false);
							}}
						>
							{administration.payrollGroup.save}
						</FormButton>
					</>
				) : (
					<FormButton
						type="primary"
						size="medium"
						style={{}}
						className="formBtn"
						onClick={e => {
							onSubmit(form);
							setClearButton(false);
						}}
						loading={loading}
					>
						{administration.payrollGroup.Add}
					</FormButton>
				)}
				{clearButton && (
					<FormButton
						type="primary"
						size="medium"
						style={{}}
						className="formBtn"
						onClick={handleClear}
					>
						{administration.payrollGroup.clear}
					</FormButton>
				)}
			</FormButtonContainer>
		</FormContainer>
	);
}
