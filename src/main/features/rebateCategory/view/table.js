import { Skeleton } from "antd";
import { removeData } from "jquery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import {  getAllRebateCategories, removeRebateCategory } from "../store/actions";
import { rebateCategoryDeleted } from "../store/slice";
import { tableColumn } from "./tableColumn";

export default function RebateCategoryTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton
}) {
  const { rebateCategories, loadingData } = useSelector((state) => state.rebateCategorySlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRebateCategories());
  }, []);

  const [id, setId] = useState()

  const onSuccess = (e) => {
    setId(null)
    dispatch(rebateCategoryDeleted(e))
    setClearButton(true)
  }

  const onError = () => {
    setId(null)
  }

  const handleDelete = (e) => {
    setId(e.id)
    dispatch(removeRebateCategory(e)).then(() => onSuccess(e), onError);
    
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
      dataSource={rebateCategories}
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
