import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../../localization/index";
import './style.css';
import menuIcon from '../../../../../../content/NewContent/Documents/3dots.svg';
import favorateIcon from '../../../../../../content/NewContent/Documents/favorate.svg';
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import { getIconByExtensionType } from "../../../constant/helpers";
import { IconByExtensionType } from "../../../constant";
import { attachTypeApi } from "antd/lib/message";
import { DOCUMENT_ENUM } from "../../../constant";
import { Button, Modal } from 'antd';
import moment from "moment";
import { handleParentId } from "../../../store/slice";
import { moveDocument } from "../../../store/actions";
import { LockFilled } from '@ant-design/icons';
import { privacyOption } from "../../../../../../utils/Shared/enums/enums";
import { openNotification } from "../../../../../../utils/Shared/store/slice";
import QuickOptions from "../quickOptions";


const DocShortCard = ({ data, handlePreview }) => {
    const { userLanguage } = useContext(LanguageChangeContext);
    const { documentDictionary } = documentDictionaryList[userLanguage];
    const disptach = useDispatch()

    let {
        name,
        documentType = DOCUMENT_ENUM.DUCOMENT_TYPE.folder,
        creator = {},
        createDate,
        id,
        path,
        extensionTypeId,
        privacyId
    } = data;
    let { DUCOMENT_TYPE } = DOCUMENT_ENUM;
    let { Public, Private, External } = privacyOption
    const localTime = moment
        .utc(createDate)
        .local()
        .format();
    const handleClick = (item) => {
        if (documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.folder) {
            disptach(handleParentId(item))
        }
        else {
            handlePreview(item);
        }
    }
    const handleDrop = (item) => {
        let dragData = item.dragData.name;
        let dropData = item.dropData.name;
        if (dropData.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.folder) {
            disptach(moveDocument({
                parentId: dropData.id,
                documents: [
                    dragData.id
                ]
            }))
        }
        else {
            disptach(openNotification({
                message: "Invalid Move",
                type: "error"
            }))
        }
    }
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
                    onHit={(e) => { }}
                    targetKey="docsDrag"
                    highlighted
                    dropData={{ name: data }}
                    key={data.id}
                >
                    <div className="d_ShortCard"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                        id={data.id}
                    >
                        <div className="d_ShortCard_Child1" >
                            <img
                                alt=""
                                src={favorateIcon}
                            />
                            <QuickOptions data={data}/>
                            {/* <img
                                alt=""
                                src={menuIcon}
                            /> */}
                        </div>
                        {/* <div className="d_ShortCard_Child2">
                        <img
                            onClick={handleType}
                            alt=""
                            src={ documentType === DUCOMENT_TYPE.image ? 
                                  path : getIconByExtensionType(documentType)}
                        />
                    </div> */}
                        <div className="d_ShortCard_Child2">
                            <img
                                onClick={() => handleClick(data)}
                                alt=""
                                src={documentType === DUCOMENT_TYPE.image && path ?
                                    path : getIconByExtensionType(documentType, extensionTypeId)}
                            />
                        </div>
                        <div className="fileName">
                            <div>
                                {name}
                            </div>
                            {/* <h6>
                            {moment(createDate,'mm/dd/yyyy')}
                        </h6> */}
                        </div>
                        <div className="d_ShortCard_Child3">
                            <div className="privacyStatus">
                                {
                                    privacyId === Private ? <LockFilled style={{ color: "var(--currentThemeColor)" }} /> : ""
                                }
                            </div>
                            <h6 className="dateTime">
                                {moment(localTime).fromNow()}
                            </h6>
                            <div>
                                {creator.image || creator.name &&
                                    <Avatar
                                        src={creator.image}
                                        name={creator.name}
                                        size={20}
                                        round={true}
                                    />}
                            </div>
                        </div>
                    </div>
                </DropTarget>
            </DragDropContainer>
        </>
    );
};

export default DocShortCard;
