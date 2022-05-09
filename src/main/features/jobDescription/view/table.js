import { Skeleton } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllJobDescription } from "../store/actions";
import { tableColumn } from "./tableColumn";

export default function JobDescriptionTable({
  handleEdit,
  handleDelete,
  removeButtons,
  actionRights = [],
}) {
  const { jobDescriptions, loadingData } = useSelector((state) => state.jobDescriptionSlice);

  const dispatch = useDispatch();
  console.log(jobDescriptions, "Job12")
  useEffect(() => {
    dispatch(getAllJobDescription());
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
      dataSource={jobDescriptions}
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
