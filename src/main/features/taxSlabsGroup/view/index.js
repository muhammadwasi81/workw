import { message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AdminContainer } from '../../../../components/HrMenu/Administration/StyledComponents/admin';
import {
  addTaxSlab,
  getAllBranch,
  getAllDefaultHiringCriteria,
  getAllTaxSlab,
  removeBranch,
  removeDefaultHiringCriteria,
  removeTaxSlab,
  updateBranch,
  updateDefaultHiringCriteria,
  updateTaxSlab,
} from '../store/actions';
import Form from './form.js';
import TableView from './table.js';

export default function TaxSlabsGroup() {
  const initialState = {
    name: '',
    description: '',
    countryId: '',
  };
  const [taxSlab, setTaxSlab] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();

  // const handleDelete = (e) => {
  //   dispatch(removeTaxSlab(e));
  // };
  const onSubmit = (e) => {
    if (!e.name || !e.description) {
      return message.error('Please fill all required fields');
    }
    if (!e.id) {
       dispatch(addTaxSlab(e));
       dispatch(getAllTaxSlab(
       {
         "pageNo": 0,
          "pageSize": 20,
          "search": "",
           "sortBy": 1
        }
       ));
      console.log("taxSlab",e);
      setTaxSlab(initialState);
    
    }
  };
  return (
    <AdminContainer>
      <Form
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={taxSlab}
        onSubmit={onSubmit}
      />
      <TableView
        handleEdit={setTaxSlab}
        setClearButton={setClearButton}
        //handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
