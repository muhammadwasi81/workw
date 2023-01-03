import React, { useContext, useEffect } from 'react';
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
import { Drawer } from 'antd';
import Composer from '../UI/Composer';
import { useState } from 'react';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { projectsDictionaryList } from '../localization';
import { resetProjectDetail } from '../store/slice';
import { FeaturesEnum } from '../../../../utils/Shared/enums/enums';
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

function ProjectDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.projectSlice.projectDetail);
  const [features, setFeatures] = useState([]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { projectsDictionary, Direction } = projectsDictionaryList[
    userLanguage
  ];
  const { updateTextBtn, labels } = projectsDictionary;
  const [open, setOpen] = useState(false);
  const { projectId } = params;
  console.log('projectId', projectId);
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
    10: <>Schedule</>,
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
