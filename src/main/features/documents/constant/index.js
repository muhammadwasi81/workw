import milepadIcon from "../../../../content/NewContent/Documents/file/milepad.svg";
import {
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
export const fileTypes = [
  {
    title: "Milepad",
    description: "32 Files",
    icon: milepadIcon
  },
  {
    title: "Mileshow",
    description: "32 Files",
    icon: milepadIcon
  },
  {
    title: "Milegrid",
    description: "32 Files",
    icon: milepadIcon
  },
  {
    title: "Mileboard",
    description: "32 Files",
    icon: milepadIcon
  },
  {
    title: "Documents",
    description: "32 Files",
    icon: milepadIcon
  }
]

export const DocsComposerEnums = {
  folder: "folder",
  upload: "upload",
  milegrid: "milegrid",
  milepad: "milepad",
  mileboard: "mileboard",
  mileshow: "mileshow"
}

export const AttachmentType = {
  other: 0,
  image: 1,
  video: 2,
  document: 3,
  audio: 4,
  apk: 5,
  mile: 6
}


export const DOCUMENT_ENUM = {
  DUCOMENT_TYPE: {
    folder: 1,
    image: 2,
    video: 3,
    attachment: 4,
    grid: 5,
    pad: 6,
    show: 7,
    draw: 8
  },
  MEMBER_RIGHT_TYPE:{
    READER:1,
    COLLABRATOR:2
  }
}


