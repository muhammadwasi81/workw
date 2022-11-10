import { useState } from 'react';
import { AdminContainer } from '../../../../components/HrMenu/Administration/StyledComponents/admin';
import AssetsCategoryForm from './form';
import { message } from 'antd';
import AssetsTableView from './table';
import { useDispatch } from 'react-redux';
import { addAssetCategory, updateAssetCategory } from '../store/actions.js';

const AssetsCategory = () => {
  const dispatch = useDispatch();

  const initialState = {
    name: '',
    description: '',
    accountName: '',
    parentId: '',
  };
  const [clearButton, setClearButton] = useState(false);
  const [assets, setAssets] = useState(initialState);

  const handleSubmit = (e) => {
    if (!e.name || !e.description) {
      return message.error('Please fill all required fields');
    }
    if (e.id) {
      dispatch(updateAssetCategory(e));
      setAssets(initialState);
    } else {
      const payload = {
        name: e.name,
        description: e.description,
        accountName: e.accountName,
        parentId: e.parentId,
      };
      console.log(payload, 'payload');
      // dispatch(addAssetCategory(payload));
      setAssets(initialState);
    }
  };
  const handleDelete = (e) => {
    message.success('Deleted Successfully');
  };
  return (
    <>
      <AdminContainer>
        <AssetsCategoryForm
          clearButton={clearButton}
          setClearButton={setClearButton}
          data={assets}
          onSubmit={handleSubmit}
        />
        <AssetsTableView
          handleEdit={setAssets}
          setClearButton={setClearButton}
          actionRights={[1, 2]}
          handleDelete={handleDelete}
        />
      </AdminContainer>
    </>
  );
};

export default AssetsCategory;
