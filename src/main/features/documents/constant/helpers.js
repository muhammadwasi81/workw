import { DocsComposerEnums, DOCUMENT_ENUM } from ".";
import folderIcon from "../../../../content/NewContent/Documents/file/folder.svg"
import pdfIcon from "../../../../content/NewContent/Documents/file/PDF_DOC.svg"
import gridIcon from "../../../../content/NewContent/Documents/file/milegrid.svg"
import drawIcon from "../../../../content/NewContent/Documents/file/mileboard.svg"
import padIcon from "../../../../content/NewContent/Documents/file/milepad.svg"
import showIcon from "../../../../content/NewContent/Documents/file/mileshow.svg"
import wordIcon from "../../../../content/NewContent/Documents/file/word.svg"
import excelIcon from "../../../../content/NewContent/Documents/file/excel.svg"
import playIcon from "../../../../content/NewContent/Documents/file/play.svg"
import powerpointIcon from "../../../../content/NewContent/Documents/file/powerpoint.svg"

import dummyImage from "../../../../content/NewContent/Documents/mediaDummy.svg"
import defaultImage from "../../../../content/business_default.png"

export const getIconByExtensionType = ((AttachmentType, extensionType = null) => {
    let { DUCOMENT_TYPE, EXTENSION_TYPE } = DOCUMENT_ENUM;

    switch (AttachmentType) {
        case DUCOMENT_TYPE.folder:
            return folderIcon
            break;
        case DUCOMENT_TYPE.video:
            return playIcon
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

        case DUCOMENT_TYPE.attachment:
            switch (extensionType) {
                case EXTENSION_TYPE.Pdf: {
                    return pdfIcon
                }
                case EXTENSION_TYPE.Doc: {
                    return wordIcon
                }
                case EXTENSION_TYPE.Docx: {
                    return wordIcon
                }
                case EXTENSION_TYPE.Xls: {
                    return excelIcon
                }
                case EXTENSION_TYPE.Xlsx: {
                    return excelIcon
                }
                case EXTENSION_TYPE.Ppt: {
                    return powerpointIcon
                }
                case EXTENSION_TYPE.Pptx: {
                    return powerpointIcon
                }

                default:
                    return defaultImage
            }
        default:
            return defaultImage
            break;
    }
})

export const getComposerKeyByType = (documentType) => {
    switch (documentType) {
        case DOCUMENT_ENUM.DUCOMENT_TYPE.attachment:
            return DocsComposerEnums.upload
        case DOCUMENT_ENUM.DUCOMENT_TYPE.attachment:
            return DocsComposerEnums.upload
        case DOCUMENT_ENUM.DUCOMENT_TYPE.attachment:
            return DocsComposerEnums.upload
        case DOCUMENT_ENUM.DUCOMENT_TYPE.attachment:
            return DocsComposerEnums.upload
        case DOCUMENT_ENUM.DUCOMENT_TYPE.attachment:
            return DocsComposerEnums.upload
        default:
            break;
    }
}