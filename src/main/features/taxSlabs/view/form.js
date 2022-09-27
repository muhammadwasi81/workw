import "./style.css";
import { Input, InputNumber } from "antd";
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
export default function Form({
	data,
	onSubmit,
	loading,
	setClearButton,
	clearButton,
}) {
	const [form, setForm] = useState(data);

	const handleClear = e => {
		setForm({ ...form, name: "", min: "", max: "", percentage: "", previousCharge: "" });
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

	const handelChangeMin = e => {
		if (e.target.value.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		setForm({ ...form, min: e.target.value });
	};

	const handelChangeMax = e => {
		if (e.target.value.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		setForm({ ...form, max: e.target.value });
	};

	const handelChangePercentage = e => {
		if (e.target.value.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		setForm({ ...form, percentage: e.target.value });
	};

	const handelChangePreviousCharge = e => {
		if (e.target.value.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		setForm({ ...form, previousCharge: e.target.value });
	};

	useEffect(() => {
		
		setForm(data);
	}, [data]);
	return (
		<FormContainer>
			<FormHeader>Tax Slabs</FormHeader>
			<FormInputContainer>
				<FormInput>
					<FormLabel>Title</FormLabel>
					<Input
						placeholder={"Enter Title"}
						value={form.name}
						onChange={handelChangeName}
					/>
				</FormInput>
				<FormInput>
					<FormLabel>Min</FormLabel>
					<InputNumber
						placeholder={"Enter Min"}
						value={form.min}
						onChange={handelChangeMin}
						style={{width: "100%"}}
					/>
				</FormInput>
				<FormInput>
					<FormLabel>Max</FormLabel>
					<InputNumber
						placeholder={"Enter Max"}
						value={form.max}
						onChange={handelChangeMax}
						style={{width: "100%"}}
					/>
				</FormInput>
				<FormInput>
					<FormLabel>Percentage</FormLabel>
					<InputNumber
						placeholder={"Enter Percentage"}
						value={form.percentage}
						onChange={handelChangePercentage}
						style={{width: "100%"}}
					/>
				</FormInput>
				<FormInput>
					<FormLabel>Previous Charges</FormLabel>
					<InputNumber
						placeholder={0}
						value={form.previousCharge}
						onChange={handelChangePreviousCharge}
						style={{width: "100%"}}
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
