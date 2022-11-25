import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminTable } from '../../../../components/HrMenu/Administration/StyledComponents/adminTable';
import { getAllAllowance, removeAllowance } from '../store/actions';
import { allowanceDeleted } from '../store/slice';
import { tableColumn } from './tableColumn';

export default function GradeTable({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) {
  const { allowances, loadingData } = useSelector(
    (state) => state.allowanceSlice
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAllowance());
  }, []);

  const [id, setId] = useState();

  const onSuccess = (e) => {
    console.log(e.id);
    setId(null);
    dispatch(allowanceDeleted(e));
    setClearButton(true);
  };

  const onError = () => {
    setId(null);
  };

  const handleDelete = (e) => {
    setId(e.id);
    dispatch(removeAllowance(e)).then(() => onSuccess(e), onError);
  };

  return (
    <AdminTable
      columns={tableColumn(
        handleEdit,
        handleDelete,
        removeButtons,
        actionRights,
        id,
        setClearButton
      )}
      className="allowanceTable"
      dataSource={allowances}
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
