import { useContext, useEffect } from "react";
import { ROUTES } from "../../../../utils/routes";
import {
  ContBody,
  TabContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import Tab from "../../../sharedComponents/Tab";
import LayoutHeader from "../../../layout/header/index";
import { EditOutlined } from "@ant-design/icons";
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
import { getProjectById } from "../store/actions";
import { Collapse, Drawer, Modal, Form } from "antd";
import Composer from "../UI/Composer";
import { useState } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { projectsDictionaryList } from "../localization";
import { resetProjectDetail } from "../store/slice";
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
import { handleComposeEmail } from "../../leadmanager/store/slice";
import ComposeEmail from "../../leadmanager/view/Email/ComposeEmail";
import CustomNotes from "../../notes/singleNotes/singleNotes";
import { Menu, Dropdown, Space } from "antd";
import { CopyOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import {
  saveProjectStickyAction,
  saveStickyTitleAction,
  getProjectStickyAction,
} from "../store/actions";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import StickyColor from "../UI/StickyColor";
import { formats, modules } from "./utils";
import { DownOutlined } from "@ant-design/icons";
import ProjectSummary from "../view/ProjectSummary";
import Schedules from "../../schedule/index";
import { addMember } from "../store/slice";
import MemberModal from "../UI/MemberModal";
import FeatureSelect from "../../../sharedComponents/FeatureSelect/Index";
import { FeaturesEnum } from "../../../../utils/Shared/enums/enums";
import {
  addProjectFeatureAction,
  removeProjectFeatureAction,
  getProjectFeatureAction,
} from "../store/actions";
const { Panel } = Collapse;

function ProjectDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.projectSlice.projectDetail);
  const sticky = useSelector((state) => state.projectSlice.stickyArray);
  const [projectfeatures, setFeatures] = useState([]);
  console.log(projectfeatures, "project featuress");
  const [description, setDescription] = useState(null);
  const descriptionDebounce = useDebounce(description, 500);
  const [openColor, setOpenColor] = useState(true);
  const [form] = Form.useForm();

  const [title, setTitle] = useState(null);
  const titleDebounce = useDebounce(title, 500);
  const [visible, setVisible] = useState(false);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { projectsDictionary } = projectsDictionaryList[userLanguage];
  const { updateTextBtn, labels, features } = projectsDictionary;
  const [open, setOpen] = useState(false);
  const { projectId } = params;
  const [openFeature, setOpenFeature] = useState(false);

  const featureHandler = () => {
    setOpenFeature(true);
  };
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

    // form.setFieldsValue({
    //   features: detail?.features.map((item) => {
    //     return { featureId: item.featureId };
    //   }),
    // });
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
    dispatch(getProjectStickyAction({}));
  }, []);

  const descHandler = (value) => {
    dispatch(
      saveProjectStickyAction({
        description: value,
        title: "sanjna",
        colorCode: 1,
      })
    );
  };

  useEffect(() => {
    if (descriptionDebounce) descHandler(descriptionDebounce);
  }, [descriptionDebounce]);

  const setTitleValue = (value) => {
    dispatch(
      saveStickyTitleAction({
        title: value,
        description: "some",
        colorCode: 1,
      })
    );
  };

  useEffect(() => {
    if (titleDebounce) setTitleValue(titleDebounce);
  }, [titleDebounce]);

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
  useEffect(() => {
    dispatch(getProjectFeatureAction(projectId));
  }, []);
  const onFeatureHandler = (featureId, checked) => {
    if (checked) {
      const payload = {
        featureId: featureId,
        projectId: projectId,
      };
      console.log(projectfeatures, "projectt featuress");
      dispatch(addProjectFeatureAction([payload]));
    } else {
      dispatch(
        removeProjectFeatureAction({
          id: projectId,
          featureId: featureId,
        })
      );
    }
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
                <Collapse
                  expandIcon={({ isActive }) => (
                    <DownOutlined
                      rotate={isActive ? 0 : 180}
                      className="!text-lg !font-bold !text-primary-color"
                    />
                  )}
                  ghost={true}
                  expandIconPosition={"end"}
                  defaultActiveKey={["0"]}
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
                      <span>{"View Summary"}</span>
                    </div>
                    <div
                      className="text-black text-sm font-bold flex items-center gap-2 mb-2"
                      onClick={featureHandler}
                    >
                      <EyeOutlined />
                      Features
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
                    onChange={(value) => setDescription(value)}
                    modules={modules}
                    formats={formats}
                    className={"stickyNoteItem-textarea"}
                    placeholder={"Take a Note"}
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
      {visible && <MemberModal data={detail} />}
      {openFeature && (
        <Modal
          title=""
          centered
          className="modal-body"
          footer={false}
          open={openFeature}
          onOk={() => setOpenFeature(false)}
          onCancel={() => setOpenFeature(false)}
          closable={false}
          width={900}
        >
          {projectfeatures && (
            <FeatureSelect
              features={projectfeatures}
              form={form}
              notIncludeFeature={FeaturesEnum.Travel}
              onChange={onFeatureHandler}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default ProjectDetails;
