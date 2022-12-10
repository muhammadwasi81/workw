import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../../utils/routes";
import Header from "../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { getLedgerReport } from "../../voucher/store/actions";
import ReportFilter from "./Filter";
import ReportView from "./reportView";
import { reportDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const FinanceReport = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { reportDictionary, Direction } = reportDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(null);
  const ledgerReport = useSelector((state) => state.voucherSlice.ledgerReport);

  useEffect(() => {
    let payload = {
      ...filter,
    };
    if (filter) dispatch(getLedgerReport(payload));
  }, [filter]);

  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: reportDictionary.reports,
            to: ROUTES.FINANCE.REPORT.ROOT,
          },
        ]}
      />
      <ReportFilter handleChange={(data) => setFilter(data)} />
      <ContBody>
        <div className="ReportViewCont">
          {ledgerReport && <ReportView data={ledgerReport} />}
          {/* <ReportView />
          <ReportView />
          <ReportView />
          <ReportView />
          <ReportView />
          <ReportView />
          <ReportView />
          <ReportView />
          <ReportView />
          <ReportView />
          <ReportView /> */}
        </div>
      </ContBody>
    </TabbableContainer>
  );
};
export default FinanceReport;
