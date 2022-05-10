import { useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { tableColumn } from "./TableColumn"

export default function TableView() {

  const { rewards } = useSelector(state => state.rewardSlice)

  return (
    <AdminTable
        columns={tableColumn(
      )}
      dataSource={rewards}
      pagination={false}
      rowKey="id"
      scroll={{ x: true }}
      size="small"
    />
  );
}
