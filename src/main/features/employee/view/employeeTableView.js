import { useContext } from 'react';
import { Table } from '../../../sharedComponents/customTable';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { employeeDictionaryList } from '../localization';
import { tableColumn } from './tableColumns';
import propTypes from 'prop-types';

function EmployeeTableView({ filterEmployees }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { employeesDictionary } = employeeDictionaryList[userLanguage];
  const { tables } = employeesDictionary;

  return (
    <Table
      columns={tableColumn(tables)}
      dragable={true}
      data={filterEmployees ? filterEmployees : []}
    />
  );
}

EmployeeTableView.propTypes = {
  filterEmployees: propTypes.array,
};

export default EmployeeTableView;
