import { Skeleton } from "antd";
import { removeData } from "jquery";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../sharedComponents/Administration/StyledComponents/adminTable";
import {
  getAllComplainCategory,
  removeComplainCategory,
} from "../store/actions";
import { ComplainCategoryDeleted } from "../store/slice";
import { tableColumn } from "./tableColumn";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { complainDictionaryList } from "../../localization/index";
export default function TableView({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) {
  const { complainCategories, loadingData } = useSelector(
    (state) => state.complainCategorySlice
  );
  const { userLanguage } = useContext(LanguageChangeContext);
  const { complainDictionary } = complainDictionaryList[userLanguage];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllComplainCategory());
  }, []);

  const [id, setId] = useState();

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null);
    dispatch(ComplainCategoryDeleted(e));
    setClearButton(true);
  };

  const onError = () => {
    setId(null);
  };

  const handleDelete = (e) => {
    setId(e.id);
    dispatch(removeComplainCategory(e)).then(() => onSuccess(e), onError);
  };

  return (
    <AdminTable
      // scroll={{ x: 1500, y: 300 }}
      columns={tableColumn(
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        id,
        setClearButton,
        complainDictionary
      )}
      dataSource={complainCategories}
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
