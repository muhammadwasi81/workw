import { Drawer, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Approval from "../../../sharedComponents/AppComponents/Approvals/view";
import { ExpenseDictionary } from "../localization";
import { useDispatch, useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import { getExpenseById } from "../store/actions";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";
import { updateListExpenseStatus } from "../store/slice";

function ExpenseDetail(props) {
  const { visible, onClose, id } = props;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList, Direction } = ExpenseDictionary[userLanguage];
  const { expense } = useSelector((state) => state.expenseSlice);
  const [expenseStatus, setExpenseStatus] = useState({});
  const [status, setStatus] = useState();
  const [isMount, setIsMount] = useState(false);

  const { labels } = ExpenseDictionaryList;
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) dispatch(getExpenseById(id));
  }, [visible]);
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

  return (
    <Drawer
      title={
        <h1
          style={{
            fontSize: "20px",
            margin: 0,
            textAlign: Direction === "ltr" ? "" : "end",
          }}
        >
          {labels.expenseDetail}
        </h1>
      }
      placement={props.direction === "ltr" ? "right" : "left"}
      width="768"
      onClose={() => {
        onClose();
        setExpenseStatus([]);
        setStatus();
      }}
      visible={visible}
      destroyOnClose={true}
      className="detailedViewComposer drawerSecondary"
    >
      {!Object.keys(expense).length ? (
        <Skeleton avatar paragraph={{ rows: 6 }} />
      ) : (
        <div className="expenseDetail">
          {
            <ExpenseList
              expense={expense}
              updateStatus={isMount ? status : expense.status}
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
    </Drawer>
  );
}

export default ExpenseDetail;
