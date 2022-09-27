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
	const [latitude, setLat] = useState(null);
	const [longitude, setLng] = useState(null);
	const [status, setStatus] = useState(null);

	const { items } = useSelector(
		state => state.subsidiarySlice
	);

	useEffect(() => {
		disptach(getAllBranch())
	}, []);

	console.log(items, "ITEMS BRANHCES")


	const getLocation = () => {
		if (!navigator.geolocation) {
			setStatus('Geolocation is not supported by your browser');
		} else {
			setStatus('Locating...');
			navigator.geolocation.getCurrentPosition((position) => {
				setStatus(null);
				setLat(position.coords.latitude);
				setLng(position.coords.longitude);
			}, () => {
				setStatus('Unable to retrieve your location');
			});
		}
	}


	const handleClear = e => {
		setForm({ ...form, branchTitle: "" });
		setClearButton(false);
	};

	const handelChangebranchTitle = e => {
		if (e.target.value.length > 0) {
			setClearButton(true);
		} else {
			setClearButton(false);
		}
		setForm({ ...form, branchTitle: e.target.value });
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

	setForm({ ...form, lat: form.latitude, lng: form.longitude });

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
						optionFilterProp="children"
						onChange={handelChangebranchTitle}
						value={form.branchId}
						name="branchId"
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
						value={longitude}
						disabled
					/>
				</FormInput>
				<FormInput>
					<FormLabel>Latitude</FormLabel>
					<Input
						// value={form.lng}
						// onChange={handelChangeName}
						value={longitude}
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
