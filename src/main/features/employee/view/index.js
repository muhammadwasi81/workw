import { Form, message, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDefaultDesignation,
  getAllEmployeeTypes,
  getAllGenders,
  getAllMaritalStatus,
  getAllUserTitles,
  getAllUserTypes,
  getCountries,
  uploadImage,
} from "../../../../utils/Shared/store/actions";
import { getAllGrades } from "../../grade/store/actions";
import { getAllOfficeTimingGroups } from "../../officeTimings/store/actions";
import EmployeeFormContainer from "./formContainer";
import moment from "moment";
import EducationForm from "./educationForm";
import { addEmployee } from "../store/actions";
import { getAllAccessRoles } from "../../accessRole/store/action";
import {
  resetError,
  resetSuccess,
} from "../../../../services/slices/notificationSlice";
import { ROUTES } from "../../../../utils/routes";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { info } from "autoprefixer";
function Employee() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const label = dictionaryList[userLanguage];

  const initialState = {
    imageId: "00000000-0000-0000-0000-000000000000",
    userTypeId: 0,
    titleId: 1,
    firstName: "",
    lastName: "",
    fatherName: "",
    email: "",
    personalEmail: "",
    nic: "",
    residentialAddress: "",
    permanentAddress: "",
    phoneNo: "",
    designationId: "",
    managerId: "00000000-0000-0000-0000-000000000000",
    gradeId: "",
    departmentId: "",
    countryId: "",
    cityId: "",
    probationPeriod: 0,
    noticePeriod: 0,
    birthDate: "",
    joinDate: "",
    genderId: 0,
    maritalStatusId: 0,
    officeTimingId: "",
    accessRoleId: "",
    employeeNo: "",
    employmentTypeId: "",
  };
  const [form] = Form.useForm();

  const [employeeForm, setEmployeeForm] = useState(initialState);
  const [formData, setFormData] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();

  const {
    isUploaded,
    imageIds,
    loader: sharedLoader,
  } = useSelector((state) => state.sharedSlice);
  const { loadingData: gradeLoader } = useSelector((state) => state.gradeSlice);
  const { loader: accessRoleLoader } = useSelector(
    (state) => state.accessRolesSlice
  );
  const {
    message: notificationMessage,
    success,
    error,
  } = useSelector((state) => state.notificationSlice);
  const { loader: employeeLoader, success: employeeSuccess } = useSelector(
    (state) => state.employeeSlice
  );
  // console.log("notification", notificationMessage, success);

  useEffect(() => {
    if (notificationMessage === "success" && success) {
      message.success("Employee added successfully.");
      form.resetFields();
    }
    if (notificationMessage && error) {
      message.error(notificationMessage);
    }
    // if (employeeLoader && !employeeSuccess) {
    // 	console.log("loader");
    // 	message.loading("Adding employee... Please Wait.");
    // }
    dispatch(resetSuccess());
    dispatch(resetError());
  }, [notificationMessage, success, error, employeeLoader, employeeSuccess]);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getAllDefaultDesignation());
    dispatch(getAllGrades());
    dispatch(getAllGenders());
    dispatch(getAllUserTitles());
    dispatch(getAllUserTypes());
    dispatch(getAllMaritalStatus());
    dispatch(getAllOfficeTimingGroups());
    dispatch(getAllEmployeeTypes());
    dispatch(getAllAccessRoles());
  }, []);

  // useEffect(() => {
  //   if(accessRoleLoader)
  // }, [accessRoleLoader, gradeLoader, sharedLoader])

  useEffect(() => {
    if (isUploaded && profileImage) {
      // message.success("Image uploaded successfully.");
      formDataSubmit(formData, imageIds[0]);
    }
  }, [isUploaded]);

  useEffect(() => {
    if (isFormSubmitted) {
      console.log("employees data after submit", employeeForm);
      dispatch(addEmployee(employeeForm));
      setIsFormSubmitted(false);
    }
  }, [employeeForm]);

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  const changeDateFromat = (value) => {
    // console.log("value", value);
    let data = [];
    if (value && value.length !== 0) {
      value.forEach((element) => {
        let date = {
          startDate: "",
          endDate: "",
          isPresent: false,
        };

        if (element["start/end"]) {
          date.startDate = moment(element["start/end"][0]._d).format();
          date.endDate = moment(element["start/end"][1]._d).format();
        } else {
          // console.log('element["start"]', element["start"]);
          date.startDate = moment(element["start"]._d).format();
          date.isPresent = true;
        }
        data.push(date);
      });
    }
    return data;
  };

  const mergeArrayObjects = (date, state) => {
    const mergeData = date.map((item, index) => {
      const data = state[index];
      return {
        ...item,
        ...data,
      };
    });
    return mergeData;
  };

  const deleteKey = (arr) => {
    arr = arr.map((object) => {
      let item = { ...object };
      delete item["start/end"];
      return item;
    });
    return arr;
  };

  const formDataSubmit = (value, imageId) => {
    let filteredEducation = [...value.educations];
    let filteredExperience = [...value.experiences];
    let filteredEmergencey = [...value.emergencyContacts];
    if (value.educations) {
      let educationDate = changeDateFromat(
        value.educations && value.educations
      );
      let educationState = [...value.educations];
      educationState = deleteKey(educationState);
      filteredEducation = mergeArrayObjects(educationDate, educationState);
    }
    if (value.experiences) {
      // console.log("value experience");
      let experienceDate = changeDateFromat(
        value.experiences && value.experiences
      );

      let experienceState = [...value.experiences];
      experienceState = deleteKey(experienceState);
      filteredExperience = mergeArrayObjects(experienceDate, experienceState);

      // console.log("filteredExperience", filteredExperience);
    }
    // filteredEmergencey[0].address = value.address ? value.address : "";
    // filteredEmergencey[0].name = value.name ? value.name : "";
    // filteredEmergencey[0].relation = value.relation ? value.relation : "";
    // filteredEmergencey[0].contactNo = value.contactNo ? value.contactNo : "";
    setIsFormSubmitted(true);
    const valueClone = (({ address, name, relation, contactNo, ...o }) => o)(
      value
    );
    setEmployeeForm({
      ...employeeForm,
      ...valueClone,
      imageId: "00000000-0000-0000-0000-000000000000",
      educations: filteredEducation,
      experiences: filteredExperience,
      emergencyContacts: filteredEmergencey,
      managerId: "00000000-0000-0000-0000-000000000000",
      birthDate: moment(employeeForm.birthDate._d).format(),
      joinDate: moment(employeeForm.joinDate._d).format(),
    });
  };

  const handleSubmit = (value) => {
    if (profileImage) {
      setFormData(value);
      dispatch(uploadImage(profileImage));
    } else {
      formDataSubmit(value, "");
    }
  };

  return (
    <Skeleton loading={sharedLoader || gradeLoader || accessRoleLoader} active>
      <EmployeeFormContainer
        form={form}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
      />
    </Skeleton>
  );
}

export default Employee;
