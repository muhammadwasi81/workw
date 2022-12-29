import { message } from 'antd';
import { useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { AdminContainer } from '../../../../components/HrMenu/Administration/StyledComponents/admin';
import {
  addFiscalYear,
  getAllFiscalYear,
  removeFiscalYear,
  updateFiscalYear,
} from '../store/actions';
import Form from './form.js';
import TableView from './table.js';

export default function Fiscalyear() {
  const initialState = {
    name: '',
    description: '',
    startMonth: '',
    endMonth: '',
    startYear: '',
    endYear: '',
  };
  const { createLoader } = useSelector((state) => state.fiscalYearSlice);
  const [subsidiary, setSubsidiary] = useState(initialState);
  const [clearButton, setClearButton] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(removeFiscalYear(e));
  };

  const onSubmit = (e) => {
    if (e.name === '' || e.description === '') {
      message.error("Title can't be empty");
    } else {
      if (!e.id) {
        dispatch(addFiscalYear(e));
        dispatch(getAllFiscalYear());
        setSubsidiary(initialState);
        setClearButton(true);
        return;
      }
      dispatch(updateFiscalYear(e));

      setSubsidiary(initialState);
    }
  };
  return (
    <AdminContainer>
      <Form
        clearButton={clearButton}
        setClearButton={setClearButton}
        data={subsidiary}
        onSubmit={onSubmit}
        loading={createLoader}
      />
      <TableView
        handleEdit={setSubsidiary}
        setClearButton={setClearButton}
        handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
