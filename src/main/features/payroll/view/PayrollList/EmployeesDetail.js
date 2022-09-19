import React from "react";
import { Collapse } from "antd";
import { ALLOWANCE_ENUM } from "../../../allowance/view/enum";
const { Panel } = Collapse;

const EmployeesDetail = ({ details }) => {
    return (
        <div className="mt-5">
            <Collapse>
                <Panel header="Payroll Detail" key="1">
                    <div className='createEntryTable overflow-auto'>
                        <table className="!min-w-full">
                            <thead>
                                <tr className='whitespace-nowrap' >
                                    <th style={{ minWidth: "200px" }}>
                                        Employee
                                    </th>
                                    <th style={{ minWidth: "120px" }}>
                                        Basic Salary
                                    </th>
                                    <th style={{ minWidth: "100px" }}>
                                        Loan
                                    </th>
                                    <th style={{ minWidth: "100px" }}>
                                        Allowance
                                    </th>
                                    <th style={{ minWidth: "100px" }}>
                                        Deduction
                                    </th>
                                    <th style={{ minWidth: "100px" }}>
                                        Tax
                                    </th>
                                    <th style={{ minWidth: "100px" }}>
                                        Rebate
                                    </th>
                                    <th style={{ minWidth: "100px" }}>
                                        Bonus
                                    </th>
                                    <th style={{ minWidth: "100px" }}>
                                        Other
                                    </th>
                                    <th style={{ minWidth: "100px" }}>
                                        Net Salary
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    details && details.map((item) => (
                                        <tr>
                                            <td>{item.user.name}</td>
                                            <td>{item.basicSalary}</td>
                                            <td>{item.loan}</td>
                                            <td>{item.allowance}</td>
                                            <td>{item.deduction}</td>
                                            <td>{item.tax}</td>
                                            <td>{item.rebate}</td>
                                            <td>{item.bonus}</td>
                                            <td>{item.other}</td>
                                            <td>{item.netSalary}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}
export default EmployeesDetail;