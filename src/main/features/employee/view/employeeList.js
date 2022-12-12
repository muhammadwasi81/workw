import React, { useContext, useEffect, useState } from 'react';
import EmployeeCard from './employeeCard';
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
  const label = dictionaryList[userLanguage];
  const { employees, loader } = useSelector((state) => state.employeeSlice);
  const [view, setView] = useState('List');
  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  let classes = 'empolyeesListContainer';
  classes += Direction === ' ltr' ? ' ltr' : ' rtl';
  if (loader) {
    return (
      <div className="empolyeesListContainer">
        {[...Array(40)].map(() => (
          <>
            <Skeleton.Avatar shape={'circle'} size={'large'} />
            <Skeleton loading={true} active></Skeleton>
          </>
        ))}
      </div>
    );
  } else {
    return (
      <div style={{ flexDirection: 'column', width: '100%' }}>
        <TopBar
          style={{ margin: 0, width: '100%' }}
          onSearch={(value) => {
            console.log(value);
          }}
          filter={{
            onFilter: () => {},
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
          <div className={classes}>
            {employees.map((employee, index) => {
              return <EmployeeCard employees={employee} key={index} />;
            })}
          </div>
        ) : (
          <EmployeeTableView />
        )}
      </div>
    );
  }
}

export default EmployeeList;
