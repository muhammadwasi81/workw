import { DOCUMENT_ENUM } from ".";
import folderIcon from "../../../../content/NewContent/Documents/file/folder.svg"
import pdfIcon from "../../../../content/NewContent/Documents/file/PDF_DOC.svg"
import gridIcon from "../../../../content/NewContent/Documents/file/milegrid.svg"
import drawIcon from "../../../../content/NewContent/Documents/file/mileboard.svg"
import padIcon from "../../../../content/NewContent/Documents/file/milepad.svg"
import showIcon from "../../../../content/NewContent/Documents/file/mileshow.svg"
import dummyImage from "../../../../content/NewContent/Documents/mediaDummy.svg"
import defaultImage from "../../../../content/video_default.svg"

export const getIconByExtensionType = ((AttachmentType, extensionType = null) => {
    let { DUCOMENT_TYPE } = DOCUMENT_ENUM;

    switch (AttachmentType) {
        case DUCOMENT_TYPE.folder:
            return folderIcon
            break;
        case DUCOMENT_TYPE.image:
            return folderIcon
            break;
        case DUCOMENT_TYPE.grid:
            return gridIcon
            break;
        case DUCOMENT_TYPE.draw:
            return drawIcon
            break;
        case DUCOMENT_TYPE.pad:
            return padIcon
            break;
        case DUCOMENT_TYPE.show:
            return showIcon
            break;
            
        case "attachment":
            switch (extensionType) {
                case 1: {
                    return
                }
                case 2: {
                    return defaultImage
                }
                default:
                    break;
            }
        default:
            return defaultImage
            break;
    }
})