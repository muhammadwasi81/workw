import { Skeleton } from "antd";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../sharedComponents/Administration/StyledComponents/adminTable";
import { getAllBranchOffice, removeBranchOffice } from "../store/actions";
import { BranchOfficeDeleted } from "../store/slice";
import { tableColumn } from "./tableColumn";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";

export default function TableView({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, taxSlab, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];

  const { items, loadingData } = useSelector(
    (state) => state.subsidiaryOfficeSlice
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBranchOffice());
  }, []);

  const [id, setId] = useState();

  const onSuccess = (e) => {
    setId(null);
    dispatch(BranchOfficeDeleted(e));
    setClearButton(true);
  };

  const onError = () => {
    setId(null);
  };

  const handleDelete = (e) => {
    setId(e.id);
    dispatch(removeBranchOffice(e)).then(() => onSuccess(e), onError);
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
        sharedLabels
      )}
      dataSource={items}
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
