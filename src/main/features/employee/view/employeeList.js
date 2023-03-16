import { useContext, useEffect, useState } from 'react';
import EmployeeCard, { CardGrid } from './employeeCard';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '../store/actions';
import { Skeleton } from 'antd';
import { dictionaryList } from '../../../../utils/localization/languages';
import TopBar from '../../../sharedComponents/topBar/topBar';
import EmployeeTableView from './employeeTableView';
import { getAllEmployeeShort } from '../../../../utils/Shared/store/actions';
import { NoDataFound } from '../../../sharedComponents/NoDataIcon';

function EmployeeList() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  const dispatch = useDispatch();
  const { sharedLabels } = dictionaryList[userLanguage];
  const { employees, loader } = useSelector((state) => state.employeeSlice);
  const [view, setView] = useState('List');
  const [search, setSearch] = useState('');

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.designation.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    dispatch(
      getAllEmployeeShort({
        pageNo: 1,
        pageSize: 20,
        search: search,
      })
    );
  }, [search]);

  let classes = 'empolyeesListContainer';
  classes += Direction === ' ltr' ? ' ltr' : ' rtl';

  return (
    <>
      {loader ? (
        [...Array(40)].map((_, index) => (
          <div className={`${classes} empolyeesListContainer`}>
            <Skeleton key={index} loading={true} active />
          </div>
        ))
      ) : (
        <>
          <div style={{ flexDirection: 'column', width: '100%' }}>
            <TopBar
              style={{ margin: 0, width: '100%' }}
              onSearch={(val) => setSearch(val)}
              segment={{
                onSegment: (value) => {
                  setView(value);
                },
                label1: sharedLabels.List,
                label2: sharedLabels.Table,
              }}
            />
            {filteredEmployees.length > 0 ? (
              view === 'List' ? (
                <CardGrid>
                  {filteredEmployees.map((employee, index) => {
                    return <EmployeeCard employees={employee} key={index} />;
                  })}
                </CardGrid>
              ) : (
                <EmployeeTableView />
              )
            ) : (
              <NoDataFound />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default EmployeeList;
