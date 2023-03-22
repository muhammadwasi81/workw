import { useContext, useEffect, useState } from 'react';
import { Skeleton } from 'antd';
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
import '../style/style.css';
import ExpenseList from './ExpenseList';
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
            <ExpenseList
              expense={expense}
              updateStatus={isMount ? status : expense.status}
              isDetail={true}
            />
          }
          <Approval
            title={labels.approvers}
            reference={expense.id}
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
            reference={expense.id}
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
            reference={expense.id}
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
