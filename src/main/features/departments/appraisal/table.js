import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { removeData } from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
import { removeDepartmentAppraisalQuestion } from "../store/actions";
import { appraisalQuestionDeleted } from "../store/slice";
import { tableColumn } from "./tableColumn";

export default function GradeTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) {
  const {
    grades,
    loadingData,
    departmentDetail,
    appraisalQuestion,
  } = useSelector((state) => state.departmentSlice);

  const dispatch = useDispatch();

  const [id, setId] = useState();

  const onSuccess = (e) => {
    setId(null);
    dispatch(appraisalQuestionDeleted(e.id));
    setClearButton(true);
  };

  const onError = () => {
    setId(null);
  };

  const handleDelete = (e) => {
    setId(e.id);
    // console.log("handle delete");
    dispatch(removeDepartmentAppraisalQuestion(e)).then(
      () => onSuccess(e),
      onError
    );
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
        setClearButton
      )}
      dataSource={appraisalQuestion}
      pagination={false}
      rowKey="id"
      scroll={{ x: true }}
      size="small"
      //   locale={
      //     loadingData && {
      //       emptyText: (
      //         <Skeleton.Input
      //           active="true"
      //           size="small"
      //           block={true}
      //           loading={loadingData}
      //           round="true"
      //           shape="circle"
      //           style={{ width: "100%", marginBottom: 2 }}
      //         />
      //       ),
      //     }
      //   }
    />
  );
}
