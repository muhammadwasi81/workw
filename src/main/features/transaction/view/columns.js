import { Button } from "antd";
import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import { getVoucherNameByType } from "../../voucher/utils/constant";
export const transactionColumn = (handleClickPrint) => {
	return [
		{
			title: "Voucher No",
			dataIndex: "voucherNo",
			// render: status => <StatusTag status={status} />,
			sort: true,
		},
		{
			title: "Date",
			dataIndex: "voucherDate",
			ellipsis: true,
			render: value => (
				<div>{moment(value).format("Do MMM YYYY")}</div>
			),
			sort: true,
		},
		{
			title: "Voucher Type", dataIndex: "voucherType", ellipsis: true, 
			render: value => (
				<div>{getVoucherNameByType(value)}</div>
			),
			sort: true
		},
		{ title: "Amount", dataIndex: "amount", ellipsis: true, sort: true },
		{
			title: "Action", dataIndex: "id", ellipsis: true, sort: true,
			render: id =>
				<Button className="ThemeBtn !text-[11px] !p-2" onClick={()=>handleClickPrint(id)} >
					View / Print
				</Button>,
		},
	];
};
