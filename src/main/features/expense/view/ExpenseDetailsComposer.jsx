import { Drawer } from "antd";
import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { ExpenseDictionary } from "../localization";
import ExpenseDetail from "./ExpenseDetail";

function ExpenseDetailsComposer(props) {
  const { visible, onClose, id } = props;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { ExpenseDictionaryList, Direction } = ExpenseDictionary[userLanguage];
  const { labels } = ExpenseDictionaryList;
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
        // setExpenseStatus([]);
        // setStatus();
      }}
      visible={visible}
      destroyOnClose={true}
      className="detailedViewComposer drawerSecondary"
    >
      <ExpenseDetail id={id} visible={visible} />
    </Drawer>
  );
}

export default ExpenseDetailsComposer;
