import React, { useState, useEffect } from "react";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import ModalFooter from "./UI/ModalFooter";
import ModalTitle from "./UI/ModalTitle";
import CustomModal from "./CustomModal";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
function MemberModal({
	value: selectedValues,
	onSave,
	showModal,
	isModalVisible,
}) {
	const dispatch = useDispatch();
	const employees = useSelector(state => state.sharedSlice.employees);
	const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
	const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
	const [value, setValue] = useState([]);
	const [members, setMembers] = useState([]);

	useEffect(() => {
		fetchEmployees("", 0);
	}, []);

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
		setMembers(obj);
	};
	useEffect(() => {
		setValue(selectedValues);
		// console.log(
		// 	// "JSON.stringify(selectedValues)]",
		// 	JSON.stringify(selectedValues)
		// );
	}, [JSON.stringify(selectedValues).length]);

	const onSaveModal = () => {
		setValue([]);
		onSave(members);
	};

	// console.log("selected", selectedValues);
	return (
		<CustomModal
			isModalVisible={isModalVisible}
			// centered={true}
			title={<ModalTitle title={"Members"} />}
			onCancel={showModal}
			footer={<ModalFooter onSave={onSaveModal} />}
			destroyOnClose={true}
		>
			<MemberSelect
				data={firstTimeEmpData}
				selectedData={selectedData}
				canFetchNow={isFirstTimeDataLoaded}
				fetchData={fetchEmployees}
				placeholder={"Search members"}
				mode={"multiple"}
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
				dataVal={value}
			/>
		</CustomModal>
	);
}

export default MemberModal;
