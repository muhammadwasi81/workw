import React from 'react';
import Nodata from '../../../../../content/NewContent/eLearning/Nodata.svg';
import DashboardLayout from './Layout/DashboardLayout';

function TeamDahsboard() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-full">
        <img src={Nodata} alt="no-data" loading="lazy" className="h-96 w-96" />
      </div>
    </DashboardLayout>
  );
}

export default TeamDahsboard;
