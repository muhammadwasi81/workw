import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../sharedComponents/StyledComponents/adminTable";
import { getAllLeaveType, removeLeaveType } from "../store/actions";
import { tableColumn } from "./tableColumn";
import { leaveTypeDeleted } from "../store/slice";

export default function LeaveTypeTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton
}) {
  const { leaveTypes, loadingData } = useSelector((state) => state.leaveTypeSlice);

  const dispatch = useDispatch();

  const [id, setId] = useState()

  useEffect(() => {
    dispatch(getAllLeaveType());
  }, []);

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null)
    dispatch(leaveTypeDeleted(e))
    setClearButton(true)
  }

  const onError = () => {
    setId(null)
  }

  const handleDelete = (e) => {
    setId(e.id)
    dispatch(removeLeaveType(e)).then(() => onSuccess(e), onError);
  }

  return (
    <AdminTable
      // scroll={{ x: 1500, y: 300 }}
      columns={tableColumn(
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        id,
        setClearButton
      )}
      dataSource={leaveTypes}
      pagination={false}
      rowKey="id"
      size="small"
      scroll={{ x: true }}
      locale={
        loadingData && {
          emptyText: (
            <Skeleton.Input
              active="true"
              size="small"
              block={true}
              loading={loadingData}
              round="true"
              shape="circle"
              style={{ width: "100%", marginBottom: 2 }}
            />
          ),
        }
      }
    />
  );
}
