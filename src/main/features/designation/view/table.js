import { Skeleton } from "antd";
import { removeData } from "jquery";
import { useEffect, useState,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../components/HrMenu/Administration/StyledComponents/adminTable";
import { getAllDesignation, removeDesignation } from "../store/actions";
import { designationDeleted } from "../store/slice";
import { tableColumn } from "./tableColumn";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext"
import { dictionaryList } from "../../../../utils/localization/languages";


export default function GradeTable({
  handleEdit,
  removeButtons,
  actionRights = [],
}) {

  const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,taxSlab,sharedLabels,Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration);

  const { designations, loadingData } = useSelector((state) => state.designationSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDesignation());
  }, []);

  const [id, setId] = useState()

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null)
    dispatch(designationDeleted(e))
  }

  const onError = () => {
    setId(null)
  }

  const handleDelete = (e) => {
    setId(e.id)
    dispatch(removeDesignation(e)).then(() => onSuccess(e), onError);
    
  }

  return (
    <AdminTable
      // scroll={{ x: 1500, y: 300 }}
      columns={tableColumn(
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        id,
        sharedLabels,
      )}
      dataSource={designations}
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
