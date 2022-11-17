import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";
import { setPayrollDetail } from "../../store/slice";
import PayrollDetailedView from "./detailedView";
import PayrollListItem from "./PayrollListItem";

const PayrollList = () => {
	const listData = useSelector(state => state.payrollSlice.payrollList);

	const {loader,payrollDetail} = useSelector(state => state.payrollSlice);

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
console.log("MyLoader", loader)
	return (
		<>
	{listData?.length > 0 && !loader ? (
		<CardWrapper>
			{listData.map(item => (
					<PayrollListItem
						item={item}
						key={item.id}
						onClick={onClick}
					/>
				))}
        </CardWrapper>
            ): !loader && <NoDataFound />
	}
	{payrollDetail && (<PayrollDetailedView onClose={onClose} id={itemId} visible={visible}/>)}
		
		</>
	);
};
export default PayrollList;
