import React from "react";
import { ROUTES } from "../../../../utils/routes";
import Header from "../../../layout/header";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Table } from "../../../sharedComponents/customTable";
import { transactionColumn } from "./columns";
const Transactions = () => {
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: "Create Transactions",
            to: ROUTES.FINANCE.TRANSACTION.ROOT,
          }
        ]}
      />
      <ContBody>
        <Table
          columns={transactionColumn()}
          dragable={true}
          // handleChange={handleChange}
          // onPageChange={onPageChange}
          // onRow={onRow}
          data={[]}
        // status={travelStatus}
        // loadding={loader}
        // success={success}
        // onActionClick={onActionClick}
        />
      </ContBody>
    </TabbableContainer>
  );
};
export default Transactions;
