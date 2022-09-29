import "./style.css";
import { Select, Input } from "antd";
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
import { useSelector } from "react-redux";
import { getAllBranch } from "../../subsidiary/store/actions";
import { useDispatch } from "react-redux";
export default function Form({
	data,
	onSubmit,
	loading,
	setClearButton,
	clearButton,
}) {
	const disptach = useDispatch()
	const [form, setForm] = useState(data);
	const [status, setStatus] = useState(null);

	const { items } = useSelector(
		state => state.subsidiarySlice
	);

	useEffect(() => {
		disptach(getAllBranch())
	}, []);


	const getLocation = () => {
		if (!navigator.geolocation) {
			setStatus('Geolocation is not supported by your browser');
		} else {
			setStatus('Locating...');
			navigator.geolocation.getCurrentPosition((position) => {
				setStatus(null);
				setForm({
					...form,
					lat: position.coords.latitude,
					lng: position.coords.longitude
				})
			}, () => {
				setStatus('Unable to retrieve your location');
			});
		}
	}


	const handleClear = e => {
		setForm({ ...form, branchId: "" });
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

	const hadnelAddress = e => {
		if (e.target.value.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		setForm({ ...form, address: e.target.value });
	};

	const handelChangeBranch = e => {
		if (e.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		setForm({ ...form, branchId: e });
	};

	useEffect(() => {
		getLocation();
		setForm(data);
	}, [data]);
	return (
		<FormContainer>
			<FormHeader>Subsidiary Office</FormHeader>
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
					<FormLabel>Address</FormLabel>
					<Input.TextArea
						placeholder={"Enter Address"}
						onChange={hadnelAddress}
					/>
				</FormInput>
				<FormInput>
					<FormLabel>Subsidiary</FormLabel>
					<Select
						showSearch
						style={{ width: "100%" }}
						placeholder="Select Subsidiary"
						defaultValue={form.branchId}
						optionFilterProp="children"
						onChange={handelChangeBranch}
						value={form.branchId}
						size="large"
					>
						{items.map((item) => (
							<Select.Option value={item.id}>{item.branchTitle}</Select.Option>
						))}
					</Select>
				</FormInput>
				<FormInput>
					<FormLabel>Latitude</FormLabel>
					<Input
						// value={form.lat}
						// onChange={handelChangeName}
						value={form.lat}
						disabled
					/>
				</FormInput>
				<FormInput>
					<FormLabel>longitude</FormLabel>
					<Input
						// value={form.lng}
						// onChange={handelChangeName}
						value={form.lng}
						disabled
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
