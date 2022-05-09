import { Skeleton } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllCustomApprovalCategory, getAllGrades } from "../store/actions";
import { tableColumn } from "./tableColumn";

export default function CustomApprovalCategoryTable({
  handleEdit,
  handleDelete,
  removeButtons,
  actionRights = [],
}) {
  const { customApprovalCategorySlice, loadingData } = useSelector((state) => state.customApprovalCategorySlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomApprovalCategory());
  }, []);

  return (
    <AdminTable
      // scroll={{ x: 1500, y: 300 }}
      columns={tableColumn(
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights
      )}
      dataSource={customApprovalCategorySlice}
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
