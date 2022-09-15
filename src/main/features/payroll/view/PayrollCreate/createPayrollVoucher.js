import React, { useEffect, useState } from 'react';
import VoucherFooter from './components/VoucherFooter';
import CreateEntryHead from './components/createEntryTableHead';
import CreateEntryItem from './components/createEntryItem';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CreateVoucherOptions from './components/createVoucherOptions';
import { addPayroll, getCalculatedPayroll } from '../../store/actions';
import moment from 'moment';
import CreateEntryTable from './components/createEntryTable';

const CreatePayrollVoucher = () => {
  const initialState = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    description: "",
    total: 0,
    approvers: [],
    disperseDate: moment()
  }
  const success = useSelector(state => state.payrollSlice.success);
  const payrollCalculatedList = useSelector(state => state.payrollSlice.payrollCalculatedList);
  let [state, setState] = useState(initialState);
  let totalAmount = payrollCalculatedList && payrollCalculatedList.reduce((a, b) => a + (b.isChecked ? b.netSalary : 0), 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCalculatedPayroll({
      month: state.month,
      year: state.year
    }))
  }, [state.month, state.year]);
  const createPayload = () => {
    let payload = {
      ...state,
      total: totalAmount,
      details: payrollCalculatedList.filter(item => item.isChecked).map((item) => ({ ...item, month: 1, year: 1 })),
      approvers:state.approvers.map((item)=>({approverId:item.id}))
    };
    return payload;
  }

  const handleSubmit = () => {
    let payload = createPayload();
    dispatch(addPayroll(payload));
  }
  console.log(state, "State")
  return (
    <div className='createEntryTable' >
      <CreateVoucherOptions data={state} handleChange={(value) => setState(value)} />
      <CreateEntryTable>
        {
          payrollCalculatedList && payrollCalculatedList.map((item, index) => {
            return <CreateEntryItem
              key={item.userId}
              value={item}
              index={index}
            />
          })
        }
      </CreateEntryTable>
      <VoucherFooter
        amount={totalAmount}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
export default CreatePayrollVoucher;