import React from 'react';
import ProfileRoutes from '../routes/ProfileRoutes';
import ProfilePanelList from '../UI/ProfilePanelList';

function ProfilePanel() {
  return (
    <div className="flex flex-1 bg-white rounded-2xl overflow-hidden shadow-[0px_1px_8px_3px_rgba(235,235,235,1)] m-1 w-full">
      <ProfilePanelList />
      <ProfileRoutes />
    </div>
  );
}

export default ProfilePanel;
