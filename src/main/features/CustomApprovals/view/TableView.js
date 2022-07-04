import { useSelector } from "react-redux";
import { Table } from "../../../sharedComponents/customTable/index";
export default function TableView() {
  const { rewards } = useSelector((state) => state.rewardSlice);

  return <Table />;
}
