import "./style.css";
import { Input, DatePicker } from "antd";
import { useEffect, useState } from "react";
import {
	FormButton,
	FormButtonContainer,
	FormContainer,
	FormHeader,
	FormInput,
	FormInputContainer,
	FormLabel,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";
import TextArea from "antd/lib/input/TextArea";
const { RangePicker } = DatePicker;

export default function Form({
	data,
	onSubmit,
	loading,
	setClearButton,
	clearButton,
}) {
	const [form, setForm] = useState(data);

	const handleClear = e => {
		setForm({ ...form, name: "", description: "", startMonth: "", endMonth: "", startYear: "", endYear: "" });
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

	const handelChangeDescription = e => {
		if (e.target.value.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		setForm({ ...form, description: e.target.value });
	};

	const handleEndStartDate = (value, dateString) => {
		if (dateString.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		let startMonth = value[0]._d.getMonth() + 1
		let endMonth = value[1]._d.getMonth() + 1
		let startYear = value[0]._d.getFullYear() + 1
		let endYear = value[1]._d.getFullYear() + 1

		setForm(
				{ ...form,
				startMonth: startMonth,
				endMonth: endMonth,
				startYear: startYear,
				endYear: endYear
			  })
	};

	useEffect(() => {
		setForm(data);
	}, [data]);
	return (
		<FormContainer>
			<FormHeader>Fiscal Year</FormHeader>
			<FormInputContainer>
				<FormInput>
					<FormLabel>Name</FormLabel>
					<Input
						placeholder={"Enter Name"}
						value={form.name}
						onChange={handelChangeName}
					/>
				</FormInput>
				<FormInput>
					<FormLabel>Description</FormLabel>
					<TextArea
						placeholder={"Enter Description"}
						value={form.description}
						onChange={handelChangeDescription}
					/>
				</FormInput>
				<FormInput>
					<RangePicker
						format={"DD/MM/YYYY"}
						// value={form.startEndData}
						placeholder={["Start Date", "End Date"]}
						onChange={handleEndStartDate}
						picker="month"
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
							Save
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
						Add
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
						Clear
					</FormButton>
				)}
			</FormButtonContainer>
		</FormContainer>
	);
}
