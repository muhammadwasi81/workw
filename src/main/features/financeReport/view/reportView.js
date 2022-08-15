import moment from "moment";
import React from "react";
import SystemLogo from "../../../../content/systemLogo.png";

const ReportView = ({data}) => {
    console.log(data)
    return (
        <div className="reportView" >
            <div className="ledger" >
                <div className="reportHeader" >
                    {/* <div className="font-bold text-xl" >Helpers Corporation</div> */}
                    {/* <div className="text-sm">Plot#102, Phase 2 Extension, DHA, Karachi.</div> */}
                    {/* <div className="text-sm">Phone # 0332-324242983 - 0312-3290875</div> */}
                    {/* <div className="text-sm">Email : helperscorp@helpers.com</div> */}
                    <div className="font-bold text-xl">General Ledger</div>
                    <div className="text-sm font-bold">{data.account}</div>
                    {/* <div className="text-sm">01/01/2022 to 31/12/2022</div> */}
                </div>

                <table className="reportTable">
                    <tr>
                        <th>Date</th>
                        <th>Voucher No</th>
                        <th>Description</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                    </tr>
                    {
                        data.details.data.map((item) =>
                            <tr>
                                <td>{moment(item.voucherDate).format("Do MMM YYYY")}</td>
                                <td>{item.voucherNo}</td>
                                <td>{item.narration}</td>
                                <td>{item.dbAmount}</td>
                                <td>{item.crAmount}</td>
                                <td>{item.balance}</td>
                            </tr>)
                    }
                </table>
                <div className="reportWaterMark" >
                    <img src={SystemLogo} />
                </div>
                <div className="reportCompanyLogo" >
                    <img src={SystemLogo} />
                </div>
                <div className="reportFooter" >
                    <div></div>
                    <div>
                    <div>Plot#102, Phase 2 Extension, DHA, Karachi.</div>
                    <div>Phone : 0332-324242983 Email : helperscorp@helpers.com</div>
                    </div>
                    <div>Page 1/1</div>
                </div>
            </div>
        </div>
    );
};
export default ReportView;
