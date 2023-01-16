import { useContext, useEffect, useState } from 'react';
import EmployeeCard, { CardGrid } from './employeeCard';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '../store/actions';
import { Skeleton } from 'antd';
import { dictionaryList } from '../../../../utils/localization/languages';
import TopBar from '../../../sharedComponents/topBar/topBar';
import EmployeeTableView from './employeeTableView';

function EmployeeList() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction } = dictionaryList[userLanguage];
  const dispatch = useDispatch();
  const { sharedLabels } = dictionaryList[userLanguage];
  const { employees, loader } = useSelector((state) => state.employeeSlice);
  const [view, setView] = useState('List');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getAllEmployees(signal));
    return () => {
      controller.abort();
    };
  }, []);

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
              onSearch={(value) => {
                console.log(value);
              }}
              filter={{
                onFilter: () => {
                  console.log('filter');
                },
              }}
              buttons={[]}
              segment={{
                onSegment: (value) => {
                  setView(value);
                },
                label1: sharedLabels.List,
                label2: sharedLabels.Table,
              }}
            />
            {view === 'List' ? (
              <CardGrid>
                {employees.map((employee, index) => {
                  return <EmployeeCard employees={employee} key={index} />;
                })}
              </CardGrid>
            ) : (
              <EmployeeTableView />
            )}
          </div>
        </>
      )}
    </>
  );
}
// }

export default EmployeeList;
