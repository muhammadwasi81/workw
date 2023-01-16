import React, { useContext, useEffect, useState } from 'react';
import TeamCard, { CardGrid } from './TeamCard';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import TopBar from '../../../sharedComponents/topBar/topBar';
import '../Styles/table.css';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { teamDictionaryList } from '../localization/index';
import { getTeamsAction } from '../store/action';
import TeamTableView from './TeamTableView';
import { getAllEmployees } from '../../employee/store/actions';

function TeamList() {
  const [view, setView] = useState('List');
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { teamDictionary, Direction } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.sharedLabels;
  const { teams } = useSelector((state) => state.teamSlice);
  const { loader } = useSelector((state) => state.employeeSlice);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getAllEmployees(signal));
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    dispatch(getTeamsAction());
  }, []);

  const searchHandler = (value) => {
    dispatch(getTeamsAction({ search: value }));
    console.log(value, 'value');
  };

  let classes = 'teamListContainer ';
  classes += Direction === 'ltr' ? 'ltr' : 'rtl';

  return (
    <>
      {loader ? (
        [...Array(40)].map((_, index) => (
          <div className={`${classes} teamListContainer`}>
            <Skeleton key={index} loading={true} active />
          </div>
        ))
      ) : (
        <div style={{ flexDirection: 'column', width: '100%' }}>
          <TopBar
            style={{ margin: 0, width: '100%' }}
            onSearch={(value) => searchHandler(value)}
            segment={{
              onSegment: (value) => {
                setView(value);
              },
              label1: labels.list,
              label2: labels.table,
            }}
          />
          {view === 'List' ? (
            <CardGrid>
              {teams.map((team, index) => {
                return <TeamCard teams={team} key={index} />;
              })}
            </CardGrid>
          ) : (
            <TeamTableView />
          )}
        </div>
      )}
    </>
  );
}
export default TeamList;
