import "./style.css";
import { Input } from "antd";
import { useEffect, useState ,useContext} from "react";
import {
	FormButton,
	FormButtonContainer,
	FormContainer,
	FormHeader,
	FormInput,
	FormInputContainer,
	FormLabel,
} from "../../../../../components/HrMenu/Administration/StyledComponents/adminForm";

import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext"
import { dictionaryList } from "../../../../../utils/localization/languages";

export default function Form({
	data,
	onSubmit,
	loading,
	setClearButton,
	clearButton,
}) {

	const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,defaultHiringCriteria,sharedLabels,Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration.grade.Grade);

	const [form, setForm] = useState(data);

	const handleClear = e => {
		setForm({ ...form, question: "" });
		setClearButton(false);
	};

	const handelChangeQuestion = e => {
		if (e.target.value.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		setForm({ ...form, question: e.target.value });
	};

	useEffect(() => {
		setForm(data);
	}, [data]);

	return (
		<FormContainer>
			<FormHeader>{administration.defaultHiringCriteria.default}</FormHeader>
			<FormInputContainer>
				<FormInput>
					<FormLabel>{administration.defaultHiringCriteria.question}</FormLabel>
					<Input
						placeholder={administration.defaultHiringCriteria.enterQuestions}
						value={form.question}
						onChange={handelChangeQuestion}
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
							{administration.defaultHiringCriteria.save}
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
							{administration.defaultHiringCriteria.Add}
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
							{administration.defaultHiringCriteria.clear}
					</FormButton>
				)}
			</FormButtonContainer>
		</FormContainer>
	);
}
