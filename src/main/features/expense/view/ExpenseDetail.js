import { Drawer } from "antd";
import React, { useContext, useEffect } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Approval from "../../../sharedComponents/AppComponents/Approvals/view";
import { ExpenseDictionary } from "../localization";
import { useDispatch, useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import { getExpenseById } from "../store/actions";
import { ApprovalsModule } from "../../../sharedComponents/AppComponents/Approvals/enums";

function ExpenseDetail(props) {
  const { visible, onClose, id } = props;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList, Direction } = ExpenseDictionary[userLanguage];
  const { expense } = useSelector((state) => state.expenseSlice);
  const { labels } = ExpenseDictionaryList;
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible) dispatch(getExpenseById(id));
  }, [visible]);

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
      onClose={onClose}
      visible={visible}
      destroyOnClose
      className="detailedViewComposer drawerSecondary"
    >
      <div className="expenseDetail">
        {<ExpenseList expense={expense} />}
        <Approval
          title={labels.approvers}
          module={ApprovalsModule.ExpenseApproval}
          data={expense.approvers}
        />
        <Approval
          title={labels.executors}
          module={ApprovalsModule.ExpenseExecutor}
          data={expense.executors}
        />
        <Approval
          title={labels.financers}
          module={ApprovalsModule.ExpenseFinance}
          data={expense.financers}
        />
      </div>
    </Drawer>
  );
}

export default ExpenseDetail;
