import { Drawer } from "antd";
import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Approval from "../../../sharedComponents/AppComponents/Approvals/view";
import { ExpenseDictionary } from "../localization";
import ExpenseList from "./ExpenseList";
function ExpenseDetail({ visible, onClose, id }) {
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList, Direction } = ExpenseDictionary[userLanguage];
  const { labels } = ExpenseDictionaryList;
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
  console.log(Direction);
  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>{labels.expenseDetail}</h1>
      }
      width="768"
      onClose={onClose}
      visible={visible}
      className="detailedViewComposer drawerSecondary"
    >
      <div className="expenseDetail">
        <ExpenseList />
        <Approval title={"Approvals"} data={data} />
        <Approval title={"Executor"} data={data} />
      </div>
    </Drawer>
  );
}

export default ExpenseDetail;
