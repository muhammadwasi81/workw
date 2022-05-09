import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllExpense, removeExpense } from "../store/actions";
import { tableColumn } from "./tableColumn";
import { expenseDeleted } from "../store/slice";

export default function ExpenseHeaderTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton
}) {
  const { expenseHeaders, loadingData } = useSelector((state) => state.expenseHeaderSlice);

  const dispatch = useDispatch();

  const [id, setId] = useState()

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null)
    dispatch(expenseDeleted(e))
    setClearButton(true)
  }

  const onError = () => {
    setId(null)
  }

  const handleDelete = (e) => {
    setId(e.id)
    dispatch(removeExpense(e)).then(() => onSuccess(e), onError);
  }

  useEffect(() => {
    dispatch(getAllExpense());
  }, []);

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
      dataSource={expenseHeaders}
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
