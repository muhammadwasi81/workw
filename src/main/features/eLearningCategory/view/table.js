import { Skeleton } from "antd";
import { removeData } from "jquery";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
import { getELearningCategory, removeELearningCategory } from "../store/action";
import { ELearningCategoryDeleted } from "../store/slice";
import { tableColumn } from "./tableColumn";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";

export default function ELearningCategoryTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, grade, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];

  const { ELearningCategory, loadingData } = useSelector(
    (state) => state.eLearningCategorySlice
  );

  console.log(ELearningCategory, "MAIN SLICE");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getELearningCategory());
  }, []);

  const [id, setId] = useState();

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null);
    dispatch(ELearningCategoryDeleted(e));
    setClearButton(true);
  };

  const onError = () => {
    setId(null);
  };

  const handleDelete = (e) => {
    setId(e.id);
    dispatch(removeELearningCategory(e)).then(() => onSuccess(e), onError);
  };

  return (
    <AdminTable
      // scroll={{ x: 1500, y: 300 }}
      columns={tableColumn(
        grade,
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        id,
        setClearButton,
        sharedLabels
      )}
      dataSource={ELearningCategory}
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
