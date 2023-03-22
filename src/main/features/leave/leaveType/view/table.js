import { Skeleton } from "antd";
import { useEffect, useState ,useContext} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTable } from "../../../../sharedComponents/StyledComponents/adminTable";
import { getAllLeaveType, removeLeaveType } from "../store/actions";
import { tableColumn } from "./tableColumn";
import { leaveTypeDeleted } from "../store/slice";

import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext"
import { dictionaryList } from "../../../../../utils/localization/languages";


export default function LeaveTypeTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton
}) {

  const { userLanguage } = useContext(LanguageChangeContext);
	const { administration,taxSlab,sharedLabels,Direction } = dictionaryList[userLanguage];
		console.log("jkjll",administration);

  const { leaveTypes, loadingData } = useSelector((state) => state.leaveTypeSlice);

  const dispatch = useDispatch();

  const [id, setId] = useState()

  useEffect(() => {
    dispatch(getAllLeaveType());
  }, []);

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null)
    dispatch(leaveTypeDeleted(e))
    setClearButton(true)
  }

  const onError = () => {
    setId(null)
  }

  const handleDelete = (e) => {
    setId(e.id)
    dispatch(removeLeaveType(e)).then(() => onSuccess(e), onError);
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
        setClearButton,
        sharedLabels,
      )}
      dataSource={leaveTypes}
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
