import milepadIcon from "../../../../content/NewContent/Documents/file/milepad.svg";

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
  mileshow: "mileshow",
  updateMember: "updateMembers",
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
  MEMBER_RIGHT_TYPE: {
    READER: 1,
    COLLABRATOR: 2
  },
  EXTENSION_TYPE: {
    Other: 0,
    Jpg: 1,
    Jpeg: 2,
    Bmp: 3,
    Png: 4,
    Gif: 5,
    Mp4: 6,
    Avi: 7,
    Pdf: 8,
    Docx: 9,
    Doc: 10,
    Xls: 11,
    Xlsx: 12,
    Pptx: 13,
    Ppt: 14,
    Mp3: 15,
    Wav: 16,
    Apk: 17,
    MilePad: 18,
    MileGrid: 19,
    MileBoard: 20
  },

  MODULE_NO: 5
}

export const DocumentStatusEnum = {
  InProcess: 1,
  Approved: 2,
  Declined: 3,
  NotRequired: 4,
}
export const getDocStatusLabelAndColor = (module, statusLabels) => {
	return {
		[DocumentStatusEnum.InProcess]: {
			label: statusLabels.InProcess,
			color: "#1a5669",
		},
		[DocumentStatusEnum.Approved]: {
			label: statusLabels.Approved,
			color: "#1ECB40",
		},
		[DocumentStatusEnum.Declined]: {
			label: statusLabels.Declined,
			color: "#FF0000",
		},
		[DocumentStatusEnum.NotRequired]: {
			label: statusLabels.NotRequired,
			color: "#1ECB40",
		}
	};
};


