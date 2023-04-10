import React from "react";
import $ from "jquery";
import * as moment from "moment";
import brokenPaper from "../content/svg/brokenpaper.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "./routes";
import { replaceURL } from "../main/features/feed/utils/ValidateCreatePost";
import Userprofile from "./userProfile";
// import { Link } from "react-router-dom";
// require("jquery.caret");

let DOMAIN_PREFIX = "";
// for live this line will be comment
// DOMAIN_PREFIX = process.env.NODE_ENV !== "development" ? "/konnect" : "";

export const STRINGS = {
  COPY_RIGHTS: `\u00A9 Miletap Ltd - Copyrights \u00402017-${new Date().getFullYear()}`,
  STRIPE_KEY:
    "pk_test_51Hs6ovE6WX7VMR4a2q3dV2dNIhjNSl1YIXa4PMDlAAUMmeYimKZoZ1B0et3b2n5VaGjaoFlDoNTIMDdxW0cMv7Jr00YyDry9GE",
  DEFAULT_EMAIL: {
    TO: "support@konnect.im",
    FROM: "amir@gmail.com",
  },
  EDITOR_URL: "https://milepad.gqhub.com/p/",
  VIDEO: ["mp4"],
  IMAGE: ["jpg", "jpeg", "png", "gif"],
  SIGN_UP_DEFAULT_TOKEN:
    "hxD0MXIIS0F1tFGfO2uB56Ux6gZn6Tkvm7IOLTwWqNmyHFaDvo7Rjla0JcAU86oS",
  STORAGE: {
    connectionId: "",
    _connectionId: "connectionId",
    token: "token",
    user: "user",
    call: "call",
    call_id: "call_id",
    user_id: "user_id",
    first_name: "first_name",
    middle_name: "middle_name",
    last_name: "last_name",
    department_id: "department_id",
    departmentName: "departmentName",
    hod_id: "hod_id",
    hodName: "hodName",
    hodImage: "hodImage",
    hodDesignation: "hodDesignation",
    designation_id: "designation_id",
    designation: "designation",
    profile_picture: "profile_picture",
    manager_id: "manager_id",
    managerDesignation: "managerDesignation",
    managerImage: "managerImage",
    managerName: "managerName",
    email: "email",
    mobileNo: "mobileNo",
    user_type: "userTypeId",
    business_id: "business_id",
    branch_id: "branch_id",
    user_name: "user_name",
    birthdate: "birthdate",
    businessName: "businessName",
    branchName: "branchName",
    businessLogo: "businessLogo",
    fullname: "fullname",
    userRights: "userRights",
    rights: "rights",
  },
  ROUTES: {
    ROOT: `${DOMAIN_PREFIX}/`,
    NEWSFEED: {
      DETAILS: `${DOMAIN_PREFIX}/newsFeedDetails`,
    },
    CONTACT_MANAGER: {
      DEFAULT: `${DOMAIN_PREFIX}/leadManager`,
      LEAD_GROUP: `${DOMAIN_PREFIX}/leadManager/leadManagerGroup`,
      LEAD_DETAIL: `${DOMAIN_PREFIX}/leadManager/leadManagerGroupDetails`,
    },
    SCHEDULES: `${DOMAIN_PREFIX}/schedules`,
    FILTER_SCHEDULE_ITEM: `${DOMAIN_PREFIX}/search_schedule`,
    SCHEDULE_SUMMARY_TRAVEL: {
      DEFAULT: `${DOMAIN_PREFIX}/schedules/travel`,
      CITIES: `${DOMAIN_PREFIX}/schedules/travel/cities`,
      APPROVALS: `${DOMAIN_PREFIX}/schedules/travel/approvals`,
      EXPENSES: `${DOMAIN_PREFIX}/schedules/travel/expenses`,
      AGENT: `${DOMAIN_PREFIX}/schedules/travel/agent`,
    },
    NEW_SCHEDULES: {
      DEFAULT: `${DOMAIN_PREFIX}/newschedules`,
    },

    TASK: {
      DEFAULT: `${DOMAIN_PREFIX}/tasks/*`,
      ROOT: `${DOMAIN_PREFIX}/tasks`,
      DETAIL: `taskDetail/:id`,
    },
    LEAVES: `${DOMAIN_PREFIX}/leaves/`,
    DEPARTMENT: `${DOMAIN_PREFIX}/departments`,
    EXPENSE: {
      DEFAULT: `${DOMAIN_PREFIX}/expenses`,
      // EXPENSE_DETAILS: `${DOMAIN_PREFIX}/expensedetail`,
    },
    CUSTOM_APPROVALS: `${DOMAIN_PREFIX}/customApprovals`,
    LOAN: `${DOMAIN_PREFIX}/loan`,
    PAYROLL: {
      DEFAULT: `${DOMAIN_PREFIX}/payroll`,
      PAYROLL_DETAILS: `${DOMAIN_PREFIX}/payroll/details`,
    },
    TRAVELS: `${DOMAIN_PREFIX}/travel`,
    TRAVEL: {
      DEFAULT: `${DOMAIN_PREFIX}/travel`,
      CITIES: `${DOMAIN_PREFIX}/travel/cities`,
      APPROVALS: `${DOMAIN_PREFIX}/travel/approvals`,
      EXPENSES: `${DOMAIN_PREFIX}/travel/expenses`,
      AGENT: `${DOMAIN_PREFIX}/travel/agent`,
    },
    APPROVALS: {
      DEFAULT: `${DOMAIN_PREFIX}/approvals/`,
    },
    E_LEARNING: {
      DEFAULT: `${DOMAIN_PREFIX}/eLearningCourses/`,
      DASHBOARD: `${DOMAIN_PREFIX}/eLearningCourses/dashboard`,
      COURSE_LESSON: `${DOMAIN_PREFIX}/eLearningCourses/CoursesLesson`,
      TOPICS: `${DOMAIN_PREFIX}/eLearningCourses/category`,
      EPISODE_DETAILS: `${DOMAIN_PREFIX}/eLearningCourses/episodeDetails`,
      COURSE_INTRO: `${DOMAIN_PREFIX}/eLearningCourses/courseIntro`,
      BOOKS: `${DOMAIN_PREFIX}/eLearningCourses/books`,
      BOOK_DESCRIPTION: `${DOMAIN_PREFIX}/eLearningCourses/bookDesc`,
      EPISODE: `${DOMAIN_PREFIX}/eLearningCourses/episode`,
      BLOG: `${DOMAIN_PREFIX}/eLearningCourses/blog`,
      BLOG_SINGLE: `${DOMAIN_PREFIX}/eLearningCourses/blogSingle`,
      BLOGS: `${DOMAIN_PREFIX}/eLearningCourses/blogs`,
      BLOG_ARTICLE: `${DOMAIN_PREFIX}/eLearningCourses/blogArticle`,
      QUIZ: `${DOMAIN_PREFIX}/eLearningCourses/quiz`,
      QUIZ_PLAY: `${DOMAIN_PREFIX}/eLearningCourses/quiz_play`,
      QUIZ_DETAIL: `${DOMAIN_PREFIX}/eLearningCourses/quiz_detail`,
      QUIZ_GAME: `${DOMAIN_PREFIX}/eLearningCourses/game`,
      HIGH_SCORE: `${DOMAIN_PREFIX}/eLearningCourses/highScore`,
    },
    USER: {
      DEFAULT: `${DOMAIN_PREFIX}/user/`,
      TIMELINE: {
        DEFAULT: `${DOMAIN_PREFIX}/user/timeline/post`,
        INFORMATION: `${DOMAIN_PREFIX}/user/timeline/information`,
      },
      SETTINGS: `${DOMAIN_PREFIX}/settings`,
      NOTES: `${DOMAIN_PREFIX}/user/notes`,
    },
    CALL: {
      DEFAULT: `${DOMAIN_PREFIX}/call`,
      AUDIO: `${DOMAIN_PREFIX}/call/audiocall`,
      VIDEO: `${DOMAIN_PREFIX}/call/audiocall`,
      JOIN: `${DOMAIN_PREFIX}/call/joincall`,
      // CALL: `${DOMAIN_PREFIX}/videocall/incall/?peer_id=100000554862579`,
    },
    HR: {
      CHART: `${DOMAIN_PREFIX}/hr/chart`,
      WARNINGS: {
        DEFAULT: `${DOMAIN_PREFIX}/warnings`,
        APPROVALS: `${DOMAIN_PREFIX}/warnings/approvals`,
      },
      REWARDS: {
        DEFAULT: `${DOMAIN_PREFIX}/rewards`,
        APPROVALS: `${DOMAIN_PREFIX}/rewards/approvals`,
      },
      REQUISITION: {
        DEFAULT: `${DOMAIN_PREFIX}/requisition`,
        APPROVALS: `${DOMAIN_PREFIX}/requisition/approvals`,
      },
      RESIGNATIONS: {
        DEFAULT: `${DOMAIN_PREFIX}/resignations/*`,
      },
      COMPLAINS: {
        DEFAULT: `${DOMAIN_PREFIX}/complains`,
        APPROVALS: `${DOMAIN_PREFIX}/complains/approvals`,
      },
      BONUS: {
        DEFAULT: `${DOMAIN_PREFIX}/bonus`,
      },
      DEPARTMENT: {
        DEFAULT: `${DOMAIN_PREFIX}/departments`,
        APPROVALS: `${DOMAIN_PREFIX}/departments/approvals`,
      },
      LEAVES: `${DOMAIN_PREFIX}/hr/leaves`,
      SALARY: `${DOMAIN_PREFIX}/hr/salary/`,
      ALLOWANCE: `${DOMAIN_PREFIX}/hr/allowance/`,
      TAXRECEIPTS: `${DOMAIN_PREFIX}/hr/taxreceipts/`,
      CAREER: {
        DEFAULT: `${DOMAIN_PREFIX}/hr/careers`,
        JOB_BY_ID: `${DOMAIN_PREFIX}/hr/careers/job`,
      },
      EMPLOYEES: {
        DEFAULT: `${DOMAIN_PREFIX}/hr/employees/`,
        BASIC_INFO: `${DOMAIN_PREFIX}/hr/employees/info`,
        JOB_BY_ID: `${DOMAIN_PREFIX}/hr/employees/job`,
        EMAIL_CONFIG: `${DOMAIN_PREFIX}/hr/employees/emailconfig`,
        EDUCATION: `${DOMAIN_PREFIX}/hr/employees/education`,
        EXPERIENCE: `${DOMAIN_PREFIX}/hr/employees/experience`,
        PACKAGE: `${DOMAIN_PREFIX}/hr/employees/package`,
        LINKAGE: `${DOMAIN_PREFIX}/hr/employees/linkage`,
        USER_RIGHTS: `${DOMAIN_PREFIX}/hr/employees/rights`,
        ACTIVITY_LOGS: `${DOMAIN_PREFIX}/hr/employees/activityLogs`,
        SALARY: `${DOMAIN_PREFIX}/hr/employees/salary`,
        APPRAISAL: `${DOMAIN_PREFIX}/hr/employees/appraisal`,
        OFFICE_TIMINGS: `${DOMAIN_PREFIX}/hr/employees/officeTimings`,
        OFFICETIME: `${DOMAIN_PREFIX}/hr/employees/officetime`,
        EMPLOYEE_TIME: `${DOMAIN_PREFIX}/hr/employees/employee_time`,
        EMAIL_SEND: `${DOMAIN_PREFIX}/hr/employees/EmailSend`,
        ALLOWANCES: `${DOMAIN_PREFIX}/hr/employees/allowances`,
        BANK_DETAILS: `${DOMAIN_PREFIX}/hr/employees/bankDetails`,
      },
      ADMINISTRATOR: {
        DEFAULT: `${DOMAIN_PREFIX}/administrator`,
        GRADE: `${DOMAIN_PREFIX}/administrator/grade`,
        DESIGNATION: `${DOMAIN_PREFIX}/administrator/designation`,
        ACCESSROLES: `${DOMAIN_PREFIX}/administrator/accessroles`,
        APPRASIAL: `${DOMAIN_PREFIX}/administrator/appraisal`,
        TIMEZONE: `${DOMAIN_PREFIX}/administrator/timezone`,
        OFFICETIMING: `${DOMAIN_PREFIX}/administrator/officetimings`,
        OFFICE_TIMING_GROUP_DETAIL: `${DOMAIN_PREFIX}/administrator/officetimings/groupdetail`,
        OFFICETIME: `${DOMAIN_PREFIX}/administrator/officetimings`,
        CURRENCY: `${DOMAIN_PREFIX}/administrator/currency`,
        EMPLOYEE_TIME: `${DOMAIN_PREFIX}/administrator/officetimings/employee_time`,
        JOB_SKILLS: `${DOMAIN_PREFIX}/administrator/job_skills`,
        LEAVE_TYPES: `${DOMAIN_PREFIX}/administrator/leaveType`,
        USER_TYPES: `${DOMAIN_PREFIX}/administrator/userTypes`,
        EXPENSE_HEADERS: `${DOMAIN_PREFIX}/administrator/expenseHeaders`,
        SALARY_HEADERS: `${DOMAIN_PREFIX}/administrator/salaryHeaders`,
        EMAIL_CONFIG: `${DOMAIN_PREFIX}/administrator/emailConfig`,
        REQUEST_FOR_RIGHTS: `${DOMAIN_PREFIX}/administrator/rights`,
        CUSTOM_APPROVAL_CATEGORY: `${DOMAIN_PREFIX}/administrator/customApprovalCategory`,
        DEFAULT_APPROVALS: `${DOMAIN_PREFIX}/administrator/defaultApprovals`,
        ALLOWANCES: `${DOMAIN_PREFIX}/administrator/allowances`,
        REWARD_CATEGORY: `${DOMAIN_PREFIX}/administrator/rewardCategory`,
        WARNING_CATEGORY: `${DOMAIN_PREFIX}/administrator/warningCategory`,
      },
      COMPANIES: {
        DEFAULT: `${DOMAIN_PREFIX}/hr/companies`,
        RIGHTS_REQUEST: `${DOMAIN_PREFIX}/hr/companies/request_rights`,
        DASHBOARD: `${DOMAIN_PREFIX}/hr/companies/dashboard`,
        ADD: `${DOMAIN_PREFIX}/hr/companies/add`,
        UPDATE: `${DOMAIN_PREFIX}/hr/companies/update`,
        DETAILS: `${DOMAIN_PREFIX}/hr/companies/details`,
        BUSINESS_RIGHTS: `${DOMAIN_PREFIX}/hr/companies/rights`,
        EMAIL_CONFIG: `${DOMAIN_PREFIX}/hr/companies/emailConfig`,
        EMAIL_SEND: `${DOMAIN_PREFIX}/hr/companies/emailSend`,
        INDIVIDUAL_DASHBOARD: `${DOMAIN_PREFIX}/hr/companies/individualDashboard`,
      },
      EMPLOYEES_ADD: `${DOMAIN_PREFIX}/hr/employees/add`,
      DEPARTMENTS: `${DOMAIN_PREFIX}/hr/departments`,
      SUBDEPARTMENT: `${DOMAIN_PREFIX}/hr/departments/list`,
      DETAILDEPARTMENTS: `${DOMAIN_PREFIX}/hr/departments/details`,
      DEFAULTDEPARTMENT: `${DOMAIN_PREFIX}/hr/department/view`,
      OFFICE_TIMINGS: `${DOMAIN_PREFIX}/hr/officetimings/`,
      OFFICE_TIMINGS_DEFAULT: `${DOMAIN_PREFIX}/hr/officetimings/timings`,
      OFFICE_TIMINGS_EMPLOYEES: `${DOMAIN_PREFIX}/hr/officetimings/employees`,
      HOLIDAYS: `${DOMAIN_PREFIX}/hr/holidays/`,
      LEVELS: `${DOMAIN_PREFIX}/hr/addlevels`,
      APPROVALS_FLOW: {
        DEFAULT: `${DOMAIN_PREFIX}/hr/approvalflow`,
      },
      APPRAISALS: {
        DEFAULT: `${DOMAIN_PREFIX}/appraisals`,
      },
    },
    MAIL: {
      DEFAULT: `${DOMAIN_PREFIX}/mail`,
      INBOX: `${DOMAIN_PREFIX}/mail/inbox`,
      STARRED: `${DOMAIN_PREFIX}/mail/starred`,
      SNOOZED: `${DOMAIN_PREFIX}/mail/snoozed`,
      ALL_MAIL: `${DOMAIN_PREFIX}/mail/all_mail`,
      SPAM: `${DOMAIN_PREFIX}/mail/id=INBOX.spam`,
      NOTES: `${DOMAIN_PREFIX}/mail/id=INBOX.Notes`,
      ARCHIVE: `${DOMAIN_PREFIX}/mail/id=INBOX.Archive`,
      SENT: `${DOMAIN_PREFIX}/mail/sent`,
      TRASH: `${DOMAIN_PREFIX}/mail/trash`,
      JUNK: `${DOMAIN_PREFIX}/mail/id=INBOX.Junk`,
      DRAFTS: `${DOMAIN_PREFIX}/mail/drafts`,
      CREATE_NEW_LABEL: `${DOMAIN_PREFIX}/mail/create_new_label`,
    },
    EMAIL: {
      DEFAULT: `${DOMAIN_PREFIX}/mail`,
      SPAM: `${DOMAIN_PREFIX}/mail?id=INBOX.spam`,
      ARCHIVE: `${DOMAIN_PREFIX}/mail?id=INBOX.Archive`,
      SENT: `${DOMAIN_PREFIX}/mail?id=INBOX.Sent`,
      TRASH: `${DOMAIN_PREFIX}/mail?id=INBOX.Trash`,
      JUNK: `${DOMAIN_PREFIX}/mail?id=INBOX.junk`,
      DRAFTS: `${DOMAIN_PREFIX}/mail?id=INBOX.Drafts`,
    },
    LEAD_MANAGER: {
      DEFAULT: `${DOMAIN_PREFIX}/leadmanager`,
    },

    TASK: {
      DEFAULT: `${DOMAIN_PREFIX}/tasks/*`,
      ROOT: `${DOMAIN_PREFIX}/tasks`,
      DETAIL: `taskDetail/:id`,
    },
  },
  SOCKET_ACTIONS: {
    REGISTER_USER: "registerUser",
    MESSAGES_LISTENER: "messageListner",
    LOGOUT_LISTENER: "logoutFromDevice",
    MESSAGES_STATE_LISTENER: "messageStateListner",
    USER_STATUS_LISTENER: "UserStatus",
    MESSAGE_STATE_LISTENER: "messageStateListner",
    CONVERSATIONS_LISTENER: "conversationListener",
    CHAT_IN: "chatIn",
    CHAT_OUT: "chatOut",
    NOTIFY_LISTENER: "notify",
    TYPING_LISTENER: "typingStatus",
    MESSAGES_STATUS: "messageStatus",
    COMMUNICATION_OUT: "communicationOut",
    COMMUNICATION_IN: "communicationIn",
    TESTING: "testing",
    NOTIFICATION_IN: "notificationIn",
    ACTIVITY_COUNT: "activityCount",
  },
  DOCUMENT: {
    pdf: ["pdf"],
    word: ["doc", "docx"],
    excel: ["xls", "xlsx"],
    powerPoint: ["ppt", "pptx"],
  },
  TYPES: {
    DEFAULT_APPROVALS: {
      EXPENSE: 1,
      TRAVEL: 2,
      LOAN: 3,
      LEAVE: 4,
      ASSET_ALLOCATION: 5,
      SALARY: 6,
      PAY_ROLL: 7,
    },
    USERS: {
      SUPER_ADMIN: 1,
      ADMIN: 0,
    },
    MESSAGES: {
      WAITING_FOR_APPROVAL: "Waiting for manager approval.",
    },
    E_LEARNING: {
      LEVEL_TYPE: {
        BEGINNER: 1,
        INTERMEDIATE: 2,
        ADVANCED: 3,
      },
      TOPICS_TYPE: {
        IMAGE: 1,
        VIDEO: 2,
        DOCUMENT: 3,
        LINK: 4,
        YOUTUBE: 5,
        TEXT: 6,
        QUIZ: 7,
      },
    },
    ATTACHMENTS: {
      IMAGE: 1,
      VIDEO: 2,
      PDF: 3,
      WORD: 4,
      EXCEL: 5,
      PPT: 6,
      INVALID: 0,
    },
    ATTACHMENTS_EX: {
      IMAGE: [
        "png",
        "jpeg",
        "raw",
        "cr2",
        "nef",
        "orf",
        "sr2",
        "tif",
        "tiff",
        "bmp",
        "jpeg",
        "jpg",
        "gif",
        "eps",
        "svg",
      ],
      VIDEO: ["mp4"],
      PDF: ["pdf"],
      WORD: ["docx", "doc"],
      EXCEL: ["xlsx"],
      PPT: ["ppt"],
      INVALID: 0,
    },
    POSTS: {
      DEFAULT: 1, // Text, Image, Video, Document
      POLL: 4,
    },
    CHAT: {
      ONE_TO_ONE: 1,
      GROUP: 2,
    },
    SIZE: {
      // MB
      // IMAGE: 10,
      // VIDEO: 20,
      // DOCUMENT: 100,
      IMAGE: 20,
      VIDEO: 20,
      DOCUMENT: 20,
    },
    STATUS: {
      IN_PROCESS: 1,
      APPROVED: 2,
      DECLINED: 3,
      RE_SEND: 4,
      IN_ACTIVE: 5,
      NOT_REQUIRED: 6,
      CANCELLED: 7,
    },
    APPROVALS: {
      DOCUMENTS: 89,
      LEAVES: 143,
      EXPENSE: {
        APPROVER: 113,
        EXECUTOR: 136,
        FINANCIER: 188,
      },
      ASSETS: 145,
      TRAVEL: 117,
      BUDGET: 184,
      SCHEDULE: {
        DEFAULT: 196,
      },
      PAYROLL: {
        PAYROLL: 211,
      },
      SALARY: 213,
    },
    CALL: {
      SCREEN_SHARE_POSTFIX: "SCREEN_SHARE",
      ICE_CANDIDATE: null,
      TYPE: {
        INCOMING: 1,
        CREATE_OFFER: 2,
        RECEIVE_OFFER: 3,
        CREATE_ANSWER: 4,
        RECEIVE_ANSWER: 5,
        SEND_ICE_CANDIDATE: 6,
        RECEIVE_ICE_CANDIDATE: 7,
        CREATE_CALL: 8,
        CREATE_CALL_STATUS: 9,
        RECEIVE_CALL: 1,
        RECEIVE_CALL_STATUS: 10,
        REGISTER_CALLING_CONNECTION: 11,
        DISPOSE_FROM_OTHER_CONNECTION: 12,
        NOTIFY_CALL_TO_OTHERS: 13,
        ADD_MEMBER: 14,
      },
      MODE: {
        AUDIO: 1,
        VIDEO: 2,
        INITIATE: 3,
        ANSWER: 4,
        VIDEO_ANSWER: 11,
        RINGING: 10,
        DECLINE: 5,
        NOT_ANSWER: 6,
        BUSY: 7,
        END_CALL: 8,
        MUTE: 12,
        UNMUTE: 13,
        CAM_ON: 14,
        CAM_OFF: 15,
        END_CALL_FOR_ALL: 16,
        REMOVE_FROM_CALL: 17,
        UPDATE_CHAT_ID: 18,
        SCREEN_SHARE_ON: 19,
        SCREEN_SHARE_OFF: 20,
        LOCK_CALL_INVITE: 21,
        UNLOCK_CALL_INVITE: 22,
      },
      PAYLOAD_TYPE: {
        DEFAULT: 0,
        SCREEN_SHARE: 1,
      },
    },
    EXTERNAL_TYPE: {
      SCHEDULE: 1,
      PROJECT: 2,
    },
  },

  RESPONSE: {
    status: "status",
    error: "error",
    success: "success",
    fail: "fail",
  },
  DEFAULTS: {
    guid: "00000000-0000-0000-0000-000000000000",
  },
};

export const LOGGER = {
  log: (LOG, TAG = "LOG_TAG") => {
    /*if (process.env.NODE_ENV === 'development') */
    LOG(TAG);
  },
};

//-------------------- functions -------------------

// routing from Snackbar and notification tray

export function SvgSpinner(props) {
  LOGGER.log((TAG) => console.log(TAG, props));
  return (
    <span className="spinner-holder">
      <svg
        id="svg-spinner"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="4"
          r="4"
          fill={`${props.props !== undefined ? props.props : "#fff"}`}
        />
        <circle
          cx="12.19"
          cy="7.86"
          r="3.7"
          fill={`${props.props !== undefined ? props.props : "#fffbf2"}`}
        />
        <circle
          cx="5.02"
          cy="17.68"
          r="3.4"
          fill={`${props.props !== undefined ? props.props : "#fef7e4"}`}
        />
        <circle
          cx="5.02"
          cy="30.32"
          r="3.1"
          fill={`${props.props !== undefined ? props.props : "#fef3d7"}`}
        />
        <circle
          cx="12.19"
          cy="40.14"
          r="2.8"
          fill={`${props.props !== undefined ? props.props : "#feefc9"}`}
        />
        <circle
          cx="24"
          cy="44"
          r="2.5"
          fill={`${props.props !== undefined ? props.props : "#feebbc"}`}
        />
        <circle
          cx="35.81"
          cy="40.14"
          r="2.2"
          fill={`${props.props !== undefined ? props.props : "#fde7af"}`}
        />
        <circle
          cx="42.98"
          cy="30.32"
          r="1.9"
          fill={`${props.props !== undefined ? props.props : "#fde3a1"}`}
        />
        <circle
          cx="42.98"
          cy="17.68"
          r="1.6"
          fill={`${props.props !== undefined ? props.props : "#fddf94"}`}
        />
        <circle
          cx="35.81"
          cy="7.86"
          r="1.3"
          fill={`${props.props !== undefined ? props.props : "#fcdb86"}`}
        />
      </svg>
    </span>
  );
}

export const Spinner = ({ myStyles }) => {
  return (
    <div className="spin-holder" style={myStyles}>
      <div className="spinner" />
    </div>
  );
};

export const BrokenPage = () => {
  return (
    <div className="br-content broken">
      <div className="heading">This page isn't available</div>
      <div className="message">
        The link you followed may be broken, or the page may have been removed.
      </div>
      <div className="image">
        <img src={brokenPaper} alt="#" />
      </div>
      <div className="links">
        <Link to={STRINGS.ROUTES.ROOT}>Go to News</Link>
      </div>
    </div>
  );
};

export function getTypeOfFile(fileName) {
  const ext = fileName.substr(fileName.lastIndexOf(".") + 1, fileName.length);
  if (STRINGS.IMAGE.includes(ext)) return STRINGS.TYPES.ATTACHMENTS.IMAGE;
  else if (STRINGS.VIDEO.includes(ext)) return STRINGS.TYPES.ATTACHMENTS.VIDEO;
  else if (STRINGS.DOCUMENT.pdf.includes(ext))
    return STRINGS.TYPES.ATTACHMENTS.PDF;
  else if (STRINGS.DOCUMENT.word.includes(ext))
    return STRINGS.TYPES.ATTACHMENTS.WORD;
  else if (STRINGS.DOCUMENT.excel.includes(ext))
    return STRINGS.TYPES.ATTACHMENTS.EXCEL;
  else if (STRINGS.DOCUMENT.powerPoint.includes(ext))
    return STRINGS.TYPES.ATTACHMENTS.PPT;
  else return STRINGS.TYPES.ATTACHMENTS.INVALID;
}

export function isDocument(ext) {
  let found = false;
  if (STRINGS.DOCUMENT.pdf.includes(ext)) found = true;
  else if (STRINGS.DOCUMENT.word.includes(ext)) found = true;
  else if (STRINGS.DOCUMENT.excel.includes(ext)) found = true;
  else if (STRINGS.DOCUMENT.powerPoint.includes(ext)) found = true;
  return found;
}

export function isValidFileSize(files) {
  const valid = { status: true, message: "" };
  for (const key in files) {
    if (files.hasOwnProperty(key)) {
      const file = files[key];
      const ext = file.name.substr(
        file.name.lastIndexOf(".") + 1,
        file.name.length
      );
      const type = getTypeOfFile(file.name);
      const size = file.size / 1024 / 1024;
      if (type === STRINGS.TYPES.ATTACHMENTS.IMAGE) {
        if (size > STRINGS.TYPES.SIZE.IMAGE) {
          const m = `${file.name} Size exceeds ${STRINGS.TYPES.SIZE.IMAGE}MB`;
          valid.status = false;
          valid.message += valid.message ? `\n${m}` : m;
        }
      } else if (type === STRINGS.TYPES.ATTACHMENTS.VIDEO) {
        if (size > STRINGS.TYPES.SIZE.VIDEO) {
          const m = `${file.name} Size exceeds ${STRINGS.TYPES.SIZE.VIDEO}MB`;
          valid.status = false;
          valid.message += valid.message ? `\n${m}` : m;
        }
      } else if (isDocument(ext)) {
        if (size > STRINGS.TYPES.SIZE.DOCUMENT) {
          const m = `${file.name} Size exceeds ${STRINGS.TYPES.SIZE.DOCUMENT}MB`;
          valid.status = false;
          valid.message += valid.message ? `\n${m}` : m;
        }
      } else {
        const m = `File ${file.name} Not Supported`;
        valid.status = false;
        valid.message = valid.message ? `\n${m}` : m;
      }
    }
  }
  return valid;
}

export function resizeTabbableContainer() {
  const tabbableContainer = $(".tabbable-container");
  const tabbableContainerHeader = $(".cont-header");

  if ($(tabbableContainer.parent()[1]).hasClass("mm-tabs")) {
    const innerTabbableContainer = $(tabbableContainer[1]);
    const innerTabbableContainerContainerHeader = $(
      tabbableContainer[1]
    ).children(".cont-header");
    const innerTabbableContainerContainerBody = $(
      tabbableContainer[1]
    ).children(".cont-body");

    const innerTabbableContainerHeader = $(tabbableContainerHeader[1]);

    innerTabbableContainerContainerHeader.children(".ln").css("z-index", 0);
    innerTabbableContainerContainerBody.css({ "margin-top": "0px" });
    innerTabbableContainerHeader.css({
      width: `${innerTabbableContainer.outerWidth()}px`,
      position: "relative",
      "z-index": 0,
    });

    $(window).resize(() => {
      innerTabbableContainerHeader.css({
        width: `${innerTabbableContainer.outerWidth()}px`,
      });
    });
  } else {
    const outerTabbableContainer = $(tabbableContainer[0]);
    const outerTabbableContainerHeader = $(tabbableContainerHeader[0]);

    outerTabbableContainerHeader.css({
      width: `${outerTabbableContainer.outerWidth()}px`,
    });

    $(window).resize(() => {
      outerTabbableContainerHeader.css({
        width: `${outerTabbableContainer.outerWidth()}px`,
      });
    });
  }
}

export function setAuthEnv(token, user) {
  localStorage.setItem(STRINGS.STORAGE.token, token);
  user.fullname = user.first_name + " " + user.last_name;
  localStorage.setItem(STRINGS.STORAGE.user, JSON.stringify(user));
  window.location = ROUTES.ROOT;
}

export function logout() {
  localStorage.clear();
  window.location = ROUTES.AUTH.SIGN_IN;
  console.log(
    "base chal rha he -----------------------------------------------------------"
  );
}

export function getNameForImage(name) {
  const split = name.split(" ");
  let firstName = "",
    lastName = "",
    symbol = "";
  if (split.length > 1) {
    firstName = split[0];
    lastName = split[1];
    symbol = `${firstName[0]}${lastName.length ? lastName[0] : ""}`;
  } else {
    symbol = split[0][0];
  }
  return symbol !== undefined ? symbol.toUpperCase() : "EX";
}

/*---------------- Time functions -----------------*/

export function parseDateAndTime(st = Date.now(), type = "short") {
  const date = new Date(parseInt(st));
  const options = {
    weekday: type,
    year: "numeric",
    month: type,
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function getRelativeTime(d, t = "short") {
  const parseDate = parseDateAndTime(d, t);
  const difference = moment(parseDate).diff(new Date(), "days");
  return Math.abs(difference) > 7 ? parseDate : moment(parseDate).fromNow();
}

export function parseDateWithMontAndYear(st, type = "short") {
  const date = new Date(parseInt(st));
  const options = {
    year: "numeric",
    month: type,
  };
  return date.toLocaleDateString("en-US", options);
}

export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

export function parseDate(d) {
  const date = new Date(d);
  // date.setTime(Date.parse(date.toString()) - Math.abs(date.getTimezoneOffset() * 60000));
  return Date.parse(date.toString());
}

/*---------------- Time functions -----------------*/

export function createGuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
}

/*---------------- Css Indexing functions -----------------*/
export const groupByKey = (list, key) => {
  return list.reduce(
    (hash, obj) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {}
  );
};
export const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};
export function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey
          ? !isNaN(Number(key))
            ? `${parentKey}[${key}]`
            : `${parentKey}.${key}`
          : key
      );
    });
  } else {
    // const value = data == null ? "" : data;
    data !== undefined && data !== null && formData.append(parentKey, data);
  }
}

export function jsonToFormData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

export const getMentionsAndText = (titleWithMentions, mentions) => {
  console.log(titleWithMentions, "titleWithMentionn");
  const mentionsFoundInTitle = [];
  mentions.forEach(({ key, value }) => {
    const regex = `@${value}`;
    if (!titleWithMentions.includes(regex)) return false;

    const regexExpression = new RegExp(regex, "g");
    titleWithMentions = titleWithMentions.replace(regexExpression, key);
    mentionsFoundInTitle.push(key);
  });

  return {
    title: titleWithMentions,
    mentions: mentionsFoundInTitle.map((key) => ({
      memberId: key,
      memberType: 1,
    })),
  };
};
export function renderTitleWithMentions(title, mentions) {
  if (mentions.length > 0) {
    let arr = `<div>${mentions.map((member) => {
      return `<a href="user/${member?.member?.id}">${member?.member?.name}</a>`;
    })}</div>`;

    return arr;
  } else {
    return title && replaceURL(title);
  }
}

// This function will convert single string into array

export function modifySelectData(data) {
  if (typeof data === "string") {
    return [data];
  } else {
    return data;
  }
}

// This function will get enum value

export const getEnumValue = (objEnum, enumTypeId) => {
  const result = objEnum.filter((item) => item.value === enumTypeId);
  return result.label;
};

export const callingWindowOptions =
  "location=yes,height=800,width=800,scrollbars=yes,status=yes";

export const handleOpenCallWindow = (callURL, windowOptions) => {
  window.open(callURL, "_blank", windowOptions);
};
