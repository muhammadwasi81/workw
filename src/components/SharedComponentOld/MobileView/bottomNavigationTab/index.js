import React, { useState } from 'react';
import bell from '../../../../content/svg/topMenu/mobileNotificationIcon.svg';
import SharedButton from '../../button';
import ApprovalIcon from '../../../../content/svg/topMenu/mobileapprovalIcon.svg';
import mobileStickyNote from './assests/mobileStickyNote.svg';
import Messenger from '../../../../content/svg/topMenu/mobileMsgIcon.svg';
import {
  disable as disableDarkMode,
  enable as enableDarkMode,
} from 'darkreader';
import sunIcon from '../../../../content/svg/topMenu/mobileSunLightIcon.svg';
import moonIcon from '../../../../content/svg/topMenu/mobileMoonIcon.svg';
import { MoreOutlined } from '@ant-design/icons';
import mobileAddExIcon from './assests/mobileAddExIcon.svg';
import './style.css';
import { sideBarOpen } from '../../../MainMenu/SideChatbar/store/sideBarChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'antd';
import Notification from './notification/';
import Approvals from './approvals/';

const Index = () => {
  const [darkMode, setDarkMode] = useState(
    window.localStorage.getItem('darkMode') === '1'
  );
  const modeHandler = (status) => {
    if (status) {
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
    } else disableDarkMode();

    setDarkMode(status);
    window.localStorage.setItem('darkMode', status ? '1' : '0');
  };
  const dispatch = useDispatch();
  const { sideBarChatStatus } = useSelector((state) => state.sideBarChatSlice);
  const [showNotification, setShowNotification] = useState(false);
  const [showApprovals, setShowApprovals] = useState(false);

  return (
    <div className="bottomNavigationTab">
      <div
        className="bottom-tab-Item"
        onClick={() => setShowNotification(true)}
      >
        <SharedButton
          type="default"
          shape="circle"
          size="small"
          onClick={() => {}}
          counter={10}
          icon={bell}
          IconSize={18}
          badge={true}
          style={{ backgroundColor: '#1b5669' }}
        ></SharedButton>
        <div>Notification</div>
      </div>

      <div className="bottom-tab-Item" onClick={() => setShowApprovals(true)}>
        <SharedButton
          type="default"
          shape="circle"
          size="small"
          onClick={() => {}}
          counter={10}
          icon={ApprovalIcon}
          IconSize={18}
          badge={true}
          style={{ backgroundColor: '#1b5669' }}
        ></SharedButton>
        <div>Approvals</div>
      </div>

      <div
        className="bottom-tab-Item"
        onClick={() => dispatch(sideBarOpen(!sideBarChatStatus))}
      >
        <SharedButton
          type="default"
          shape="circle"
          size="small"
          onClick={() => {}}
          counter={10}
          icon={Messenger}
          IconSize={18}
          badge={true}
          style={{ backgroundColor: '#1b5669' }}
        ></SharedButton>
        <div>Messenger</div>
      </div>

      <div className="bottom-tab-Item">
        <Popover
          content={
            <React.Fragment>
              <div className="bottom-tab-more">
                <img
                  src={mobileStickyNote}
                  height={15}
                  width={15}
                  alt="sticky-notes"
                />
                <div style={{ marginLeft: '9px' }}>Sticky Notes</div>
              </div>
              <div
                className="bottom-tab-more"
                onClick={() => modeHandler(!darkMode)}
              >
                <img
                  src={darkMode ? sunIcon : moonIcon}
                  height={24}
                  width={24}
                  alt="dark-mode"
                />
                <div style={{ marginLeft: '4px' }}>Dark Mode</div>
              </div>
              <div className="bottom-tab-more">
                <img
                  alt="addExternalUser"
                  src={mobileAddExIcon}
                  height={15}
                  width={15}
                />
                <div style={{ marginLeft: '9px' }}>Add Employee</div>
              </div>
            </React.Fragment>
          }
          title={''}
          trigger="click"
          placement="top"
          destroyTooltipOnHide={true}
        >
          <SharedButton
            type="default"
            shape="circle"
            size="small"
            onClick={() => {}}
            antIcon={<MoreOutlined />}
            style={{ backgroundColor: '#1b5669', color: '#fff' }}
          ></SharedButton>
          <div>More</div>
        </Popover>
      </div>

      <Notification
        drawerStatus={showNotification}
        handleDrawer={setShowNotification}
      />
      <Approvals drawerStatus={showApprovals} handleDrawer={setShowApprovals} />
    </div>
  );
};

export default Index;
