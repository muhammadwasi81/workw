import { useState } from 'react';
import { AdminContainer } from '../../../../components/HrMenu/Administration/StyledComponents/admin';
import AssetsCategoryForm from './form';
import { message } from 'antd';
import AssetsTableView from './table';

const AssetsCategory = () => {
  const initialState = {
    categoryName: '',
    description: '',
    accType: '',
    parentType: '',
  };
  const [clearButton, setClearButton] = useState(false);
  const [assets, setAssets] = useState(initialState);

  const submitHandler = (e) => {
    if (!e.categoryName || !e.description) {
      message.error('Please fill all required fields');
    } else {
      if (!e.id) {
        // dispatch(addBranchOffice(e));
        setAssets(initialState);
        setClearButton(true);
      }
    }
    console.log('submit handler', assets);
    setAssets({ ...assets });
  };

  const handleDelete = () => {
    alert('delete triggered');
  };
  return (
    <>
      <AdminContainer>
        <AssetsCategoryForm
          clearButton={clearButton}
          setClearButton={setClearButton}
          data={assets}
          onSubmit={submitHandler}
        />
        <AssetsTableView
          handleEdit={setAssets}
          setClearButton={setClearButton}
          handleDelete={handleDelete}
          actionRights={[1, 2]}
        />
      </AdminContainer>
    </>
  );
};

export default AssetsCategory;
