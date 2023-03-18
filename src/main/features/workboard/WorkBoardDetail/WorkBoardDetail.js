import React, { useEffect, useState, useContext } from "react";

import {
  CheckSquareOutlined,
  PaperClipOutlined,
  PictureOutlined,
  TagOutlined,
} from "@ant-design/icons";

import {
  ContBody,
  TabContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import MemberCollapse from "../../../sharedComponents/Collapseable/MemberCollapse";

import TrelloThemeButton from "../UI/TrelloThemeButton";
import WBDCoverImage from "./WBDCoverImage";
import WorkBoardDescription from "./WorkBoardDescription";
import MemberModal from "../Modal/MemberModal";
import LabelModal from "../Modal/LabelModal/LabelModal";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { useDispatch } from "react-redux";
import { openDateModal, openMembersModal } from "../store/slice";
import { useSelector } from "react-redux";
import Upload from "antd/lib/upload/Upload";
import { jsonToFormData } from "../../../../utils/base";
import { DEFAULT_GUID } from "../../../../utils/constants";
import {
  removeWorkBoardTodoImage,
  updateWorkBoardTodoImage,
} from "../store/action";
import UploadBgImg from "./UploadBgImg";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";

function WorkBoardDetail({ todoDetail }) {
  console.log(todoDetail, "todoDetail");
  // const [members, setMembers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const addMemberCardId = useSelector(
    (state) => state.trelloSlice.addMemberCardId
  );
  const workboardsListData = useSelector(
    (state) => state.trelloSlice.workboardsList
  );
 
  const [todoData, setTodoData] = useState(todoDetail);

  useEffect(() => {
    if (todoDetail) {
      setTodoData(todoDetail);
    }
  }, [todoDetail]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, placeholder } = WorkBoardDictionaryList;
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);

  const showLabelModal = () => {
    setIsLabelModalVisible(!isLabelModalVisible);
  };
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const addMembers = () => {
    dispatch(openMembersModal({ addMember: true, cardId: addMemberCardId }));
  };

  // const onSave = members => {
  // 	setIsModalVisible(false);
  // 	setMembers(members);
  // };

  const onUploadImg = (info) => {
    const { fileList } = info;
    const file = fileList[0].originFileObj;
    const response = jsonToFormData({
      todoId: todoData.id,
      image: { id: DEFAULT_GUID, file },
      sectionId: todoData.sectionId,
    });

    dispatch(updateWorkBoardTodoImage(response));
  };

  const onRemoveImg = () => {
    dispatch(
      removeWorkBoardTodoImage({
        id: todoData.id,
        sectionId: todoData.sectionId,
      })
    );
  };
  const handleOpenMembers = (e) => {
    setVisible(true);
    e.preventDefault();
    e.stopPropagation();
  }

  const showDateModal = () => {
    dispatch(
      openDateModal({
        isDateModalOpen: true,
        todoId: todoData.id,
        sectionId: todoData.sectionId,
      })
    );
  };
  return (
    <>
      <div className=" bg-white rounded-xl mt-5">
        <div className="flex flex-col gap-5">
          {/* {todoData && todoData.image.length > 0 && (
            <WBDCoverImage
              todoData={todoData}
              image={todoData && todoData.image}
              onUploadImg={onUploadImg}
              onRemoveImg={onRemoveImg}
            />
          )} */}
          <div className="flex gap-5 justify-between flex-wrap sm:flex-nowrap">
            <div className="w-full sm:basis-9/12">
              <WorkBoardDescription
                todoData={todoData}
                todoDetail={todoDetail}
                dueDate={todoDetail ? todoDetail.dueDate : ""}
                cardId={addMemberCardId}
                showLabelModal={showLabelModal}
              />
            </div>
            <div className="w-full sm:basis-3/12 mt-5 sm:mt-[50px]">
              <div className="flex flex-col gap-5">
									
                {/* <TrelloThemeButton
                  text={labels.label}
                  icon={<TagOutlined />}
                  onClick={showLabelModal}
                /> */}
                {/* <TrelloThemeButton
									text={"Check List"}
									icon={<CheckSquareOutlined />}
								/> */}
                {/* <TrelloThemeButton
                  text={labels.dates}
                  icon={<TagOutlined />}
                  onClick={showDateModal}
                /> */}
                {/* <TrelloThemeButton
									text={"Attachment"}
									icon={<PaperClipOutlined />}
								/> */}
                {/* {todoData && todoData.image.length === 0 && (
                  <UploadBgImg onUploadImg={onUploadImg}>
                    <TrelloThemeButton
                      text={labels.cover}
                      icon={<PictureOutlined />}
                    />
                  </UploadBgImg>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LabelModal
        showLabelModal={showLabelModal}
        isLabelModalVisible={isLabelModalVisible}
        todoDetail={todoDetail}
      />
    </>
  );
}

export default WorkBoardDetail;
