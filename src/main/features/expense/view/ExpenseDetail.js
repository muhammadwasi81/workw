import { Drawer, Skeleton } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import Approval from '../../../sharedComponents/AppComponents/Approvals/view';
import { ExpenseDictionary } from '../localization';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenseById } from '../store/actions';
import {
  ApprovalsModule,
  ApprovalStatus,
} from '../../../sharedComponents/AppComponents/Approvals/enums';
import { updateListExpenseStatus } from '../store/slice';
import ExpenseDetailList from './ExpenseDetailList';

function ExpenseDetail({ id }) {
  const { expense, loadingData } = useSelector((state) => state.expenseSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList } = ExpenseDictionary[userLanguage];
  const { labels } = ExpenseDictionaryList;
  const [expenseStatus, setExpenseStatus] = useState({});
  const [status, setStatus] = useState();
  const [isMount, setIsMount] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(id, "DDIDDD");
    dispatch(getExpenseById(id));
  }, [id]);
  useEffect(() => {
    if (status) {
      dispatch(updateListExpenseStatus({ id, status }));
    }
  }, [status]);

  useEffect(() => {
    if (Object.keys(expenseStatus).length !== 0) {
      const expenseStatusArr = Object.keys(expenseStatus).map((k) => {
        return { [k]: expenseStatus[k] };
      });

      const updateList = [...expenseStatusArr].reduce((acc, val, index) => {
        const ac = Object?.values(acc)?.toString();
        const va = Object?.values(val)?.toString();
        if (ac === va) return va;
        else return ApprovalStatus.InProcess;
      });
      setStatus(updateList);
    }
  }, [expenseStatus]);

  useEffect(() => {
    setIsMount(true);
    return () => {
      setIsMount(false);
    };
  }, []);

  if (loadingData) return <Skeleton />;

  return (
    <>
      {!Object.keys(expense).length ? (
        <Skeleton avatar paragraph={{ rows: 6 }} />
      ) : (
        <div className="expenseDetail">
          {
            <ExpenseDetailList
              expense={expense}
              updateStatus={isMount ? status : expense.status}
              isDetail={true}
            />
          }
          <Approval
            title={labels.approvers}
            module={ApprovalsModule.ExpenseApproval}
            data={expense.approvers}
            onStatusChanged={(status) => {
              setExpenseStatus((prev) => {
                return { ...prev, ...status };
              });
            }}
            status={expense.approverStatus}
          />
          <Approval
            title={labels.executors}
            module={ApprovalsModule.ExpenseExecutor}
            data={expense.executors}
            onStatusChanged={(status) =>
              setExpenseStatus((prev) => {
                return { ...prev, ...status };
              })
            }
            status={expense.executorStatus}
          />
          <Approval
            title={labels.financers}
            module={ApprovalsModule.ExpenseFinance}
            data={expense.financers}
            onStatusChanged={(status) =>
              setExpenseStatus((prev) => {
                return { ...prev, ...status };
              })
            }
            status={expense.financeStatus}
          />
        </div>
      )}
    </>
  );
}
export default ExpenseDetail;
