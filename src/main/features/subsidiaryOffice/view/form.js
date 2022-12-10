import "./style.css";
import { Select, Input } from "antd";
import { useEffect, useState,useContext } from "react";
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

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";

export default function Form({
	data,
	onSubmit,
	loading,
	setClearButton,
	clearButton,
}) {

	const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,subsidiaryOffice, Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration);

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
		setForm(data);
	}, [data]);

	useEffect(() => {
		getLocation();
	}, [])
	return (
		<FormContainer>
			<FormHeader>{administration.subsidiaryOffice.subsidiary_Office}</FormHeader>
			<FormInputContainer>
				<FormInput>
					<FormLabel>{administration.subsidiaryOffice.name}</FormLabel>
					<Input
						placeholder= {administration.subsidiaryOffice.enterName}
						value={form.name}
						onChange={handelChangeName}
					/>
				</FormInput>
				<FormInput>
					<FormLabel>{administration.subsidiaryOffice.address}</FormLabel>
					<Input.TextArea
						value={form.address}
						placeholder={administration.subsidiaryOffice.enterAddress}
						onChange={hadnelAddress}
					/>
				</FormInput>
				<FormInput>
					<FormLabel>{administration.subsidiaryOffice.Subsidiary}</FormLabel>
					<Select
						showSearch
						style={{ width: "100%" }}
						placeholder={administration.subsidiaryOffice.select}
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
					<FormLabel>{administration.subsidiaryOffice.latitude}</FormLabel>
					<Input
						value={form.lat}
						disabled
					/>
				</FormInput>
				<FormInput>
					<FormLabel>{administration.subsidiaryOffice.longitude}</FormLabel>
					<Input
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
							{administration.subsidiaryOffice.save}
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
						{administration.subsidiaryOffice.Add}
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
						{administration.subsidiaryOffice.clear}
					</FormButton>
				)}
			</FormButtonContainer>
		</FormContainer>
	);
}
