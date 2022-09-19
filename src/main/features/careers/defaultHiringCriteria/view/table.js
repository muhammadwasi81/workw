import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllDefaultHiringCriteria, removeComplainCategory, removeDefaultHiringCriteria, removePayrollGroup } from "../store/actions";
import { DefaultHiringCriteriaDeleted, PayrollGroupDeleted } from "../store/slice";
import { tableColumn } from "./tableColumn";

export default function TableView({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton 
}) {
  const { questions, loadingData } = useSelector((state) => state.defaultHiringCriteriaSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDefaultHiringCriteria());
  }, []);

  const [id, setId] = useState()

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null)
    dispatch(DefaultHiringCriteriaDeleted(e))
    setClearButton(true)
  }

  const onError = () => {
    setId(null)
  }

  const handleDelete = (e) => {
    setId(e.id)
    dispatch(removeDefaultHiringCriteria(e)).then(() => onSuccess(e), onError);
    
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
      dataSource={questions}
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
