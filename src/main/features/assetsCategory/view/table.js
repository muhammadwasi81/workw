import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminTable } from '../../../../components/HrMenu/Administration/StyledComponents/adminTable';
import { tableColumn } from './TableColumn';
import { Skeleton } from 'antd';
import { getAllAssetCategories } from '../store/actions.js';

const AssetsTableView = ({
  handleEdit,
  handleDelete,
  actionRights = [],
  setClearButton,
  removeButtons,
  id,
}) => {
  const dispatch = useDispatch();
  const { assetsData, loadingData } = useSelector(
    (state) => state.assetsCategorySlice
  );

  useEffect(() => {
    dispatch(getAllAssetCategories());
  }, []);

  return (
    <>
      <AdminTable
        columns={tableColumn(
          handleEdit,
          handleDelete,
          removeButtons,
          actionRights,
          setClearButton,
          id
        )}
        dataSource={assetsData}
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
