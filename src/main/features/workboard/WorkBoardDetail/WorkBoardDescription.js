import React, { useContext ,useState} from "react";
import { useDispatch,useSelector} from "react-redux";

import {
  AlignLeftOutlined,
  EyeOutlined,
  PaperClipOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { HiOutlineClipboardList } from "react-icons/hi";
// import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import DescriptionInput from "../UI/DescriptionInput";
import CommentComposer from "../../../sharedComponents/Comment/Composer";
import CommentWrapper from "../../../sharedComponents/Comment/CommentWrapper";


import CheckDate from "../UI/CheckDate";
import TodoTitleInput from "../UI/TodoTitleInput";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";
import "../WorkBoardDetail/style.css";
import MemberModal from "./TodoMemberModal";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { message, Modal } from "antd";
import { addMember } from "../store/slice";
import { initializeApp } from "firebase/app";

function WorkBoardDescription({
  dueDate,
  todoData,
  todoDetail,
  showLabelModal,
}) {

  console.log("tododataaa",todoData);
  const { userLanguage } = useContext(LanguageChangeContext);
  const [visible, setVisible] = useState(false);
  const [initailComments, setInitailComments] = useState([]);
  const { workBoardMembers } = useSelector((state) => state.trelloSlice);
  const { workboardDetail } = useSelector((state)=> state.trelloSlice);
  const { workboardsList } = useSelector((state) => state.trelloSlice)

  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, placeholder } = WorkBoardDictionaryList;
  const dispatch = useDispatch();

  const handleOpenMembers = () => {
    dispatch(addMember({ status: true }));
    setVisible(true);
    console.log(visible,"visiblee");
  }
  return (
    <>

    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <HiOutlineClipboardList className="text-xl text-gray-500" />
        <div className="flex flex-col gap-1 w-full">
          <TodoTitleInput
            title={todoData && todoData.title}
            id={todoData && todoData.id}
            sectionId={todoData && todoData.sectionId}
          />

          <span className="text-gray-500 flex items-center gap-2">
            {labels.inSection}
            <span className="cursor-pointer hover:text-gray-600">
              {todoData && todoData.workBoardSection}
            </span>
           
          </span>
        </div>
      </div>
  <div className="flex flex-row gap-16">
      <div className="flex gap-2">
        {dueDate && dueDate.length > 0 && (
          <div className="flex flex-col ">
            <span className="text-gray-500 font-semibold">
              {labels.dueDate}
            </span>
            <CheckDate todoData={todoData} />
          </div>
        )}
      
          <div className="flex flex-col">

           <div className="flex flex-row justify-between gap-20">
              <span className="text-gray-500">{labels.label}</span>
           </div>
           
            <div className="flex gap-2 items-center" onClick={showLabelModal}>
              {todoData.labels.map((label) => (
                <div
                  style={{ background: label.colorCode }}
                  className="px-[12px] w-auto min-w-[40px] h-[32px] rounded-sm hover:opacity-80 cursor-pointer"
                >
                  {label.label}
                </div>
              ))}
              <span className="p-2 px-3 cursor-pointer hover:bg-neutral-200 transition flex items-center bg-neutral-100 rounded-sm">
                <PlusOutlined className="!text-gray-600" />
              </span>
            </div>            
          </div>
      
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-20">
            <span className="text-gray-500">Members </span>
          </div>
          <div className="flex gap-2 items-center">
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Members"}
                  membersData={todoData?.members}
                  text={"Danish"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              <div onClick={handleOpenMembers}>
                <span className="p-2 px-3 cursor-pointer hover:bg-neutral-200 transition flex items-center bg-neutral-100 rounded-sm">
                  <PlusOutlined className="!text-gray-600" />
                </span>
              </div>
            </div>
      </div>
    </div>


      {/* <div className="flex gap-2 w-full">
				<AlignLeftOutlined className="!text-gray-500 text-lg" />
				<div className="flex flex-col gap-2 w-full"></div>
			</div> */}
      <DescriptionInput todoData={todoData} />

      <div className="flex gap-2 w-full">
        <PaperClipOutlined className="!text-gray-500 text-lg" />
        <div className="flex flex-row justify-between gap-56">
            <span className="text-black font-extrabold ">
              {labels.attachments}
            </span>
          </div>
      </div>

      <div className="flex gap-5 flex-col w-full">
        <div className="flex gap-2 items-center">
          <UnorderedListOutlined className="!text-gray-500 text-lg" />
          <span className="text-black font-extrabold ">{labels.activity}</span>
        </div>
         
        <div className="flex flex-row justify-between gap-2">
          <div className="w-full">
            <div className="comments">
              <CommentWrapper
                initailComments={initailComments}
                commentRequestSuccess={(comment) => {
                  setInitailComments([comment, ...initailComments ])
                }}
                referenceId={todoData.id}
                module={4}
                isCommentLoad={true}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
    {visible && <MemberModal data={todoData}/>}

          </>
    
  );
}

export default WorkBoardDescription;
