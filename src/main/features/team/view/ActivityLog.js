import React, { useContext, useState } from 'react';
import { TeamTable } from './TaskTable/TeamTable';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../utils/localization/languages';
import { teamDictionaryList } from '../localization/index';
import ModalComponent from './modal';

function ActivityLog() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.ActivityLogTbale;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const onRow = () => {
  //   return {
  //     onClick: () => {
  //       setIsModalOpen(true);
  //     },
  //   };
  // };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const columns = [
    {
      title: labels.Date,
      dataIndex: 'date',
      key: 'date',
      sort: true,
      width: 200,
    },

    {
      title: labels.LoginFrom,
      dataIndex: 'loginFrom',
      key: 'loginFrom',
      sort: true,
      width: 200,
    },
    {
      title: labels.LoginIp,
      dataIndex: 'loginIP',
      key: 'loginIP',
      sort: true,
      width: 200,
    },
    {
      title: labels.Location,
      dataIndex: 'location',
      key: 'location',
      sort: true,
      width: 200,
    },
  ];
  return (
    <>
      <TeamTable
        bordered
        columns={columns}
        className="custom_table"
        onClick={showModal}
        dataSource={[
          {
            date: 'Mon 2019',
            loginFrom: 'web app',
            loginIP: '99999',
            location: 'miletap',
          },
        ]}
      />
      <ModalComponent showModal={isModalOpen} />
    </>
  );
}
export default ActivityLog;
