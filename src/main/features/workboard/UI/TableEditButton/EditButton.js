import React, { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../../localization";

function EditButton({ handleSave, saveLabel, handleDelete, handleCancel }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, placeholder } = WorkBoardDictionaryList;
  return (
    <div className="Edit-Buttons flex py-2 gap-2 items-center">
      <div
        tabIndex="0"
        className="Edit-Button cursor-pointer w-fit rounded-sm outline-none p-1 px-2  hover:opacity-90 !bg-[#0079bf] hover:!bg-[#026aa7] !text-white !border-none "
        onClick={handleSave}
      >
        {saveLabel}
    </div>
    </div>
  );
}

export default EditButton;
