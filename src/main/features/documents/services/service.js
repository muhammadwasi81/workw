import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";
import { responseCode as responseCodeEnum } from "../../../../services/enums/responseCode";
import { STRINGS } from "../../../../utils/base";
import {
  addDirectory_dto,
  getAllDocumentList_dto,
  getAllDocument_dto,
} from "./dto";

const moveDocument_DBO = (data) => {
  return {
    directoryId: data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
    documents: data.documents ? data.documents : [],
  };
};
const moveDirectory_DBO = (data) => {
  return {
    parentId: data.parentId ? data.parentId : STRINGS.DEFAULTS.guid,
    directories: data.documents ? data.documents : [],
  };
};

export const addDocumentService = async (request) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Document/AddDocument`, request);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const moveDocumentService = async (payload) => {
  console.log(payload);
  let request = moveDocument_DBO(payload);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Document/MoveDocument`, request);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const moveDirectoryService = async (payload) => {
  console.log(payload);
  let request = moveDirectory_DBO(payload);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Document/MoveDirectory`, request);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllDocumentListService = async (data) => {
  let request = getAllDocumentList_dto(data);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Document/GetAllDocumentList`, request);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllDocumentService = async (data) => {
  let request = getAllDocument_dto(data);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Document/GetAllDocument`, request);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getDocumentByIdService = async (documentId) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Document/GetDocumentById?id=${documentId}`);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

// NEW
// --=--=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

export const addDirectoryService = async (payload) => {
  let request = addDirectory_dto(payload);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Document/AddDocumentDirectory`, request);
    if (responseCode === responseCodeEnum.Success)
      return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllDocumentDirectoryMemberService = (data) => {
  let id = data.id;
  return Config.get(
    `api/Document/GetAllDocumentDirectoryMember?id=${id}&pageNo=1`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addDocumentDirectoryMemberService = async (data) => {
  let id = data.id;
  let memberId = data.memberId;
  return Config.post(`api/Document/AddDocumentDirectoryMember?id=${id}`, [
    { memberId: memberId },
  ])
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const addDocumentFavoriteService = async (payload) => {
  return Config.get(
    `api/Document/AddDocumentFavourite?documentId=${payload.id}&isPinned=${payload.isPinned}`
  )
    .then((res) => {
      console.log(res.data, "service data");
      return res;
    })
    .catch((res) => {
      return res;
    });
};

//   export const getAllCourseMemberService = (id) => {
// 	return Config.get(`api/ELearning/GetAllCourseMember?id=${id}`)
// 	  .then((res) => {
// 		return res.data;
// 	  })
// 	  .catch((err) => {
// 		return err;
// 	  });
//   };

//   export const addCourseMemberService = async (data) => {
// 	let id = data.id;
// 	let memberId = data.memberId;
// 	return Config.post(`api/ELearning/AddCourseMember?id=${id}`, [
// 	  { memberId: memberId },
// 	])
// 	  .then((res) => {
// 		return res;
// 	  })
// 	  .catch((res) => {
// 		return res;
// 	  });
//   };
