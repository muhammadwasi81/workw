import React, { useContext } from "react";
import WorkBoardCover from "../../../../content/png/workboard_cover_image.jpeg";
import { ImFolderUpload } from "react-icons/im";
import { CloseOutlined } from "@ant-design/icons";
import UploadBgImg from "./UploadBgImg";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";

function WBDCoverImage({ image, onUploadImg, onRemoveImg }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, placeholder } = WorkBoardDictionaryList;

  return (
    <div className="relative h-[160px] bg-neutral-300">
      <CloseOutlined
        className="!text-primary-color !font-bold bg-neutral-100 rounded-full p-[5px] text-right mr-auto max-w-fit absolute top-2 right-3 cursor-pointer text-xs"
        onClick={onRemoveImg}
      />
      <img
        src={image}
        alt=""
        className="rounded-xl h-[160px] w-full object-contain"
      />
      <UploadBgImg onUploadImg={onUploadImg}>
        <div className="!text-primary-color font-bold bg-neutral-100 rounded-lg p-[2px] text-right mr-auto max-w-fit absolute bottom-3 right-5 cursor-pointer text-sm flex gap-1 items-center px-2">
          <ImFolderUpload className="!text-primary-color !font-bold  cursor-pointer text-sm" />
          <span>{labels.uploadCoverPhoto}</span>
        </div>
      </UploadBgImg>
    </div>
  );
}

export default WBDCoverImage;
