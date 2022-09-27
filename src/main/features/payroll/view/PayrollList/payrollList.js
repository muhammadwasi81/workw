import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
import { setPayrollDetail } from "../../store/slice";
import PayrollDetailedView from "./detailedView";
import PayrollListItem from "./PayrollListItem";

const PayrollList = () => {
	const listData = useSelector(state => state.payrollSlice.payrollList);
	const dispatch = useDispatch();
	const [itemId, setItemId] = useState(null);
	const [visible, setVisible] = useState(false);
	const onClose = () => {
		setVisible(false);
		// setItemId(null);
		// dispatch(setPayrollDetail(null));
	};
	const onClick = id => {
		setItemId(id);
		setVisible(true);
		dispatch(setPayrollDetail(listData.filter(it => it.id === id)[0]));
	};
	return (
		<CardWrapper>
			{listData &&
				listData.map(item => (
					<PayrollListItem
						item={item}
						key={item.id}
						onClick={onClick}
					/>
				))}
			<PayrollDetailedView
				onClose={onClose}
				id={itemId}
				visible={visible}
			/>
		</CardWrapper>
	);
};
export default PayrollList;
