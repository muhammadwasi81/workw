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
import { NoDataFound } from '../../../sharedComponents/NoDataIcon';

function TeamList() {
  const [view, setView] = useState('List');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { userLanguage } = useContext(LanguageChangeContext);
  const { teamDictionary, Direction } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.sharedLabels;
  const { teams } = useSelector((state) => state.teamSlice);
  const { loader } = useSelector((state) => state.employeeSlice);
  const { user } = useSelector((state) => state.userSlice);

  const filteredTeams = teams.filter(
    (team) =>
      team.firstName.toLowerCase().includes(search.toLowerCase()) ||
      team.lastName.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredTeams, 'filteredTeams');

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    dispatch(getTeamsAction(user.id));
  }, []);

  let classes = 'teamListContainer ';
  classes += Direction === 'ltr' ? 'ltr' : 'rtl';
  if (loader)
    return [...Array(40)].map((_, index) => (
      <div className={`${classes} teamListContainer`}>
        <Skeleton key={index} loading={true} active />
      </div>
    ));
  return (
    <>
      <div style={{ flexDirection: 'column', width: '100%' }}>
        <TopBar
          style={{ margin: 0, width: '100%' }}
          onSearch={(value) => setSearch(value)}
          segment={{
            onSegment: (value) => {
              setView(value);
            },
            label1: labels.list,
            label2: labels.table,
          }}
        />
        {filteredTeams.length > 0 ? (
          view === 'List' ? (
            <CardGrid>
              {filteredTeams.map((team, index) => {
                return <TeamCard teams={team} key={index} />;
              })}
            </CardGrid>
          ) : (
            <TeamTableView />
          )
        ) : (
          <NoDataFound />
        )}
      </div>
    </>
  );
}
export default TeamList;
