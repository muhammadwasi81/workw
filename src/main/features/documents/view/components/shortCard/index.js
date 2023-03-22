import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../../localization/index";
import "./style.css";
import menuIcon from "../../../../../../content/NewContent/Documents/3dots.svg";
import favorateIcon from "../../../../../../content/NewContent/Documents/favorate.svg";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import { getIconByExtensionType } from "../../../constant/helpers";
import { IconByExtensionType } from "../../../constant";
import { attachTypeApi } from "antd/lib/message";
import { DOCUMENT_ENUM } from "../../../constant";
import { Button, Modal } from "antd";
import moment from "moment";
import { handleParentId } from "../../../store/slice";
import { moveDirectory, moveDocument } from "../../../store/actions";
import { LockFilled, InfoCircleOutlined } from "@ant-design/icons";
import { privacyOption } from "../../../../../../utils/Shared/enums/enums";
import { openNotification } from "../../../../../../utils/Shared/store/slice";
import QuickOptions from "../quickOptions";
import DetailView from "../../documentShortCards/DetailView";

const DocShortCard = ({
  data,
  handlePreview,
  hideControls,
  detail = false,
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  const disptach = useDispatch();

  let {
    name,
    documentType = DOCUMENT_ENUM.DUCOMENT_TYPE.folder,
    creator = {},
    createDate,
    id,
    path,
    extensionTypeId,
    privacyId,
  } = data;
  let { DUCOMENT_TYPE } = DOCUMENT_ENUM;
  let { Public, Private, External } = privacyOption;
  const localTime = moment
    .utc(createDate)
    .local()
    .format();
  const handleClick = (item) => {
    if (documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.folder) {
      disptach(handleParentId(item));
    } else {
      handlePreview(item);
    }
  };
  const handleDrop = (item) => {
    let dragData = item.dragData.name;
    let dropData = item.dropData.name;
    if (
      dragData.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.folder &&
      dropData.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.folder
    ) {
      disptach(
        moveDirectory({
          parentId: dropData.id,
          documents: [dragData.id],
        })
      );
    } else if (dropData.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.folder) {
      disptach(
        moveDocument({
          parentId: dropData.id,
          documents: [dragData.id],
        })
      );
    } else {
      disptach(
        openNotification({
          message: "Invalid Move",
          type: "error",
        })
      );
    }
  };

  const infoHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      <DragDropContainer
        targetKey={"docsDrag"}
        dragData={{ name: data }}
        onDrop={handleDrop}
        key={data.id}
        noDragging={false}
      >
        <DropTarget
          onHit={(e) => {}}
          targetKey="docsDrag"
          highlighted
          dropData={{ name: data }}
          key={data.id}
        >
          <div
            className="d_ShortCard"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            id={data.id}
          >
            {!hideControls && !detail && (
              <div className="d_ShortCard_Child1">
                <img alt="" src={favorateIcon} />
                <div className="flex justify_between gap-2">
                  <InfoCircleOutlined
                    className="!text-[18px] cursor-pointer !text-[#707070] info-icon"
                    onClick={(e) => infoHandler(e)}
                  />
                  {documentType === DUCOMENT_TYPE.folder && (
                    <QuickOptions data={data} />
                  )}
                </div>
              </div>
            )}

            <div className="d_ShortCard_Child2">
              <img
                onClick={() => handleClick(data)}
                alt=""
                src={
                  documentType === DUCOMENT_TYPE.image && path
                    ? path
                    : getIconByExtensionType(documentType, extensionTypeId)
                }
              />
            </div>
            <div className="fileName">
              {" "}
              <div>{name}</div>
            </div>
            {!hideControls && (
              <div className="d_ShortCard_Child3">
                <div className="privacyStatus">
                  {privacyId === Private ? (
                    <LockFilled style={{ color: "var(--currentThemeColor)" }} />
                  ) : (
                    ""
                  )}
                </div>
                {!detail && (
                  <h6 className="dateTime">{moment(localTime).fromNow()}</h6>
                )}
                <div>
                  {/* {creator.image || creator.name &&
                                        <Avatar
                                            src={creator.image}
                                            name={creator.name}
                                            size={20}
                                            round={true}
                                        />} */}
                </div>
              </div>
            )}
          </div>
        </DropTarget>
      </DragDropContainer>
      {openDrawer && <DetailView id={data.id} onClose={onClose} />}
    </>
  );
};

export default DocShortCard;
