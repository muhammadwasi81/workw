import { Skeleton } from "antd";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllCustomApprovalCategory, getAllGrades } from "../store/actions";
import { tableColumn } from "./tableColumn";
import { customCategoryDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
export default function CustomApprovalCategoryTable({
  handleEdit,
  handleDelete,
  removeButtons,
  actionRights = [],
}) {
  const { customApprovalCategories, loadingData } = useSelector(
    (state) => state.customApprovalCategorySlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomApprovalCategory());
  }, []);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customcategoryDictionary } = customCategoryDictionaryList[
    userLanguage
  ];
  return (
    <AdminTable
      // scroll={{ x: 1500, y: 300 }}
      columns={tableColumn(
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        customcategoryDictionary
      )}
      dataSource={customApprovalCategories}
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
