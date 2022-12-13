import React, { useContext } from "react";
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
import CheckDate from "../UI/CheckDate";
import TodoTitleInput from "../UI/TodoTitleInput";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";

function WorkBoardDescription({
  dueDate,
  todoData,
  todoDetail,
  showLabelModal,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, placeholder } = WorkBoardDictionaryList;

  return (
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
            <span className="underline cursor-pointer hover:text-gray-600">
              {todoData && todoData.workBoardSection}
            </span>
            <EyeOutlined className="" />
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        {dueDate && dueDate.length > 0 && (
          <div className="flex flex-col ">
            <span className="text-gray-500 font-semibold">
              {labels.dueDate}
            </span>
            <CheckDate todoData={todoData} />
          </div>
        )}
        {todoData.labels && todoData.labels.length > 0 && (
          <div className="flex flex-col">
            <span className="text-gray-500">{labels.label}</span>
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
        )}
      </div>
      {/* <div className="flex gap-2 w-full">
				<AlignLeftOutlined className="!text-gray-500 text-lg" />
				<div className="flex flex-col gap-2 w-full"></div>
			</div> */}
      <DescriptionInput todoData={todoData} />

      <div className="flex gap-2 w-full">
        <PaperClipOutlined className="!text-gray-500 text-lg" />
        <div className="flex flex-col gap-2 w-full">
          <span className="text-black font-extrabold ">
            {labels.attachments}
          </span>
          {/* <div className="bg-neutral-100 rounded-xl w-full "></div> */}
          {/* <SingleUpload position="left" multiple={true} /> */}
        </div>
      </div>
      <div className="flex gap-5 flex-col w-full">
        <div className="flex gap-2 items-center">
          <UnorderedListOutlined className="!text-gray-500 text-lg" />
          <span className="text-black font-extrabold ">{labels.activity}</span>
        </div>
        <CommentComposer isAttachment={false} />
      </div>
    </div>
  );
}

export default WorkBoardDescription;
