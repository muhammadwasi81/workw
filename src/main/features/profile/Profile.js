import React, { useState, useContext, useEffect } from "react";
import {
  ContBody,
  TabContainer,
<<<<<<< HEAD
} from '../../sharedComponents/AppComponents/MainFlexContainer';
import Tab from '../../sharedComponents/Tab';
import ProfileCoverDetail from './ProfileCoverDetail';
import ProfilePanel from './view/ProfilePanel';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import './styles/profileStyle.css';
import NewsFeed from '../feed/ui';
import { getEducationDetailByUser } from '../education/store/actions';
import { useDispatch } from 'react-redux';
import { getUserWorkExperience } from '../experienceInfo/store/actions';
import { getEmployeeByIdAction } from './store/action';
import { LanguageChangeContext } from '../../../utils/localization/localContext/LocalContext';
import { profileDictionaryList } from './localization/index';
import Courses from '../team/view/Courses';
import ActivityLog from '../team/view/ActivityLog';
import Education from '../team/view/Education';
import Leaves from '../team/view/Leaves';
import Experience from '../team/view/Experience';
import CheckIn from '../team/view/CheckIn';
import ProfileCover from '../projects/UI/ProfileCover';
import SingleNotes from '../notes/singleNotes/singleNotes';
import AppraisalTable from './appraisals';
import AwardsTable from './awards';
import SalaryTable from './salary';
import { useSelector } from 'react-redux';
import CustomNotes from '../notes/singleNotes/singleNotes';
import { targetStickyDescription } from '../notes/newStickyNotes/store/stickySlice';
import { addSticky } from '../notes/newStickyNotes/store/actions';
=======
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import Tab from "../../sharedComponents/Tab";
import ProfileCoverDetail from "./ProfileCoverDetail";
import ProfilePanel from "./view/ProfilePanel";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import "./styles/profileStyle.css";
import NewsFeed from "../feed/ui";
import { getEducationDetailByUser } from "../education/store/actions";
import { useDispatch } from "react-redux";
import { getUserWorkExperience } from "../experienceInfo/store/actions";
import { getEmployeeByIdAction } from "./store/action";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { profileDictionaryList } from "./localization/index";
import Courses from "../team/view/Courses";
import ActivityLog from "../team/view/ActivityLog";
import Education from "../team/view/Education";
import Leaves from "../team/view/Leaves";
import Experience from "../team/view/Experience";
import CheckIn from "../team/view/CheckIn";
import ProfileCover from "../projects/UI/ProfileCover";
import SingleNotes from "./UI/singleNotes";
import AppraisalTable from "./appraisals";
import AwardsTable from "./awards";
import SalaryTable from "./salary";
import { useSelector } from "react-redux";
>>>>>>> 98591ff91f438f3629b0e0f5826a2a1cd43f8295

const Profile = () => {
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const { id } = param;
<<<<<<< HEAD
  console.log(id, 'params');
  const [description, setDescription] = useState('');
  const [defaultPath, setDefaultPath] = useState('');
=======
  console.log(id, "params");
  const [defaultPath, setDefaultPath] = useState("");
>>>>>>> 98591ff91f438f3629b0e0f5826a2a1cd43f8295
  // const { education } = useSelector((state) => state.employeeProfileSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { profileDictionary } = profileDictionaryList[userLanguage];
  const { listArray } = useSelector((state) => state.stickySlice);
  const {
    user: { id: userId },
  } = useSelector((state) => state.userSlice);
<<<<<<< HEAD

  console.log(userId, 'userId');
=======
  console.log(userId, "userId");
>>>>>>> 98591ff91f438f3629b0e0f5826a2a1cd43f8295
  const onChange = (key) => {
    navigate(key);
  };

  useEffect(() => {
    setDefaultPath(pathname.split("_")[0]);
  }, [pathname]);

  console.log(listArray, 'listArray');

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [],
    ],
  };
  const formats = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ direction: 'rtl' }],
      [{ align: ['center'] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };
  const descHandler = (value) => {
    setDescription(value);
    console.log(description, 'descHandler');
    listArray.map((item) => {
      console.log(item.id, 'item.id');
      dispatch(targetStickyDescription({ id: item.id, value }));
    });
    addSticky({
      attachments: [],
      description: value,
    });
  };

  const panes = [
    {
      featureName: profileDictionary.feed,
      content: (
        <div className="flex gap-5">
          <NewsFeed
            isScheduler={false}
            isCheckedIn={false}
            width={"!w-full"}
            referenceType={4}
            referenceId={id}
            backButton={false}
            routeLink={ROUTES.USER.DEFAULT + id}
          />
          <div className="bg-white w-1/4 rounded-xl px-2">
            <CustomNotes
              onChange={(value) => descHandler(value)}
              modules={modules}
              formats={formats}
              className={'stickyNoteItem-textarea'}
              placeholder={'please enter your notes here'}
              defaultValue={'<h2>React Quill Rich Text Editor</h2>'}
            />
          </div>
        </div>
      ),
      featureId: ROUTES.USER.DEFAULT + id,
    },
    {
      featureName: profileDictionary.about,
      content: <ProfilePanel />,
      featureId: ROUTES.USER.DEFAULT + id + "/about",
    },
    {
      featureName: profileDictionary.awards,
      content: <AwardsTable />,
      featureId: ROUTES.USER.DEFAULT + id + "/awards",
    },
    {
      featureName: profileDictionary.appraisal,
      content: <AppraisalTable />,
      featureId: ROUTES.USER.DEFAULT + id + "/appraisal",
    },
    {
      featureName: profileDictionary.salary,
      content: <SalaryTable />,
      featureId: ROUTES.USER.DEFAULT + id + "/salary",
    },
    {
      featureName: profileDictionary.activityLog,
      content: <ActivityLog />,
      featureId: ROUTES.USER.DEFAULT + id + "/activityLog",
    },
    {
      featureName: profileDictionary.courses,
      content: <Courses />,
      featureId: ROUTES.USER.DEFAULT + id + "/courses",
    },
    {
      featureName: profileDictionary.leave,
      content: <Leaves />,
      featureId: ROUTES.USER.DEFAULT + id + "/leave",
    },
    {
      featureName: profileDictionary.education,
      content: <Education />,
      featureId: ROUTES.USER.DEFAULT + id + "/education",
    },
    {
      featureName: profileDictionary.experience,
      content: <Experience />,
      featureId: ROUTES.USER.DEFAULT + id + "/experience",
    },
    {
      featureName: profileDictionary.checkIn,
      content: <CheckIn />,
      featureId: ROUTES.USER.DEFAULT + id + "/checkIn",
    },
  ];

  useEffect(() => {
    dispatch(getEducationDetailByUser(id));
    dispatch(getUserWorkExperience(id));
    dispatch(getEmployeeByIdAction(id));
  }, []);

  return (
    <TabContainer>
      <ContBody className="!block">
        <div className="flex flex-row gap-5 h-[calc(100vh_-_60px)] w-full">
          <div className="rounded-xl flex flex-col gap-5 overflow-scroll w-full">
            <ProfileCover />
            <ProfileCoverDetail id={id} />
            <Tab
              panes={userId === id ? panes : panes.slice(0, 2)}
              canChangeRoute={true}
              onChange={onChange}
              defaultPath={defaultPath}
            />
          </div>
        </div>
      </ContBody>
    </TabContainer>
  );
};

export default Profile;
