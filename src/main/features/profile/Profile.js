import React, { useState, useContext } from 'react';
import {
  ContBody,
  TabContainer,
} from '../../sharedComponents/AppComponents/MainFlexContainer';
import Tab from '../../sharedComponents/Tab';
import CoverImage from '../projects/UI/CoverImage';
import ProfileCoverDetail from './ProfileCoverDetail';
// import ProjectCover from "../../../content/ProjectCover.svg";
import cover from '../../../content/cover.svg';
import profile from '../../../content/profile.svg';
import ProfilePanel from './view/ProfilePanel';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import './styles/profileStyle.css';
import NewsFeed from '../feed/ui';
import { useEffect } from 'react';
import { getEducationDetailByUser } from '../education/store/actions';
import { useDispatch } from 'react-redux';
import { getUserWorkExperience } from '../experienceInfo/store/actions';
import { getEmployeeByIdAction } from './store/action';
import { LanguageChangeContext } from '../../../utils/localization/localContext/LocalContext';
import { profileDictionaryList } from './localization/index';

function Profile() {
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const { id } = param;
  const [defaultPath, setDefaultPath] = useState('');
  // const { education } = useSelector((state) => state.employeeProfileSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { profileDictionary } = profileDictionaryList[userLanguage];
  const onChange = (key) => {
    navigate(key);
  };

  useEffect(() => {
    setDefaultPath(pathname.split('_')[0]);
  }, [pathname]);

  const panes = [
    {
      featureName: profileDictionary.feed,
      content: (
        <NewsFeed
          isScheduler={false}
          isCheckedIn={false}
          width={'!w-full'}
          referenceType={4}
          referenceId={id}
          backButton={false}
          routeLink={ROUTES.USER.DEFAULT + id}
        />
      ),
      featureId: ROUTES.USER.DEFAULT + id,
    },
    {
      featureName: profileDictionary.about,
      content: <ProfilePanel />,
      featureId: ROUTES.USER.DEFAULT + id + '/about',
    },
    // TODO:// 3rd pane
  ];

  useEffect(() => {
    dispatch(getEducationDetailByUser(id));
    dispatch(getUserWorkExperience(id));
    dispatch(getUserWorkExperience(id));
    dispatch(getEmployeeByIdAction(id));
  }, []);

  return (
    <TabContainer>
      <ContBody className="!block">
        <div className="flex flex-row gap-5 h-[calc(100vh_-_60px)] w-full">
          <div className="rounded-xl flex flex-col gap-5 overflow-scroll w-full">
            <CoverImage image={cover} />
            <ProfileCoverDetail id={id} />
            <Tab
              panes={panes}
              canChangeRoute={true}
              onChange={onChange}
              defaultPath={defaultPath}
            />
          </div>
        </div>
      </ContBody>
    </TabContainer>
  );
}

export default Profile;
