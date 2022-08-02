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



const DocShortCard = ({ data, handlePreview }) => {
    const { userLanguage } = useContext(LanguageChangeContext);
    const { documentDictionary } = documentDictionaryList[userLanguage];
    const disptach = useDispatch()

    let { name, documentType, creator, createDate, id, path } = data
    let { DUCOMENT_TYPE } = DOCUMENT_ENUM;

    const handleClick = (item) => {

        if (documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.folder) {
            disptach(handleParentId(item))
        }
        else {
            handlePreview(item);
        }
    }

    return (
        <>
            <DragDropContainer
                targetKey="docsDrag"
                dragData={{ name: "props.name" }}
                onDrop={() => { }}
                noDragging={false}>
                <DropTarget
                    onHit={() => { }}
                    targetKey="docsDrag"
                    highlighted
                    dropData={{ name: "props.name" }}>
                    <div className="d_ShortCard" >
                        <div className="d_ShortCard_Child1" >
                            <img
                                alt=""
                                src={favorateIcon}
                            />
                            <img
                                alt=""
                                src={menuIcon}
                            />
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
                                    path : getIconByExtensionType(documentType)}
                            />
                        </div>
                        <div className="fileName">
                            <h5>
                                {name}
                            </h5>
                            {/* <h6>
                            {moment(createDate,'mm/dd/yyyy')}
                        </h6> */}
                        </div>
                        <div className="d_ShortCard_Child3">
                            <div></div>
                            <div>
                                <Avatar
                                    src={creator.image}
                                    size={20}
                                    round={true}
                                />
                            </div>
                        </div>
                    </div>
                </DropTarget>
            </DragDropContainer>
        </>
    );
};

export default DocShortCard;
