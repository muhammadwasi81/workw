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
import WhiteCard from "../../../projects/UI/WhiteCard";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { groupsDictionaryList } from "../../localization";
// import Travel from "../../../travel/view/Travel";
// import { FeaturesEnum } from "../../../../../utils/Shared/enums/enums";
import {
  addGroupMemberAction,
  deleteGroupMemberAction,
  getGroupById,
  getGroupFeatures,
} from "../../store/actions";
import { handleComposer, resetGroupDetail } from "../../store/slice";
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
import GroupDefaultImage from "../../../../../content/NewContent/groups/GroupDefaultImage.svg";
import CoverImage from "../../../departments/view/CoverImage";
import GroupsInfo from "../UI/GroupsInfo";
import { addMember } from "../../store/slice";
import { getAllGroupMemberAction } from "../../store/actions";
import MemberModal from "../Modal/MemberModal";
import MySchedules from "../../../schedule/view/ScheduleDetail/SchedulesDetail";
import {
  GroupFeaturePermissionEnum,
  GroupFeaturePermissionEnumList,
} from "../../../../../utils/Shared/enums/groupFeatureEnum";
import ItemDetailModal from "../../../../sharedComponents/ItemDetails";
import { handleItemDetailModal } from "../../../../../utils/Shared/store/slice";
import Travel from "../../../travel/view/Travel";
import { QuotationReferenceTypeEnum } from "../../../quotation/enums";
import Quotations from "../../../quotation/view/QuotationList";
import { TravelReferenceTypeEnum } from "../../../travel/enums/enums";

function GroupDetails() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { groupsDictionary, Direction } = groupsDictionaryList[userLanguage];
  const { groupDetail, updateTextBtn, editGroup } = groupsDictionary;
  const params = useParams();
  const { groupId: id } = params;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [features, setFeatures] = useState([]);

  const detail = useSelector((state) => state.groupSlice.groupDetail);
  const { isComposerOpen, isEditComposer } = useSelector(
    (state) => state.groupSlice
  );
  const { groupFeatures } = useSelector((state) => state.groupSlice);

  useEffect(() => {
    dispatch(getGroupById(id));
  }, [id]);

  // useEffect(() => {
  //   dispatch(getGroupFeatures(id));
  // }, []);
  const memberHandler = () => {
    // setVisible(true);
    // // const userTypes = memberType === 1 ? Members.user : Members.admin;
    // dispatch(addMember({ status: true }));
    setVisible(true);
    dispatch(handleItemDetailModal(true));
  };

  // const handleOpenMembers = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setVisible(true);
  //   dispatch(handleItemDetailModal(true));
  //   handleClose(false);
  // };

  useEffect(() => {
    return () => {
      dispatch(resetGroupDetail());
    };
  }, []);

  let featurePermissions = groupFeatures.map((item) => item.featureId);
  // console.log(featurePermissions, "featurePermissionn");

  // function getUserPermissions(){
  //   return GroupFeaturePermissionEnumList.map((x)=>{
  //     if (featurePermissions?.includes(x.id)) {
  //       return x.featureId
  //     }
  //   })
  // }
  useEffect(() => {
    let temp = groupFeatures.map((feat) => {
      return {
        ...feat,
        content: featuresComp[feat.featureId],
      };
    });
    let payload =
      temp &&
      temp.filter((item) => featurePermissions.includes(item.featureId));
    setFeatures(payload);
  }, [groupFeatures]);

  const defaultRoute = ROUTES.GROUP.DEFAULT + "/" + id;
  const featuresComp = {
    1: (
      <NewsFeed
        referenceType={PostReferenceType.GROUP}
        referenceId={id}
        isScheduler={false}
        isCheckedIn={false}
        width={"!w-full"}
        backButton={false}
        routeLink={defaultRoute}
      />
    ),
    5: (
      <Task
        referenceType={TaskReferenceTypeEnum.Group}
        referenceId={id}
        feature={"3"}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    3: (
      <WorkBoard
        referenceType={WorkBoardReferenceTypeEnum.Group}
        referenceId={id}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    6: (
      <Expenses
        referenceType={ExpenseReferenceTypeEnum.Group}
        referenceId={id}
        width={"!w-full"}
        feature={3}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    2: <MySchedules />,
    4: (
      <Documents
        referenceType={DocumentReferenceTypeEnum.Group}
        referenceId={id}
        width={"!w-full"}
        routeLink={defaultRoute}
        backButton={false}
      />
    ),
    7: (
      <Travel
        referenceType={TravelReferenceTypeEnum.Group}
        referenceId={id.trim()}
        backButton={false}
      />
    ),
    8: (
      <Quotations
        referenceType={QuotationReferenceTypeEnum.Group}
        referenceId={id.trim()}
      />
    ),
  };

  const items = [
    {
      name: detail?.name,
      to: `${ROUTES.GROUP.DEFAULT}`,
      renderButton: [1],
    },
  ];
  const handleEditComposer = () => {
    dispatch(handleComposer({ isOpen: true, isEdit: true }));
  };
  const handleCloseComposer = () => {
    dispatch(handleComposer({ isOpen: false, isEdit: false }));
  };
  const buttons = [
    {
      buttonText: editGroup,
      icon: <EditOutlined />,
      onClick: handleEditComposer,
    },
  ];

  const onDelete = (userId) => {
    const memberId = userId.toString();
    const delmembers = {
      id: id,
      memberId: memberId,
    };

    dispatch(deleteGroupMemberAction(delmembers));
  };

  const addFunc = (userId) => {
    let memberId = userId.toString();
    const members = {
      id: detail.id,
      memberId: memberId,
    };
    dispatch(addGroupMemberAction(members));
  };

  return (
    <>
      <TabContainer>
        <Header items={items} buttons={buttons} />
        <ContBody className="!block" direction={Direction}>
          <div className="flex flex-row gap-5 h-[calc(100vh_-_60px)]">
            <div className="rounded-xl basis-9/12 flex flex-col gap-5 overflow-scroll ">
              <CoverImage image={detail?.image || GroupDefaultImage} />
              <CoverDetail detail={detail} key={detail} />
              <Tab panes={features} dir={Direction} id={id} />
            </div>

            <div className="basis-1/4 gap-5 flex flex-col overflow-scroll">
              <WhiteCard>
                <MemberCollapse
                  data={detail?.members}
                  isMember={true}
                  handleAdd={(e) => memberHandler(e)}
                  onDelete={onDelete}
                />
              </WhiteCard>
              <WhiteCard>
                <GroupsInfo />
              </WhiteCard>
            </div>
          </div>
        </ContBody>
      </TabContainer>
      <Drawer
        open={isComposerOpen}
        width={"786px"}
        onClose={handleCloseComposer}
        title={updateTextBtn}
        className={"shared_drawer drawerSecondary"}
        destroyOnClose={true}
      >
        <Composer
          buttonText={updateTextBtn}
          detail={detail}
          update={isEditComposer}
          id={id}
        />
      </Drawer>
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

export default GroupDetails;
