import { Drawer } from "antd";
import React, { useContext, useEffect } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Approval from "../../../sharedComponents/AppComponents/Approvals/view";
import { ExpenseDictionary } from "../localization";
import { useDispatch, useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import { getExpenseById } from "../store/actions";

function ExpenseDetail({ visible, onClose, id }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList } = ExpenseDictionary[userLanguage];
  const { expense } = useSelector((state) => state.expenseSlice);
  const { labels } = ExpenseDictionaryList;
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible) dispatch(getExpenseById(id));
  }, [visible]);
  const data = [
    {
      approvalType: 1,
      approver: {
        businessId: "cfe50d8d-7c47-4abb-9154-661daf129cec",
        designation: "",
        email: "adsf@dsf.com",
        id: "a21ac828-b5dd-4600-b115-70dbbd26493e",
        image:
          "https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\4eebdeaa-83b9-41cf-b890-cf1fb2d781a6.jpg",
        name: "asdf asdf",
        type: 1,
        userTypeId: 2,
      },
      approverId: "a21ac828-b5dd-4600-b115-70dbbd26493e",
      createBy: "77546782-aa7a-4984-9388-5fd044c0fb11",
      id: "a123408d-4170-4b0d-a4d1-65d7fe2ca2f9",
      isDefault: false,
      referenceId: "94489f6f-7886-428e-b51d-45d160b727cb",
      status: 1,
    },

    {
      approvalType: 1,
      approver: {
        businessId: "cfe50d8d-7c47-4abb-9154-661daf129cec",
        designation: "",
        email: "adsf@dsf.com",
        id: "a21ac828-b5dd-4600-b115-70dbbd26493e",
        image:
          "https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\4eebdeaa-83b9-41cf-b890-cf1fb2d781a6.jpg",
        name: "asdf asdf",
        type: 1,
        userTypeId: 2,
      },
      approverId: "a21ac828-b5dd-4600-b115-70dbbd26493e",
      createBy: "77546782-aa7a-4984-9388-5fd044c0fb11",
      id: "a123408d-4170-4b0d-a4d1-65d7fe2ca2f9",
      isDefault: false,
      referenceId: "94489f6f-7886-428e-b51d-45d160b727cb",
      status: 1,
    },
  ];
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
          data={expense.approvers}
          referenceId={id}
        />
        <Approval
          title={"Executor"}
          data={expense.executors}
          referenceId={id}
        />
        <Approval
          title={"Financers"}
          data={expense.financers}
          referenceId={id}
        />
      </div>
    </Drawer>
  );
}

export default ExpenseDetail;
