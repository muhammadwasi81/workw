import { useSelector } from "react-redux";
// import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
// import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable/index";

export default function TableView() {
	const { rewards } = useSelector(state => state.rewardSlice);

	return <Table />;
}
