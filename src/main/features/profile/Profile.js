import React, { useState, useContext, useEffect } from "react";
import {
  ContBody,
  TabContainer,
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
// import Courses from "../team/view/Courses";
import ActivityLog from "../team/view/ActivityLog";
import Education from "../team/view/Education";
import Leaves from "../team/view/Leaves";
import Experience from "../team/view/Experience";
import CheckIn from "../team/view/CheckIn";
import ProfileCover from "../projects/UI/ProfileCover";
import SingleNotes from "../notes/singleNotes/singleNotes";
import AppraisalTable from "./appraisals";
import AwardsTable from "./awards";
import SalaryTable from "./salary";
import { useSelector } from "react-redux";
import CustomNotes from "../notes/singleNotes/singleNotes";
import { CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Space } from "antd";
import Courses from "../eLearning/view/Dashboard/Sections/Courses/Courses";
import TeamAppraisal from "../appraisalModule/view/components/TeamAppraisal/index";
import { saveSticyNotesAction, getSticyNotesAction } from "./store/action";

const Profile = () => {
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const { id } = param;
  const [defaultPath, setDefaultPath] = useState("");
  // const { education } = useSelector((state) => state.employeeProfileSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { profileDictionary } = profileDictionaryList[userLanguage];
  const {
    user: { id: userId },
  } = useSelector((state) => state.userSlice);

  const { stickyNote } = useSelector((state) => state.employeeProfileSlice);
  const onChange = (key) => {
    navigate(key);
  };

  useEffect(() => {
    setDefaultPath(pathname.split("_")[0]);
  }, [pathname]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [],
    ],
  };
  const formats = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ direction: "rtl" }],
      [{ align: ["center"] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText("");
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <div onClick={copyToClipboard}>
              <CopyOutlined />
              <a className="drop-downList">Copy</a>
            </div>
          ),
          key: "1",
        },
        {
          label: <div></div>,
          key: "2",
          // icon: <HighlightOutlined onClick={openColorHandler} />,
        },
      ]}
    />
  );

  useEffect(() => {
    dispatch(getSticyNotesAction({}));
  }, []);
  const descHandler = (value) => {
    dispatch(saveSticyNotesAction({ description: value }));
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
          <div className="singleNote_container w-[500px]">
            <div className="singleNote_header">
              <div className="leftNote_Icon">
                <Dropdown menu={menu}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <EllipsisOutlined className="threedot_Icon" />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className="textArea_container bg-white">
              <CustomNotes
                onChange={(value) => descHandler(value)}
                className={"stickyNoteItem-textarea"}
                placeholder={"Take a Note"}
                defaultValue={stickyNote?.description}
                modules={modules}
                formats={formats}
              />
            </div>
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
      // content: <AppraisalTable />,
      // featureId: ROUTES.USER.DEFAULT + id + '/appraisal',
      content: <TeamAppraisal userId={id} />,
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
