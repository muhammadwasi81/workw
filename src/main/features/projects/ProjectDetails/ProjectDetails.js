import { useContext, useEffect } from 'react';
import { ROUTES } from '../../../../utils/routes';
import {
  ContBody,
  TabContainer,
} from '../../../sharedComponents/AppComponents/MainFlexContainer';
import Tab from '../../../sharedComponents/Tab';
import LayoutHeader from '../../../layout/header/index';
import { EditOutlined } from '@ant-design/icons';
import Travel from '../../travel/view/Travel';
import '../styles/projects.css';
import Budget from '../UI/Budget';
import CoverDetail from '../UI/CoverDetail';
import CoverImage from '../../departments/view/CoverImage';
import MemberCollapse from '../../../sharedComponents/Collapseable/MemberCollapse';
import ProjectCover from '../../../../content/png/project_cover_img.png';
import WhiteCard from '../UI/WhiteCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById } from '../store/actions';
import { Collapse, Drawer } from 'antd';
import Composer from '../UI/Composer';
import { useState } from 'react';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { projectsDictionaryList } from '../localization';
import { resetProjectDetail } from '../store/slice';
import WorkBoard from '../../workboard';
import { TravelReferenceTypeEnum } from '../enum/enums';
import { PostReferenceType } from '../../feed/utils/constants';
import { TaskReferenceTypeEnum } from '../../task/enums/enum';
import { WorkBoardReferenceTypeEnum } from '../../workboard/enum';
import { ExpenseReferenceTypeEnum } from '../../expense/enums';
import { DocumentReferenceTypeEnum } from '../../documents/view/enum';
import NewsFeed from '../../feed/ui';
import Task from '../../task/view/Task';
import Expenses from '../../expense';
import Documents from '../../documents/view/documents';
import { handleComposeEmail } from '../../leadmanager/store/slice';
import ComposeEmail from '../../leadmanager/view/Email/ComposeEmail';
import CustomNotes from '../../notes/singleNotes/singleNotes';
import { Menu, Dropdown, Space } from 'antd';
import { CopyOutlined, EllipsisOutlined } from '@ant-design/icons';
import {
  saveStickyprojectAction,
  //saveStickyTitleAction,
  getProjectStickyAction,
} from '../store/actions';
import useDebounce from '../../../../utils/Shared/helper/use-debounce';
import StickyColor from '../UI/StickyColor';
import { formats, modules } from './utils';
import { DownOutlined } from '@ant-design/icons';
import ProjectSummary from '../view/ProjectSummary';
import Schedules from '../../schedule/index';
const { Panel } = Collapse;

function ProjectDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.projectSlice.projectDetail);
  const sticky = useSelector((state) => state.projectSlice.stickyArray);
  console.log(sticky, 'sticky array');
  const [features, setFeatures] = useState([]);
  const [description, setDescription] = useState(null);
  const descriptionDebounce = useDebounce(description, 500);
  console.log(descriptionDebounce, 'description');
  const [openColor, setOpenColor] = useState(true);
  const userId = useSelector((state) => state.userSlice.user.id);

  const [title, setTitle] = useState(null);
  const titleDebounce = useDebounce(title, 500);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { projectsDictionary } = projectsDictionaryList[userLanguage];
  const { updateTextBtn, labels } = projectsDictionary;
  const [open, setOpen] = useState(false);
  const { projectId } = params;

  useEffect(() => {
    dispatch(getProjectById(projectId));
  }, [projectId]);

  useEffect(() => {
    return () => {
      dispatch(resetProjectDetail());
    };
  }, []);

  useEffect(() => {
    let temp = detail?.features.map((feat) => {
      return {
        ...feat,
        content: featuresComp[feat.featureId],
      };
    });
    setFeatures(temp);
  }, [detail]);

  const panes = [
    {
      title: labels.travel,
      content: (
        <Travel
          referenceType={TravelReferenceTypeEnum.Project}
          referenceId={projectId}
          backButton={false}
        />
      ),
      key: 11,
    },
  ];
  const items = [
    {
      name: detail?.name,
      to: `${ROUTES.PROJECT.DEFAULT}`,
      renderButton: [1],
    },
  ];
  const handleEditComposer = () => {
    setOpen(!open);
  };
  const buttons = [
    {
      buttonText: labels.editProject,
      icon: <EditOutlined />,
      onClick: handleEditComposer,
    },
  ];

  const defaultRoute = ROUTES.PROJECT.DEFAULT + '/' + projectId;
  const featuresComp = {
    1: (
      <NewsFeed
        referenceType={PostReferenceType.PROJECTS}
        referenceId={projectId.trim()}
        backButton={false}
        isScheduler={false}
        isCheckedIn={false}
        width={'!w-full'}
        routeLink={defaultRoute}
      />
    ),
    6: (
      <Task
        referenceType={TaskReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={'!w-full'}
        routeLink={defaultRoute}
        backButton={false}
        feature={'2'}
      />
    ),
    7: (
      <WorkBoard
        referenceType={WorkBoardReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={'!w-full'}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    9: (
      <Expenses
        referenceType={ExpenseReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={'!w-full'}
        routeLink={defaultRoute}
        backButton={false}
        feature={3}
      />
    ),
    10: <Schedules referenceId={projectId.trim()} />,
    11: (
      <Travel
        referenceType={TravelReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        backButton={false}
      />
    ),
    12: (
      <Documents
        referenceType={DocumentReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={'!w-full'}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
  };

  useEffect(() => {
    dispatch(getProjectStickyAction({}));
  }, []);

  const descHandler = (value) => {
    dispatch(
      saveStickyprojectAction({
        description: value,
        title: 'sanjna',
        colorCode: 1,
      })
    );
  };

  useEffect(() => {
    if (descriptionDebounce) descHandler(descriptionDebounce);
  }, [descriptionDebounce]);

  const stickyDescriptionHandler = (value) => {
    dispatch(
      saveStickyprojectAction({
        description: value,
        userId,
       
      })
    );
  }


  const copyToClipboard = () => {
    navigator.clipboard.writeText('');
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
          key: '1',
        },
        {
          label: <div>{openColor && <StickyColor />}</div>,
          key: '2',
        },
      ]}
    />
  );
  return (
    <>
      <TabContainer>
        <LayoutHeader items={items} buttons={buttons} />
        <ContBody className="!block">
          <div className="flex flex-row gap-5 h-[calc(100vh_-_60px)]">
            <div className="rounded-xl basis-9/12 flex flex-col gap-5 overflow-scroll">
              <CoverImage image={detail?.image || ProjectCover} />
              <CoverDetail detail={detail} />
              <Tab panes={features} id={projectId} features={panes} />
            </div>
            <div className="basis-1/4 gap-5 flex flex-col overflow-scroll">
              <Budget data={detail} />
              <WhiteCard>
                <MemberCollapse
                  data={detail?.members}
                  isEmail={true}
                  isMember={true}
                  onEmailClick={() => {
                    dispatch(handleComposeEmail(true));
                  }}
                />
              </WhiteCard>
              <WhiteCard>
                <Collapse
                  expandIcon={({ isActive }) => (
                    <DownOutlined
                      rotate={isActive ? 0 : 180}
                      className="!text-lg !font-bold !text-primary-color"
                    />
                  )}
                  ghost={true}
                  expandIconPosition={'end'}
                  defaultActiveKey={['1']}
                >
                  <Panel
                    showArrow={true}
                    header={
                      <div>
                        <span className="text-base font-bold text-primary-color">
                          Information
                        </span>
                      </div>
                    }
                    className="custom_member_collapse"
                  >
                    <div className="font-bold flex items-center gap-2 mb-2">
                      <ProjectSummary />
                      <span>{'View Summary'}</span>
                    </div>
                  </Panel>
                </Collapse>
              </WhiteCard>
              <div className="singleNote_container">
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
                    onChange={(value) => stickyDescriptionHandler(value)}
                    modules={modules}
                    formats={formats}
                    className={'stickyNoteItem-textarea'}
                    placeholder={'Take a Note'}
                    defaultValue={description}
                  />
                </div>
              </div>
            </div>
          </div>
        </ContBody>
      </TabContainer>
      <Drawer
        open={open}
        width={'786px'}
        onClose={handleEditComposer}
        title={updateTextBtn}
        className={'shared_drawer drawerSecondary'}
      >
        <Composer
          buttonText={updateTextBtn}
          detail={detail}
          update={true}
          id={projectId}
        />
      </Drawer>
      <ComposeEmail />
    </>
  );
}

export default ProjectDetails;
