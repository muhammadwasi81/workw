import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import "./style.css";
import menuIcon from "../../../../../../content/NewContent/Documents/3dots.svg";
import favorateIcon from "../../../../../../content/NewContent/Documents/favorate.svg";
=======
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../../localization/index";
import './style.css';
import menuIcon from '../../../../../../content/NewContent/Documents/3dots.svg';
import favorateIcon from '../../../../../../content/NewContent/Documents/favorate.svg';
>>>>>>> 7963d38f672dafd266e70ab9d8aecbdf3e9b402e
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import { getIconByExtensionType } from "../../../constant/helpers";
import { IconByExtensionType } from "../../../constant";
import { attachTypeApi } from "antd/lib/message";
import { DOCUMENT_ENUM } from "../../../constant";
import { Button, Modal } from "antd";
import moment from "moment";
import { handleParentId } from "../../../store/slice";
import { moveDocument } from "../../../store/actions";

<<<<<<< HEAD
const DocShortCard = ({ data }) => {
  const disptach = useDispatch();
=======


const DocShortCard = ({ data, handlePreview }) => {
    const { userLanguage } = useContext(LanguageChangeContext);
    const { documentDictionary } = documentDictionaryList[userLanguage];
    const disptach = useDispatch()
>>>>>>> 7963d38f672dafd266e70ab9d8aecbdf3e9b402e

  let { name, documentType, creator, createDate, id, path } = data;
  let { DUCOMENT_TYPE } = DOCUMENT_ENUM;

    const handleClick = (item) => {
        if (documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.folder) {
            disptach(handleParentId(item))
        }
        else {
            handlePreview(item);
        }
    }
    const handleDrop = (item) => {
        // console.log(item)
        disptach(moveDocument({
            parentId: item.dropData.name,
            documents: [
                item.dragData.name
            ]
        }))
    }

    // console.log("render")

    return (
        <>
            <DragDropContainer
                targetKey={"docsDrag"}
                dragData={{ name: data.id }}
                onDrop={handleDrop}
                key={data.id}
                noDragging={false}
                 
                >
                <DropTarget
                    onHit={(e) => { }}
                    targetKey="docsDrag"
                    highlighted
                    dropData={{ name: data.id }}
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
                <Avatar src={creator.image} size={20} round={true} />
              </div>
            </div>
          </div>
        </DropTarget>
      </DragDropContainer>
    </>
  );
};

export default DocShortCard;
