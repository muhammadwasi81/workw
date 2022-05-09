import { Skeleton } from "antd";
import { removeData } from "jquery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllWarningCategories, removeWarningCategory } from "../store/actions";
import { warningCategoryDeleted } from "../store/slice";
import { tableColumn } from "./tableColumn";

export default function WarningCategoryTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton
}) {
  const { warningCategories, loadingData } = useSelector((state) => state.warningCategorySlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllWarningCategories());
  }, []);

  const [id, setId] = useState()

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null)
    dispatch(warningCategoryDeleted(e))
    setClearButton(true)
  }

  const onError = () => {
    setId(null)
  }

  const handleDelete = (e) => {
    setId(e.id)
    dispatch(removeWarningCategory(e)).then(() => onSuccess(e), onError);
    
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
      dataSource={warningCategories}
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
