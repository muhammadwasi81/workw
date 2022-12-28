import { Skeleton } from 'antd';
import { removeData } from 'jquery';
import { useEffect, useState ,useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminTable } from '../../../../components/HrMenu/Administration/StyledComponents/adminTable';
import { getAllGrades, removeGrade } from '../store/actions';


import { gradeDeleted } from '../store/slice';
import { tableColumn } from './tableColumn';

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";


export default function GradeTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) {

   const { userLanguage } = useContext(LanguageChangeContext);
	 const { administration,grade,sharedLabels, Direction } = dictionaryList[userLanguage];
		console.log("jkjll",sharedLabels);

  const { grades, loadingData } = useSelector((state) => state.gradeSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGrades());

  }, []);

  const [id, setId] = useState();

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null);
    dispatch(gradeDeleted(e));
    setClearButton(true);
  };

  const onError = () => {
    setId(null);
  };

  const handleDelete = (e) => {
    setId(e.id);
    dispatch(removeGrade(e)).then(() => onSuccess(e), onError);
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
        sharedLabels,
      )}
      dataSource={grades}
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
              style={{ width: '100%', marginBottom: 2 }}
            />
          ),
        }
      }
    />
  );
}
