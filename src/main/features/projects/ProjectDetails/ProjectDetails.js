import { useContext, useEffect, useState } from "react";
import { ROUTES } from "../../../../utils/routes";
import {
  ContBody,
  TabContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import Tab from "../../../sharedComponents/Tab";
import LayoutHeader from "../../../layout/header/index";
import {
  EditOutlined,
  CopyOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Travel from "../../travel/view/Travel";
import "../styles/projects.css";
import Budget from "../UI/Budget";
import CoverDetail from "../UI/CoverDetail";
import CoverImage from "../../departments/view/CoverImage";
import MemberCollapse from "../../../sharedComponents/Collapseable/MemberCollapse";
import ProjectCover from "../../../../content/png/project_cover_img.png";
import WhiteCard from "../UI/WhiteCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectById,
  saveStickyproject,
  getProjectSticky,
} from "../store/actions";
import { Collapse, Drawer, Modal, Form, Menu, Dropdown, Space } from "antd";
import Composer from "../UI/Composer";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { projectsDictionaryList } from "../localization";
import {
  resetProjectDetail,
  targetStickyDescription,
  addMember,
} from "../store/slice";
import WorkBoard from "../../workboard";
import { TravelReferenceTypeEnum } from "../enum/enums";
import { PostReferenceType } from "../../feed/utils/constants";
import { TaskReferenceTypeEnum } from "../../task/enums/enum";
import { WorkBoardReferenceTypeEnum } from "../../workboard/enum";
import { ExpenseReferenceTypeEnum } from "../../expense/enums";
import { DocumentReferenceTypeEnum } from "../../documents/view/enum";
import NewsFeed from "../../feed/ui";
import Task from "../../task/view/Task";
import Expenses from "../../expense";
import Documents from "../../documents/view/documents";
import CustomNotes from "../../notes/singleNotes/singleNotes";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import StickyColor from "../UI/StickyColor";
import { formats, modules } from "./utils";
import Schedules from "../../schedule/index";
import MemberModal from "../UI/MemberModal";
import ProjectInformation from "../UI/ProjectInformation";
import { STRINGS } from "../../../../utils/base";
import {
  addProjectMemberAction,
  deleteProjectMemberAction,
} from "../store/actions";
import ItemDetailModal from "../../../sharedComponents/ItemDetails";
import { handleItemDetailModal } from "../../../../utils/Shared/store/slice";
import { ProjectFeaturePermissionEnumList } from "../../../../utils/Shared/enums/projectFeatureEnum";

function ProjectDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.projectSlice.projectDetail);
  const { projectSticky } = useSelector((state) => state.projectSlice);
  console.log(projectSticky, "sticky array");
  const [projectfeatures, setprojectFeatures] = useState([]);
  const [description, setDescription] = useState(null);
  const descriptionDebounce = useDebounce(description, 500);

  const [openColor, setOpenColor] = useState(true);

  const [visible, setVisible] = useState(false);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { projectsDictionary } = projectsDictionaryList[userLanguage];
  const { updateTextBtn, labels, features } = projectsDictionary;
  const [open, setOpen] = useState(false);
  const { projectId } = params;
  const { projectFeature } = useSelector((state) => state.projectSlice);

  useEffect(() => {
    dispatch(getProjectById(projectId));
  }, [projectId]);

  useEffect(() => {
    return () => {
      dispatch(resetProjectDetail());
    };
  }, []);

  let featurePermissions = projectFeature.map((item) => item.featureId);

  useEffect(() => {
    let temp = projectFeature.map((feat) => {
      return {
        ...feat,
        content: featuresComp[feat.featureId],
      };
    });
    let payload =
      temp &&
      temp.filter((item) => featurePermissions.includes(item.featureId));
    setprojectFeatures(payload);
  }, [projectFeature]);

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

  const defaultRoute = ROUTES.PROJECT.DEFAULT + "/" + projectId;
  const featuresComp = {
    1: (
      <NewsFeed
        referenceType={PostReferenceType.PROJECTS}
        referenceId={projectId.trim()}
        backButton={false}
        isScheduler={false}
        isCheckedIn={false}
        width={"!w-full"}
        routeLink={defaultRoute}
      />
    ),
    6: (
      <Task
        referenceType={TaskReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
        feature={"2"}
      />
    ),
    7: (
      <WorkBoard
        referenceType={WorkBoardReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    9: (
      <Expenses
        referenceType={ExpenseReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={"!w-full"}
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
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
  };

  const memberHandler = () => {
    setVisible(true);
    dispatch(addMember({ status: true }));
  };
  useEffect(() => {
    dispatch(getProjectSticky());
  }, []);

  useEffect(() => {
    if (descriptionDebounce) setDescriptionValue(descriptionDebounce);
  }, [descriptionDebounce]);

  const setDescriptionValue = (value) => {
    dispatch(
      saveStickyproject({
        id: projectId,
        description: value,
      })
    );
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
          label: <div>{openColor && <StickyColor />}</div>,
          key: "2",
        },
      ]}
    />
  );

  const onDelete = (userId) => {
    const memberId = userId.toString();
    const delmembers = {
      id: projectId,
      memberId: memberId,
    };

    dispatch(deleteProjectMemberAction(delmembers));
  };

  const addFunc = (id) => {
    let memberId = id.toString();
    const members = {
      id: detail.id,
      memberId: memberId,
    };
    dispatch(addProjectMemberAction(members));
  };

  console.log(projectSticky);

  return (
    <>
      <TabContainer>
        <LayoutHeader items={items} buttons={buttons} />
        <ContBody className="!block">
          <div className="flex flex-row gap-5 h-[calc(100vh_-_60px)]">
            <div className="rounded-xl basis-9/12 flex flex-col gap-5 overflow-scroll">
              <CoverImage image={detail?.image || ProjectCover} />
              <CoverDetail detail={detail} />
              <Tab panes={projectfeatures} id={projectId} features={panes} />
            </div>
            <div className="basis-1/4 gap-5 flex flex-col overflow-scroll">
              <Budget data={detail} />
              <WhiteCard>
                <MemberCollapse
                  data={detail?.members}
                  isEmail={false}
                  isMember={true}
                  handleAdd={(e) => memberHandler(e)}
                />
              </WhiteCard>
              <WhiteCard>
                <ProjectInformation />
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
                  {projectSticky?.id && (
                    <CustomNotes
                      onChange={(value) => setDescription(value)}
                      modules={modules}
                      formats={formats}
                      className={"stickyNoteItem-textarea"}
                      placeholder={"Take a Note"}
                      defaultValue={projectSticky?.description}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </ContBody>
      </TabContainer>
      <Drawer
        open={open}
        width={"786px"}
        onClose={handleEditComposer}
        title={updateTextBtn}
        className={"shared_drawer drawerSecondary"}
      >
        <Composer
          buttonText={updateTextBtn}
          detail={detail}
          update={true}
          id={projectId}
        />
      </Drawer>

      {/* {visible && <MemberModal data={detail} />} */}
      {visible && (
        <ItemDetailModal
          data={detail?.members} //Data
          isDeleteDisabled={false} //Pass true to hide delete icon
          addEnabled={true} //Pass false to hide select member
          addFunc={addFunc}
          onDelete={onDelete}
          isSearch={true} //Pass true if you want to search the list
          openModal={true}
        />
      )}
    </>
  );
}

export default ProjectDetails;
