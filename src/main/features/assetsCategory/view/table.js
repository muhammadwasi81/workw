import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminTable } from '../../../../components/HrMenu/Administration/StyledComponents/adminTable';
import {
  getAllBranchOffice,
  removeBranchOffice,
} from '../../subsidiaryOffice/store/actions';
import { BranchOfficeDeleted } from '../../subsidiaryOffice/store/slice';
import { tableColumn } from './TableColumn';
import { Skeleton } from 'antd';

const AssetsTableView = ({
  handleEdit,
  removeButtons,
  actionRights = [],
  setClearButton,
}) => {
  const dispatch = useDispatch();
  const { items, loadingData } = useSelector(
    (state) => state.subsidiaryOfficeSlice
  );

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
    <>
      <AdminTable
        columns={tableColumn(
          handleEdit,
          handleDelete,
          removeButtons,
          actionRights,
          id,
          setClearButton
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
                style={{ width: '100%', marginBottom: 2 }}
              />
            ),
          }
        }
      />
    </>
  );
};

export default AssetsTableView;
