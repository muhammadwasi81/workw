import { Skeleton } from "antd";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
import { getAllUserEmailConfigurations } from "../store/actions";
import { tableColumn } from "./tableColumn";
import { emailConfiDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useParams } from "react-router-dom";

export default function EmailConfigurationTable({
  handleEdit,
  handleDelete,
  removeButtons,
  actionRights = [],
}) {
  const {
    emailConfigurations,
    loadingData,
    userEmailConfigurations,
  } = useSelector((state) => state.emailUserConfigurationSlice);
  const param = useParams();
  const id = param.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserEmailConfigurations(id));
  }, []);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, emailConfiDictionary } = emailConfiDictionaryList[
    userLanguage
  ];
  return (
    <AdminTable
      columns={tableColumn(
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        emailConfiDictionary
      )}
      dataSource={userEmailConfigurations}
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
