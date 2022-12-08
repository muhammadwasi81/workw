import { Skeleton } from "antd";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllJobDescription } from "../store/actions";
import { tableColumn } from "./tableColumn";
import { jobDescDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

export default function JobDescriptionTable({
  handleEdit,
  handleDelete,
  removeButtons,
  actionRights = [],
}) {
  const { jobDescriptions, loadingData } = useSelector(
    (state) => state.jobDescriptionSlice
  );
  const { userLanguage } = useContext(LanguageChangeContext);
  const { jobDescDictionary } = jobDescDictionaryList[userLanguage];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobDescription());
  }, []);

  return (
    <AdminTable
      columns={tableColumn(
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        jobDescDictionary
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
