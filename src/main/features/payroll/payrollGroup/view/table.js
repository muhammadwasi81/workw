import { Skeleton } from "antd";
import { removeData } from "jquery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllPayrollGroup, removeComplainCategory, removePayrollGroup } from "../store/actions";
import { ComplainCategoryDeleted, PayrollGroupDeleted } from "../store/slice";
import { tableColumn } from "./tableColumn";

export default function TableView({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton 
}) {
  const { groups, loadingData } = useSelector((state) => state.payrollGroupSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPayrollGroup());
  }, []);

  const [id, setId] = useState()

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null)
    dispatch(PayrollGroupDeleted(e))
    setClearButton(true)
  }

  const onError = () => {
    setId(null)
  }

  const handleDelete = (e) => {
    setId(e.id)
    dispatch(removePayrollGroup(e)).then(() => onSuccess(e), onError);
    
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
      dataSource={groups}
      pagination={false}
      rowKey="id"
      scroll={{ x: true }}
      size="small"
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
