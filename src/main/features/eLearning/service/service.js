import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";

  // COURSES SERVICES //

export const addCourseService = async (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`api/ELearning/AddCourse`, formData)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getAllCourseService = (data) => {
  return MasterConfig.post(`api/ELearning/GetAllCourse`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};


export const GetCourseByIdService = (id) => {
  return MasterConfig.get(`api/ELearning/GetCourseById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getAllCourseAssignMemService = (id) => {
  return MasterConfig.get(`api/ELearning/GetAllCourseAssignMember?id=${id}`,)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllCourseMemberService = (id) => {
  return MasterConfig.get(`api/ELearning/GetAllCourseMember?id=${id}`,)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addCourseMemberService = async (data) => {
	let id = data.id
	let memberId = data.memberId
	return MasterConfig.post(`api/ELearning/AddCourseMember?id=${id}`, [{memberId: memberId}])
	  .then((res) => {
		return res;
	  })
	  .catch((res) => {
		return res;
	  });
  };


export const addCourseAssignMemberService = async (data) => {
	let id = data.id
	let memberId = data.memberId
	return MasterConfig.post(`api/ELearning/AddCourseAssignMember?id=${id}`, [{memberId: memberId}])
	  .then((res) => {
		return res;
	  })
	  .catch((res) => {
		return res;
	  });
  };


  // E-BOOK SERVICES //

export const addBookService = async (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`api/ELearning/AddBook`, formData)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getAllBookService = (data) => {
  return MasterConfig.post(`api/ELearning/GetAllBook`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const GetBookByIdService = (id) => {
  return MasterConfig.get(`api/ELearning/GetBookById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getAllBookMemberService = (id) => {
  return MasterConfig.get(`api/ELearning/GetAllBookMember?id=${id}`,)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addBookMemberService = async (data) => {
	let id = data.id
	let memberId = data.memberId
	return MasterConfig.post(`api/ELearning/AddBookMember?id=${id}`, [{memberId: memberId}])
	  .then((res) => {
		return res;
	  })
	  .catch((res) => {
		return res;
	  });
  };

  export const getAllBookAssignMemService = (id) => {
    return MasterConfig.get(`api/ELearning/GetAllBookAssignMember?id=${id}`,)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  export const addBookAssignMemberService = async (data) => {
    let id = data.id
    let memberId = data.memberId
    return MasterConfig.post(`api/ELearning/AddBookAssignMember?id=${id}`, [{memberId: memberId}])
      .then((res) => {
      return res;
      })
      .catch((res) => {
      return res;
      });
    };