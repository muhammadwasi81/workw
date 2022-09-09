import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

const AllowanceDetail = () => {
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
                                <tr>
                                    <td>
                                        Medical Allowance
                                    </td>
                                    <td>
                                        Benefit
                                    </td>
                                    <td>
                                        12000
                                    </td>
                                </tr>
                                <tr>
                                    <td> Medical Allowance </td>
                                    <td> Benefit </td>
                                    <td>
                                        12000
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Medical Allowance
                                    </td>
                                    <td>
                                        Benefit
                                    </td>
                                    <td>
                                        12000
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}
export default AllowanceDetail;