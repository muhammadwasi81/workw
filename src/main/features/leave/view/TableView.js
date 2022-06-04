import { useSelector } from "react-redux";
// import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
// import { tableColumn } from "./TableColumn"
import { Table } from "../../travel/view/customTable/index";
export default function TableView() {
	const { rewards } = useSelector(state => state.rewardSlice);

	return (
		// <AdminTable
		//     columns={tableColumn(
		//   )}
		//   style={{width: "100%"}}
		//   dataSource={rewards}
		//   pagination={false}
		//   rowKey="id"
		//   scroll={{ x: true }}
		//   size="small"
		// />
		<Table />
	);
}
