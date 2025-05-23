import { Skeleton } from "antd";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
import { getAllBusinessEmailConfiguration } from "../store/actions";
import { tableColumn } from "./tableColumn";
import { emailConfiDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
export default function EmailConfigurationTable({
  handleEdit,
  handleDelete,
  removeButtons,
  actionRights = [],
}) {
  const { emailConfigurations, loadingData } = useSelector(
    (state) => state.emailConfigurationSlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBusinessEmailConfiguration());
  }, []);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, emailConfiDictionary } = emailConfiDictionaryList[
    userLanguage
  ];
  console.log(emailConfigurations, "EMAIL_CONFIGURATION");
  return (
    <AdminTable
      columns={tableColumn(
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        emailConfiDictionary
      )}
      dataSource={emailConfigurations}
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
