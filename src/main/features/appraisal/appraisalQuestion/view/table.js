import { Skeleton } from "antd";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../sharedComponents/Administration/StyledComponents/adminTable";
import { getAllQuestion, removeQuestion } from "../store/actions";
import { tableColumn } from "./tableColumn";
import { appraisalQuestionDeleted } from "../store/slice";

import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";

export default function AppraisalTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, appraisal, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];
  console.log("jkjll", administration);

  const { appraisals, loadingData } = useSelector(
    (state) => state.appraisalSlice
  );

  const dispatch = useDispatch();

  const [id, setId] = useState();

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null);
    dispatch(appraisalQuestionDeleted(e));
    setClearButton(true);
  };

  const onError = () => {
    setId(null);
  };

  const handleDelete = (e) => {
    setId(e.id);
    dispatch(removeQuestion(e)).then(() => onSuccess(e), onError);
  };

  useEffect(() => {
    dispatch(getAllQuestion());
  }, []);
  console.log(appraisals, "Hello 2");

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
        sharedLabels
      )}
      dataSource={appraisals}
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
