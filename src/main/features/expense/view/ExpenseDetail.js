import { Drawer } from "antd";
import React, { useContext, useEffect } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Approval from "../../../sharedComponents/AppComponents/Approvals/view";
import { ExpenseDictionary } from "../localization";
import { useDispatch, useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import { getExpenseById } from "../store/actions";
import { ApprovalsModule } from "../../../sharedComponents/AppComponents/Approvals/enums";

function ExpenseDetail({ visible, onClose, id }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList } = ExpenseDictionary[userLanguage];
  const { expense } = useSelector((state) => state.expenseSlice);
  const { labels } = ExpenseDictionaryList;
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible) dispatch(getExpenseById(id));
  }, [visible]);

  console.log(expense);
  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>{labels.expenseDetail}</h1>
      }
      width="768"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      className="detailedViewComposer drawerSecondary"
    >
      <div className="expenseDetail">
        {<ExpenseList expense={expense} />}
        <Approval
          title={"Approvals"}
          module={ApprovalsModule.ExpenseApproval}
          data={expense.approvers}
        />
        <Approval
          title={"Executor"}
          module={ApprovalsModule.ExpenseExecutor}
          data={expense.executors}
        />
        <Approval
          title={"Financers"}
          module={ApprovalsModule.ExpenseFinance}
          data={expense.financers}
        />
      </div>
    </Drawer>
  );
}

export default ExpenseDetail;
