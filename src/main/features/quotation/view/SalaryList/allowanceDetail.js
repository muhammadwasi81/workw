import React from "react";
import { Collapse } from "antd";
import { ALLOWANCE_ENUM } from "../../../allowance/view/enum";
const { Panel } = Collapse;

const AllowanceDetail = ({ details }) => {
    return (
        <div className="mt-5">
            <Collapse>
                <Panel header="Allowance Detail" key="1">
                    <div className='createEntryTable'>
                        <table className="!min-w-full">
                            <thead>
                                <tr>
                                    <th className="!py-1 !px-2 text-left">
                                        Allowance
                                    </th>
                                    <th className="w-[160px] !py-1 !px-2 text-left">
                                        Type
                                    </th>
                                    <th className="w-[160px] !py-1 !px-2 text-left">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    details && details.map((item) => (
                                        <tr>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>
                                                {item.allowanceUnit === ALLOWANCE_ENUM.UNIT.BENEFIT ? "Benefit" : "Deduction" }
                                            </td>
                                            <td>
                                                {item.allowance}
                                            </td>
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
export default AllowanceDetail;