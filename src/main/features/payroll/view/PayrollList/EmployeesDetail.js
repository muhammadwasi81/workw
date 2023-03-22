import React, { useContext } from 'react';
import { Collapse } from 'antd';
import { ALLOWANCE_ENUM } from '../../../allowance/view/enum';
import { payrollDictionaryList } from '../../localization/index';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
const { Panel } = Collapse;

const EmployeesDetail = ({ details }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { payrollDictionary, Direction } = payrollDictionaryList[userLanguage];
  return (
    <div className="mt-5">
      <Collapse>
        <Panel header="Payroll Detail" key="1">
          <div className="createEntryTable overflow-auto">
            <table className="!min-w-full">
              <thead>
                <tr className="whitespace-nowrap">
                  <th style={{ minWidth: '200px' }}>
                    {payrollDictionary.employee}
                  </th>
                  <th style={{ minWidth: '120px' }}>
                    {' '}
                    {payrollDictionary.basicSalary}
                  </th>
                  <th style={{ minWidth: '100px' }}>
                    {' '}
                    {payrollDictionary.loan}
                  </th>
                  <th style={{ minWidth: '100px' }}>
                    {' '}
                    {payrollDictionary.allowance}
                  </th>
                  <th style={{ minWidth: '100px' }}>
                    {' '}
                    {payrollDictionary.deduction}
                  </th>
                  <th style={{ minWidth: '100px' }}>
                    {' '}
                    {payrollDictionary.tax}
                  </th>
                  <th style={{ minWidth: '100px' }}>
                    {' '}
                    {payrollDictionary.rebate}
                  </th>
                  <th style={{ minWidth: '100px' }}>
                    {' '}
                    {payrollDictionary.bonus}
                  </th>
                  <th style={{ minWidth: '100px' }}>
                    {' '}
                    {payrollDictionary.other}
                  </th>
                  <th style={{ minWidth: '100px' }}>
                    {' '}
                    {payrollDictionary.netSalary}
                  </th>
                </tr>
              </thead>
              <tbody>
                {details &&
                  details.map((item) => (
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
                  ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
export default EmployeesDetail;
