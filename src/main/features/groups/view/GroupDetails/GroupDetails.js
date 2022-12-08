import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Drawer } from "antd";

import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import {
  ContBody,
  TabContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import MemberCollapse from "../../../../sharedComponents/Collapseable/MemberCollapse";
import Tab from "../../../../sharedComponents/Tab";
import CoverDetail from "../../../projects/UI/CoverDetail";
import CoverImage from "../../../projects/UI/CoverImage";
import WhiteCard from "../../../projects/UI/WhiteCard";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { groupsDictionaryList } from "../../localization";
// import Travel from "../../../travel/view/Travel";
// import { FeaturesEnum } from "../../../../../utils/Shared/enums/enums";
import { getGroupById } from "../../store/actions";
import { resetGroupDetail } from "../../store/slice";
import { EditOutlined } from "@ant-design/icons";
import Composer from "../UI/Composer";
import NewsFeed from "../../../feed/ui";
import Task from "../../../task/view/Task";
import Expenses from "../../../expense";
import { ExpenseReferenceTypeEnum } from "../../../expense/enums";
import { TaskReferenceTypeEnum } from "../../../task/enums/enum";
import { PostReferenceType } from "../../../feed/utils/constants";
import { DocumentReferenceTypeEnum } from "../../../documents/view/enum";
import WorkBoard from "../../../workboard";
import { WorkBoardReferenceTypeEnum } from "../../../workboard/enum";
import Documents from "../../../documents/view/documents";
import ComposeEmail from "../../../leadmanager/view/Email/ComposeEmail";
import { handleComposeEmail } from "../../../leadmanager/store/slice";
import GroupDefaultImage from "../../../../../content/NewContent/groups/GroupDefaultImage.svg";

function GroupDetails() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { groupsDictionary, Direction } = groupsDictionaryList[userLanguage];
  const { groupDetail, updateTextBtn, editGroup } = groupsDictionary;
  const params = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.groupSlice.groupDetail);
  const [features, setFeatures] = useState([]);
  const [open, setOpen] = useState(false);
  const { groupId: id } = params;
  useEffect(() => {
    dispatch(getGroupById(id));
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(resetGroupDetail());
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

  const defaultRoute = ROUTES.GROUP.DEFAULT + "/" + id;
  const featuresComp = {
    1: (
      <NewsFeed
        referenceType={PostReferenceType.GROUP}
        referenceId={id}
        backButton={false}
        isScheduler={false}
        isCheckedIn={false}
        width={"!w-full"}
        routeLink={defaultRoute}
      />
    ),
    6: (
      <Task
        referenceType={TaskReferenceTypeEnum.Group}
        referenceId={id}
        feature={"3"}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    7: (
      <WorkBoard
        referenceType={WorkBoardReferenceTypeEnum.Group}
        referenceId={id}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    9: (
      <Expenses
        referenceType={ExpenseReferenceTypeEnum.Group}
        referenceId={id}
        width={"!w-full"}
        feature={3}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    10: <>Schedule</>,
    12: (
      <Documents
        referenceType={DocumentReferenceTypeEnum.Group}
        referenceId={id}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
  };
  const panes = [
    {
      title: groupDetail.discussion,
      content: <div>Discussion div</div>,
      key: 0,
    },
    {
      title: groupDetail.schedule,
      content: <div>Schedule div</div>,
      key: 1,
    },

    {
      title: groupDetail.task,
      content: <div>Task div</div>,
      key: 2,
    },
    {
      title: groupDetail.expenses,
      content: <div>Expenses div</div>,
      key: 3,
    },
    {
      title: groupDetail.documents,
      content: <div>Documents div</div>,
      key: 4,
    },
  ];
  const items = [
    {
      name: detail?.name,
      to: `${ROUTES.GROUP.DEFAULT}`,
      renderButton: [1],
    },
  ];
  const handleEditComposer = () => {
    setOpen(!open);
  };
  const buttons = [
    {
      buttonText: editGroup,
      icon: <EditOutlined />,
      onClick: handleEditComposer,
    },
  ];

  return (
    <>
      <TabContainer>
        <Header items={items} buttons={buttons} />
        <ContBody className="!block" direction={Direction}>
          <div className="flex flex-row gap-5 h-[calc(100vh_-_60px)]">
            <div className="rounded-xl basis-9/12 flex flex-col gap-5 overflow-scroll ">
              <CoverImage image={detail?.image || GroupDefaultImage} />
              <CoverDetail detail={detail} key={detail} />
              <Tab panes={features} dir={Direction} id={id} features={panes} />
            </div>

            <div className="basis-1/4 gap-5 flex flex-col overflow-scroll">
              <WhiteCard>
                <MemberCollapse
                  isEmail={true}
                  onEmailClick={() => {
                    dispatch(handleComposeEmail(true));
                  }}
                  data={detail?.members}
                  isMember={true}
                />
              </WhiteCard>
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
        destroyOnClose={true}
      >
        <Composer
          buttonText={updateTextBtn}
          detail={detail}
          update={true}
          id={id}
        />
      </Drawer>
      <ComposeEmail />
    </>
  );
}

export default GroupDetails;
