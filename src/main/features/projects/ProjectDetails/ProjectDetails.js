import { useContext, useEffect, useState } from "react";
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
import { Drawer } from "antd";
import Composer from "../UI/Composer";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { projectsDictionaryList } from "../localization";
import { resetProjectDetail, addMember } from "../store/slice";
import WorkBoard from "../../workboard";
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
import { formats, modules } from "./utils";
import Schedules from "../../schedule/index";
import ProjectInformation from "../UI/ProjectInformation";
import {
  addProjectMemberAction,
  deleteProjectMemberAction,
} from "../store/actions";
import ItemDetailModal from "../../../sharedComponents/ItemDetails";
import Quotations from "../../quotation/view/QuotationList/index";
import { QuotationReferenceTypeEnum } from "../../quotation/enums";
import ProjectMiniDashBoard from "../UI/ProjectMiniDashBoard";
import { TravelReferenceTypeEnum } from "../../travel/enums/enums";

function ProjectDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.projectSlice.projectDetail);

  const [projectfeatures, setprojectFeatures] = useState([]);
  const [description, setDescription] = useState("");
  const descriptionDebounce = useDebounce(description, 500);
  const [visible, setVisible] = useState(false);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { projectsDictionary } = projectsDictionaryList[userLanguage];
  const { updateTextBtn, labels } = projectsDictionary;
  const [open, setOpen] = useState(false);
  let { projectId } = params;
  projectId = projectId.trim();
  const { projectFeature, projectSticky } = useSelector(
    (state) => state.projectSlice
  );

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
    5: (
      <Task
        referenceType={TaskReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
        feature={"2"}
      />
    ),
    3: (
      <WorkBoard
        referenceType={WorkBoardReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    6: (
      <Expenses
        referenceType={ExpenseReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
        feature={3}
      />
    ),
    2: <Schedules referenceId={projectId.trim()} />,
    7: (
      <Travel
        referenceType={TravelReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        backButton={false}
      />
    ),
    4: (
      <Documents
        referenceType={DocumentReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    8: (
      <Quotations
        referenceType={QuotationReferenceTypeEnum.Project}
        referenceId={projectId.trim()}
      />
    ),
  };

  useEffect(() => {
    setDescription(projectSticky?.description);
  }, [projectSticky]);

  const memberHandler = () => {
    setVisible(true);
    dispatch(addMember({ status: true }));
  };

  useEffect(() => {
    dispatch(getProjectSticky(projectId));
  }, [projectId]);

  useEffect(() => {
    if (descriptionDebounce) setDescriptionValue(descriptionDebounce);
  }, [descriptionDebounce]);

  const setDescriptionValue = (value) => {
    dispatch(
      saveStickyproject({
        description: value,
        referenceId: projectId,
      })
    );
  };

  const onDelete = (userId) => {
    const memberId = userId.toString();
    const delMembers = {
      id: projectId,
      memberId: memberId,
    };

    dispatch(deleteProjectMemberAction(delMembers));
  };

  const addFunc = (id) => {
    let memberId = id.toString();
    const members = {
      id: detail?.id,
      memberId: memberId,
    };
    dispatch(addProjectMemberAction(members));
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
              <Tab panes={projectfeatures} id={projectId} />
            </div>
            <div className="basis-1/4 gap-5 flex flex-col overflow-scroll">
              <ProjectMiniDashBoard data={detail} />
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
                <div className="singleNote_header"></div>
                <div className="textArea_container bg-white">
                  {projectSticky?.referenceId === projectId && (
                    <CustomNotes
                      onChange={(value) => setDescription(value)}
                      modules={modules}
                      formats={formats}
                      className={"stickyNoteItem-textarea"}
                      placeholder={"Take a Note"}
                      defaultValue={projectSticky?.description}
                    />
                  )}

                  {projectSticky?.description.length === 0 && (
                    <CustomNotes
                      onChange={(value) => setDescription(value)}
                      modules={modules}
                      formats={formats}
                      className={"stickyNoteItem-textarea"}
                      placeholder={"Take a Note"}
                      defaultValue={""}
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

      {
        <ItemDetailModal
          data={detail?.members} //Data
          isDeleteDisabled={false} //Pass true to hide delete icon
          addEnabled={true} //Pass false to hide select member
          addFunc={addFunc}
          onDelete={onDelete}
          isSearch={true} //Pass true if you want to search the list
          openModal={true}
          visible={visible}
          setVisible={(da) => setVisible(da)}
        />
      }
    </>
  );
}

export default ProjectDetails;
