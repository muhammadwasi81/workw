import { useContext } from 'react';
import { TeamTable } from './TaskTable/TeamTable';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../utils/localization/languages';
import { teamDictionaryList } from '../localization/index';
import propTypes from 'prop-types';

function TeamTableView({ filteredTeams }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.teamTable;

  const columns = [
    {
      title: labels.name,
      dataIndex: 'firstName',
      key: 'name',
      className: 'name',
    },
    {
      title: labels.designation,
      dataIndex: 'designation',
      key: 'designation',
      className: 'designationStyle',
    },
    {
      title: labels.email,
      dataIndex: 'email',
      key: 'email',
      className: 'emailStyle',
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        className="custom_table"
        dataSource={filteredTeams}
      />
    </>
  );
}
TeamTableView.propTypes = {
  filteredTeams: propTypes.array,
};
export default TeamTableView;
