import { Skeleton } from "antd";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllRewardCategory, removeRewardCategory } from "../store/actions";
import { tableColumn } from "./tableColumn";
import { rewardCategoryDeleted } from "../store/slice";
import { rewardDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

export default function RewardCategoryTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) {
  const { rewardCategories, loadingData } = useSelector(
    (state) => state.rewardCategorySlice
  );

  const dispatch = useDispatch();

  const [id, setId] = useState();

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null);
    dispatch(rewardCategoryDeleted(e));
    setClearButton(true);
  };

  const onError = () => {
    setId(null);
  };

  const handleDelete = (e) => {
    setId(e.id);
    dispatch(removeRewardCategory(e)).then(() => onSuccess(e), onError);
  };

  useEffect(() => {
    dispatch(getAllRewardCategory());
  }, []);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { rewardDictionary } = rewardDictionaryList[userLanguage];
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
        rewardDictionary
      )}
      dataSource={rewardCategories}
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
