import { Avatar } from 'antd';
import moment from 'moment';
import React from 'react';
import UserInfo from '../../../../sharedComponents/UserShortInfo/UserInfo';

function ListItem() {
  return (
    <div className="careersShortCard item-card cursor-pointer !flex !flex-row gap-3">
      <div>
        <Avatar
          size={40}
          src={
            'https://media-exp1.licdn.com/dms/image/C4E0BAQFDGDEYJfvahA/company-logo_100_100/0/1651291774461?e=1672272000&v=beta&t=POP4Vrc5oo1ovQWEdHnlWBjhEktimNJDwCsi0SaPOTk'
          }
        />
      </div>

      <div className="w-full">
        <div className="text-[16px] font-bold text-sky-900 mb-1">
          Senior React.js Developer
        </div>
        <div className="shortCardDesc">
          We are looking for a React Native developer interested in building
          performant mobile apps on both the iOS and Android platforms. You will
          be responsible for architecting and building these applications, as
          well as coordinating with the teams responsible for other layers of
          the product infrastructure
        </div>
        <div className="font-bold">Miletap</div>
        <div className="text-xs">Karachi, Pakistan</div>
        <div className="text-xs float-right">
          {moment('09-22-2022').fromNow()}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
