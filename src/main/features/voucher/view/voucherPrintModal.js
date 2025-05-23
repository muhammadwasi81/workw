import { Skeleton } from "antd";
import moment from "moment";
import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SystemLogo from "../../../../content/systemLogo.png";
import "../../financeReport/view/style.css";
import { getVoucherDetail } from "../store/actions";
import { getVoucherNameByType } from "../utils/constant";
import { voucherDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
function VoucherPrint({ id }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { vouncherDictionary, Direction } = voucherDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const voucherDetail = useSelector(
    (state) => state.voucherSlice.voucherDetail
  );
  useEffect(() => {
    dispatch(getVoucherDetail(id));
  }, [id]);

  if (!voucherDetail)
    return (
      <div className="overflow-x-auto">
        <div className="reportView">
          <div className="ledger">
            {Array(10)
              .fill(1)
              .map((item) => (
                <Skeleton active={true} />
              ))}
          </div>
        </div>
      </div>
    );

  let { voucherType, amount, voucherDate, voucherNo, details } = voucherDetail;
  return (
    <div className="overflow-x-auto">
      <div className="reportView">
        <div className="ledger">
          <div className="reportHeader">
            <div className="font-bold text-xl">
              {getVoucherNameByType(voucherType)}
            </div>
            <div className="text-sm">
              {moment(voucherDate).format("Do MMM YYYY")}
            </div>
            <div className="text-sm">{voucherNo}</div>
          </div>

          <table className="reportTable">
            <tr>
              <th>{vouncherDictionary.sno}</th>
              <th>{vouncherDictionary.account}</th>
              <th>{vouncherDictionary.naration}</th>
              <th>{vouncherDictionary.debit}</th>
              <th>{vouncherDictionary.credit}</th>
            </tr>
            {details.map((item) => (
              <tr>
                <td>{item.chequeNo}</td>
                <td>{item.account}</td>
                <td>{item.narration}</td>
                <td>{item.dbAmount}</td>
                <td>{item.crAmount}</td>
              </tr>
            ))}
            <tr>
              <th></th>
              <th></th>
              <th>Total</th>
              <th>{amount}</th>
              <th>{amount}</th>
            </tr>
          </table>
          <div className="reportWaterMark">
            <img src={SystemLogo} />
          </div>
          <div className="reportCompanyLogo">
            <img src={SystemLogo} />
          </div>
          <div className="reportFooter">
            <div></div>
            <div>
              <div>Plot#102, Phase 2 Extension, DHA, Karachi.</div>
              <div>Phone : 0332-324242983 Email : helperscorp@helpers.com</div>
            </div>
            <div>Page 1/1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VoucherPrint;
