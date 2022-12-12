import React, { useContext } from 'react';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../utils/localization/languages';
import { EditOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { getNameForImage } from '../../../../utils/base';
import { useNavigate } from 'react-router-dom';

function EmployeeCard({ employees: { image, name, email, designation, id } }) {
  const navigate = useNavigate();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];

  return (
    <div className="employeeCard">
      <div className="employeeCard__header">
        <div className="employeeCard__header--img">
          <Avatar className="" src={image ? image : ''}>
            {getNameForImage(name ? name : 'Unknown User')}
          </Avatar>
        </div>
      </div>
      <div className="employeeCard__body">
        <p>{name}</p>
        <span>{designation || 'No Designation'}</span>
        <span>{email}</span>
        <div className="buttonGroup">
          <Button
            icon={<EditOutlined />}
            className="ThemeBtn"
            onClick={() => {
              navigate(`info/basicInfo/${id}`);
            }}
          >
            {sharedLabels.Update}
          </Button>
          <Button icon={<UserDeleteOutlined />} className="ThemeBtn disable">
            {sharedLabels.Disable}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
