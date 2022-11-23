import React from 'react';
import $ from 'jquery';
import * as moment from 'moment';
import brokenPaper from '../content/svg/brokenpaper.svg';
import { Link } from 'react-router-dom';
import { REPORT_URL } from './services';
import { ROUTES } from './routes';
// require("jquery.caret");

let DOMAIN_PREFIX = '';
DOMAIN_PREFIX = process.env.NODE_ENV !== 'development' ? '/konnect' : '';

export const STRINGS = {
  COPY_RIGHTS: `\u00A9 Miletap Ltd - Copyrights \u00402017-${new Date().getFullYear()}`,
  STRIPE_KEY:
    'pk_test_51Hs6ovE6WX7VMR4a2q3dV2dNIhjNSl1YIXa4PMDlAAUMmeYimKZoZ1B0et3b2n5VaGjaoFlDoNTIMDdxW0cMv7Jr00YyDry9GE',
  USER_RIGHTS_TYPE: {
    //menu
    FEED: 1,
    MAILBOX: 2,
    MESSENGER: 3,
    GROUP: 4,
    PROJECT: 5,
    TASK: 6,
    TODO: 7,
    LEAD_MANAGER: 8,
    SCHEDULE: 9,
    EXPENSE: 10,
    TRAVEL: 11,
    DOCS_ARCHIVE: 12,
    E_LEARNING: 13,
    INVENTORY: 14,
    AUDIO_CALL: 21,
    VIDEO_CALL: 22,
    POST_ON_FEED: 23,

    //hr
    EMPLOYEE: 15,
    ADMINISTRATOR: 16,
    APPRAISAL: 17,
    DEPARTMENT: 18,
    LEAVES: 19,
    HOLIDAYS: 20,
    HIRING: 24,
    LOAN: 25,
    PAYROLL: 26,
  },

  HR_MODULES: [15, 16, 17, 18, 19, 20, 24, 26],
  MENU_MODULES: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14],
  RIGHTS: {},
  DEFAULT_EMAIL: {
    TO: 'support@konnect.im',
    FROM: 'amir@gmail.com',
  },
  PRICE_LIST: {
    NEWS_FEED: 3.0,
    MESSENGER: 1.0,
    ADMINISTRATION: 1.0,
    EMPLOYEES: 0.25,
    HOLIDAYS: 0.5,
    DEPARTMENTS: 0.5,
    LEAVES: 0.5,
    MEMORY: 1.0,
    MESSENGER_VIDEO_AUDIO: 5.0,
    DOC_MANAGER_WITH_COL: 3.0,
    G_P_T_E_T: 2.5,
    INVENTORY_MANAGER: 0.5,
    LEAD_MANAGER: 1.0,
    TODO: 1.0,
    SCHEDULER: 1.0,
    APPRAISAL_MANAGER: 1.5,
    HIRING_MANAGEMENT: 1.0,
    MAIL_MANAGEMENT: 1.0,
    E_LEARNING: 2.5,
  },
  SEARCH_TYPE: {
    USER: 1,
    GROUP: 2,
    PROJECT: 3,
    POST: 4,
    DEPARTMENT: 5,
    DOCUMENT: 6,
    SCHEDULE: 7,
  },
  REPORTS: {
    EXPENSE_REPORT: `${REPORT_URL}/MyExpenseReport.aspx`,
  },
  EDITOR_URL: 'https://milepad.gqhub.com/p/',
  VIDEO: ['mp4'],
  IMAGE: ['jpg', 'jpeg', 'png', 'gif'],
  SIGN_UP_DEFAULT_TOKEN:
    'hxD0MXIIS0F1tFGfO2uB56Ux6gZn6Tkvm7IOLTwWqNmyHFaDvo7Rjla0JcAU86oS',
  ENV: {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
  },
  STORAGE: {
    connectionId: '',
    _connectionId: 'connectionId',
    token: 'token',
    user: 'user',
    call: 'call',
    call_id: 'call_id',
    user_id: 'user_id',
    first_name: 'first_name',
    middle_name: 'middle_name',
    last_name: 'last_name',
    department_id: 'department_id',
    departmentName: 'departmentName',
    hod_id: 'hod_id',
    hodName: 'hodName',
    hodImage: 'hodImage',
    hodDesignation: 'hodDesignation',
    designation_id: 'designation_id',
    designation: 'designation',
    profile_picture: 'profile_picture',
    manager_id: 'manager_id',
    managerDesignation: 'managerDesignation',
    managerImage: 'managerImage',
    managerName: 'managerName',
    email: 'email',
    mobileNo: 'mobileNo',
    user_type: 'userTypeId',
    business_id: 'business_id',
    branch_id: 'branch_id',
    user_name: 'user_name',
    birthdate: 'birthdate',
    businessName: 'businessName',
    branchName: 'branchName',
    businessLogo: 'businessLogo',
    fullname: 'fullname',
    userRights: 'userRights',
    rights: 'rights',
  },
  ROUTES: {
    SEARCH: {
      DEFAULT: `${DOMAIN_PREFIX}/search`,
    },
    MESSENGER: {
      DEFAULT: `${DOMAIN_PREFIX}/messenger`,
      CHAT: `${DOMAIN_PREFIX}/messenger/chat`,
    },
    AUTH: {
      SIGN_UP: `${DOMAIN_PREFIX}/register`,
      VERIFICATION_SUCCESS: `${DOMAIN_PREFIX}/verified`,
      VERIFICATION_INPROCESS: `${DOMAIN_PREFIX}/verify`,
      SIGN_IN: `${DOMAIN_PREFIX}/login`,
      INDIVIDUAL_SIGN_IN: `${DOMAIN_PREFIX}/individualSignIn`,
      PAYMENT: `${DOMAIN_PREFIX}/AddPaymentCard`,
      EXTERNAL_SIGN_UP: `${DOMAIN_PREFIX}/externalSignup`,
      SIGN_IN_ANONYMOUSLY: `${DOMAIN_PREFIX}/authenticating`,
      FORGOT_PASSWORD_LANDING: `${DOMAIN_PREFIX}/resetpassword`,
      FORGOT_PASSWORD: `${DOMAIN_PREFIX}/forgotpassword`,
    },
    BUDGET: {
      DEFAULT: `${DOMAIN_PREFIX}/budgets`,
    },
    ROOT: `${DOMAIN_PREFIX}/`,
    NEWSFEED: {
      DETAILS: `${DOMAIN_PREFIX}/newsFeedDetails`,
    },
    JOB_OPENING: `${DOMAIN_PREFIX}/jobopeningletter`,
    OFFER_LETTER: `${DOMAIN_PREFIX}/OfferLetter`,
    DOCUMENT_APPROVAL: `${DOMAIN_PREFIX}/DocumentApproval`,
    SCHEDULE_REMARKS: `${DOMAIN_PREFIX}/ScheduleRemark`,
    PRE_EMPLOYMENT: `${DOMAIN_PREFIX}/EmploymentForm`,
    GROUP: {
      DEFAULT: `${DOMAIN_PREFIX}/groups/`,
      NEWS: `${DOMAIN_PREFIX}/groups/news`,
      SCHEDULES: `${DOMAIN_PREFIX}/groups/schedules`,
      TASKS: `${DOMAIN_PREFIX}/groups/tasks`,
      EXPENSES: `${DOMAIN_PREFIX}/groups/expenses`,
    },
    INVENTORY: {
      DEFAULT: `${DOMAIN_PREFIX}/inventory`,
    },
    ATTENDANCE: {
      DEFAULT: `${DOMAIN_PREFIX}/attendance`,
      USER_ATTENDANCE: `${DOMAIN_PREFIX}/attendance/user_attendance`,
    },
    ASSETS: {
      DEFAULT: `${DOMAIN_PREFIX}/assets`,
    },

    PROJECT: {
      DEFAULT: `${DOMAIN_PREFIX}/projects`,
      NEWS: `${DOMAIN_PREFIX}/projects/news`,
      SCHEDULES: `${DOMAIN_PREFIX}/projects/schedules`,
      TASKS: `${DOMAIN_PREFIX}/projects/tasks`,
      EXPENSES: `${DOMAIN_PREFIX}/projects/expenses`,
      TRAVEL: `${DOMAIN_PREFIX}/projects/travels`,
      TRAVEL_DETAILS: `${DOMAIN_PREFIX}/projects/travel/details`,
      TRAVEL_CITIES: `${DOMAIN_PREFIX}/projects/travel/cities`,
      TRAVEL_APPROVALS: `${DOMAIN_PREFIX}/projects/travel/approvals`,
      TRAVEL_EXPENSES: `${DOMAIN_PREFIX}/projects/travel/expenses`,
      BUDGETS: `${DOMAIN_PREFIX}/projects/budgets`,
      TODO: `${DOMAIN_PREFIX}/projects/workBoard`,
      TODO_BOARD: `${DOMAIN_PREFIX}/projects/workBoard/board`,
      MY_TODO: `${DOMAIN_PREFIX}/projects/mytodo`,
      PROJECT_BUDGET: `${DOMAIN_PREFIX}/projects/budget/details`,
      DOCUMENTS: `${DOMAIN_PREFIX}/projects/documents`,
    },
    DOCUMENTS: {
      DEFAULT: `${DOMAIN_PREFIX}/documents`,
      ITEM: `${DOMAIN_PREFIX}/documents`,
      EDITOR: `${DOMAIN_PREFIX}/documents/editor`,
    },
    TODO: {
      DEFAULT: `${DOMAIN_PREFIX}/workBoard`,
      TODO_BOARD: `${DOMAIN_PREFIX}/workBoard/board`,
      MY_TODO: `${DOMAIN_PREFIX}/workBoard/assignToMe`,
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
    // TASKS: `${DOMAIN_PREFIX}/tasks`,
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

    WORK_BOARD: {
      DEFAULT: `${DOMAIN_PREFIX}/workboard`,
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
    REGISTER_USER: 'registerUser',
    MESSAGES_LISTENER: 'messageListner',
    LOGOUT_LISTENER: 'logoutFromDevice',
    MESSAGES_STATE_LISTENER: 'messageStateListner',
    USER_STATUS_LISTENER: 'UserStatus',
    MESSAGE_STATE_LISTENER: 'messageStateListner',
    CONVERSATIONS_LISTENER: 'conversationListener',
    CHAT_IN: 'chatIn',
    CHAT_OUT: 'chatOut',
    NOTIFY_LISTENER: 'notify',
    TYPING_LISTENER: 'typingStatus',
    MESSAGES_STATUS: 'messageStatus',
    COMMUNICATION_OUT: 'communicationOut',
    COMMUNICATION_IN: 'communicationIn',
    TESTING: 'testing',
    NOTIFICATION_IN: 'notificationIn',
    ACTIVITY_COUNT: 'activityCount',
  },
  DOCUMENT: {
    pdf: ['pdf'],
    word: ['doc', 'docx'],
    excel: ['xls', 'xlsx'],
    powerPoint: ['ppt', 'pptx'],
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
    ALLOWANCE_TYPE: {
      BENEFIT: 1,
      DEDUCTION: 2,
    },
    MESSAGES: {
      WAITING_FOR_APPROVAL: 'Waiting for manager approval.',
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
        'png',
        'jpeg',
        'raw',
        'cr2',
        'nef',
        'orf',
        'sr2',
        'tif',
        'tiff',
        'bmp',
        'jpeg',
        'jpg',
        'gif',
        'eps',
        'svg',
      ],
      VIDEO: ['mp4'],
      PDF: ['pdf'],
      WORD: ['docx', 'doc'],
      EXCEL: ['xlsx'],
      PPT: ['ppt'],
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
    TRAVEL_TYPE: [
      {
        id: 1,
        label: 'Plane',
        icon: 'ic-air-plane',
      },
      {
        id: 2,
        label: 'Car',
        icon: 'ic-car',
      },
      {
        id: 3,
        label: 'Train',
        icon: 'ic-train',
      },
      {
        id: 4,
        label: 'Ship',
        icon: 'ic-ship',
      },
    ],
    EXPENSE_CATEGORY: [
      {
        id: '2685d8ac-b905-4b33-b1d0-39e8b541cb99',
        label: 'Transport',
        icon: 'ic-transport',
      },
      {
        id: 'bda743c4-fed7-4a2d-bcb7-44e130ef9561',
        label: 'Health',
        icon: 'ic-health',
      },
      {
        id: '47271eef-4541-4997-8f83-55eb4d15b1c7',
        label: 'Food',
        icon: 'ic-food',
      },
      {
        id: '838deae4-4c22-4454-b8b5-61fc4c1e1d01',
        label: 'Shopping',
        icon: 'ic-shopping',
      },
      {
        id: '7ba4a1e2-2ca7-4c3c-9e9c-6d0caedac3d2',
        label: 'Entertainment',
        icon: 'ic-entertainment',
      },
      {
        id: 'df2d36db-2ed1-4d8f-8144-7f2ab4e6ccc3',
        label: 'Travel',
        icon: 'ic-air-plane',
      },
      {
        id: 'df74e2dd-4e15-4c35-b192-8d6a81b56da2',
        label: 'Bill',
        icon: 'ic-dollar-bill',
      },
      {
        id: 'dd5aa6a2-4060-48d8-93c6-df3c1cd56298',
        label: 'Office',
        icon: 'ic-clip',
      },
      {
        id: '32224d99-ed8e-4ed7-8b23-e06d96c5a9e6',
        label: 'Fuel',
        icon: 'ic-fuel',
      },
    ],
    STATUS: {
      IN_PROCESS: 1,
      APPROVED: 2,
      DECLINED: 3,
      RE_SEND: 4,
      IN_ACTIVE: 5,
      NOT_REQUIRED: 6,
      CANCELLED: 7,
    },
    ASSETS_STATUS: {
      WAITING_FOR_APPROVAL: 1,
      APPROVED: 2,
      DECLINED: 3,
      ALLOCATED: 4,
      CANCELLED: 5,
      RELEASED: 6,
    },
    INVENTORY_STATUS: {
      WAITING_FOR_APPROVAL: 1,
      ALLOCATED: 2,
      AVAILABLE: 3,
    },
    EXPENSE_TYPES: {
      GENERAL: 113,
      PROJECT: 114,
      GROUP: 115,
      TRAVEL: 116,
      ALL: [113, 114, 115, 116],
    },
    NOTIFICATIONS_COUNTER_TYPE: {
      ALL: 0,
      FEED: 1,
      MESSENGER: 2,
      GROUP: 3,
      PROJECT: 4,
      TASKS: 5,
      TODO: 6,
      LEAD_MANAGER: 7,
      SCHEDULE: 8,
      EXPENSE: 9,
      TRAVEL: 10,
      DOCUMENTS: 11,
      INVENTORY: 12,
      LEAVES: 13,
      GROUP_FEED: 14,
      GROUP_SCHEDULE: 15,
      GROUP_TASK: 16,
      GROUP_EXPENSE: 17,
      PROJECT_FEED: 18,
      PROJECT_SCHEDULE: 19,
      PROJECT_TASK: 20,
      PROJECT_EXPENSE: 21,
      PROJECT_TRAVEL: 22,
      PROJECT_TODO: 23,
      PROJECT_BUDGET: 24,
      PROJECT_DOCUMENT: 25,
      TOTAL_APPROVALS: 26,
      LOAN: 28,
      PAYROLL: 0,
      SALARY_APPROVAL: 31,
      PAYROLL_APPROVAL: 32,
    },
    NOTIFICATIONS_ROUTING_TYPE: {
      FEED_DETAIL: [1, 2, 3, 5, 9],
      TASK_DETAIL: [30, 31, 32],
      SCHEDULE_DETAIL: [28, 50],
      EXPENSE_DETAIL: [17, 18, 19, 57],
      TRAVEL_DETAILS: [21, 24],
      PROJECT_BUDGET_DETAIL: [53, 54],
      DOCUMENT_DETAIL: [22],
    },
    NOTIFICATIONS: {
      POST: 1,
      POLL: 4,
      POST_MENTION: 123,
      POST_TAG: 120,
      PROJECT_POST: 8,
      PROJECT_POLL: 11,
      PROJECT_POST_MENTION: 125,
      PROJECT_POST_TAG: 122,
      GROUP_POST: 25,
      GROUP_POLL: 28,
      GROUP_POST_MENTION: 124,
      GROUP_POST_TAG: 121,
      TIMELINE_POST: 94,
      VOTE_POLL: 128,
      GROUP_VOTE_POLL: 129,
      PROJECT_VOTE_POLL: 130,
      TIMELINE_VOTE_POLL: 131,
      POST_REACT: 58,
      GROUP_POST_REACT: 62,
      PROJECT_POST_REACT: 60,
      TIMELINE_POST_REACT: 132,
      REACT_ON_COMMENT: 59,
      COMMENT_ON_POST: 80,
      REPLY_ON_POST: 133,
      MENTION_ON_COMMENT: 134,
      MEMBER_ADD_GROUP: 32,
      MEMBER_ADD_PROJECT: 15,
      TASK_ASSIGNED: 95,
      TASK_ASSIGNED_GROUP: 31,
      TASK_ASSIGNED_PROJECT: 14,
      COMMENT_ON_TASK: 84,
      REPLY_ON_TASK: 133,
      MENTION_IN_TASK_COMMENT: 134,
      REACT_ON_TASK_COMMENT: 67,
      UPDATE_TASK: 135,
      GENERAL_EXPENSE: 136,
      PROJECT_EXPENSE: 137,
      GROUP_EXPENSE: 138,
      TRAVEL_EXPENSE: 139,
      EXECUTE_GENERAL_EXPENSE: 140,
      EXECUTE_PROJECT_EXPENSE_EXPENSE: 141,
      EXECUTE_GROUP_EXPENSE: 142,
      EXECUTE_TRAVEL_EXPENSE: 143,
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
    APPLICANT_TYPE: {
      //5=offered//6=offered accept//7=offered pending//8=offered Decline;
      OFFER_SEND: 5,
      OFFER_ACCEPT: 6,
      OFFER_PENDING: 7,
      OFFER_DECLINE: 8,
    },
    AGENTS: {
      TRAVEL: 144,
      PROJECT: 193,
    },
    INTERVIEW_SCHEDULE: {
      INTERVIEW_NOT_SCHEDULED: 1,
      INTERVIEW_SCHEDULED: 2,
      INTERVIEW_STARTED: 3,
      INTERVIEW_ENDED: 4,
      INTERVIEW_WAITING_FOR_RESCHEDULE: 5,
    },
    PROJECT_SUMMARY_TYPE: {
      EXPENSE: 1,
      TASK: 2,
      SCHEDULE: 3,
      DOCUMENT: 4,
      FEED: 5,
    },
    CALL: {
      SCREEN_SHARE_POSTFIX: 'SCREEN_SHARE',
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
      MARK_APPLICANTS: {
        IN_PROCESS: 1,
        SHORT_LISTED: 2,
        REJECTED: 3,
      },
    },
    EMAIL_FOLDERS_ID: {
      index: 'INBOX',
      archive: 'INBOX.Archive',
      notes: 'INBOX.Notes',
      drafts: 'INBOX.Drafts',
      junk: 'INBOX.Junk',
      sent: 'INBOX.Sent',
      spam: 'INBOX.spam',
      trash: 'INBOX.Trash',
    },
    PROJECT_SUMMARY: {
      Discussion: 0,
      Schedule: 1,
      Task: 2,
      Expense: 3,
      Approvals: 4,
      Travels: 5,
      Todo: 6,
    },
    EXTERNAL_TYPE: {
      SCHEDULE: 1,
      PROJECT: 2,
    },
  },
  COLOR_CODE: {
    //TRAVEL_SCHEDULE: `#d8ffcf`,
    TRAVEL_SCHEDULE: `#c4caea`,
    //DEFAULT_SCHEDULE: `#dbe3f7`,
    //DEFAULT_SCHEDULE: `#ffafa1`,
    //MEETING_SCHEDULE: `#d8ffcf`,
    MEETING_SCHEDULE: `#ffafa1`,
    APPOINTMENT_SCHEDULE: `#afeab5`,
    //TASK_SCHEDULE: `#ffff96`,
    TASK_SCHEDULE: `#e2c0db`,
    //INTERVIEW_SCHEDULE: `#ffcaa5`,
    INTERVIEW_SCHEDULE: `#fbd7bd`,
    SPINNER_COLOR: `#4267b2`,
  },

  RESPONSE: {
    status: 'status',
    error: 'error',
    success: 'success',
    fail: 'fail',
  },
  API_STATUS: {
    NOT_CALLED: 0,
    IN_PROCESS: 1,
    FULFILLED: 2,
    FAILED: 3,
    LOADING_MORE: 4,
  },
  DEFAULTS: {
    guid: '00000000-0000-0000-0000-000000000000',
    RIGHTS: {
      NewsFeed: true,
      MailBox: false,
      Messenger: false,
      Groups: false,
      Projects: false,
      Tasks: false,
      Todo: false,
      LeadManager: false,
      Schedules: false,
      Expenses: false,
      Travel: false,
      DocsArchive: false,
      ELearning: false,
      Inventory: false,
      Employees: false,
      Adminestration: false,
      Appraisals: false,
      Departments: false,
      Leaves: false,
      Holidays: false,
      Companies: false,
    },
  },
  EXPENSE_CATEGORIES: [
    {
      id: '2685d8ac-b905-4b33-b1d0-39e8b541cb99',
      label: 'Transport',
      icon: 'ic-transport',
    },
    {
      id: 'bda743c4-fed7-4a2d-bcb7-44e130ef9561',
      label: 'Health',
      icon: 'ic-health',
    },
    {
      id: '47271eef-4541-4997-8f83-55eb4d15b1c7',
      label: 'Food',
      icon: 'ic-food',
    },
    {
      id: '838deae4-4c22-4454-b8b5-61fc4c1e1d01',
      label: 'Shopping',
      icon: 'ic-shopping',
    },
    {
      id: '7ba4a1e2-2ca7-4c3c-9e9c-6d0caedac3d2',
      label: 'Entertainment',
      icon: 'ic-entertainment',
    },
    {
      id: 'df2d36db-2ed1-4d8f-8144-7f2ab4e6ccc3',
      label: 'Travel',
      icon: 'ic-air-plane',
    },
    {
      id: 'df74e2dd-4e15-4c35-b192-8d6a81b56da2',
      label: 'Bill',
      icon: 'ic-dollar-bill',
    },
    {
      id: 'dd5aa6a2-4060-48d8-93c6-df3c1cd56298',
      label: 'Office',
      icon: 'ic-clip',
    },
    {
      id: '32224d99-ed8e-4ed7-8b23-e06d96c5a9e6',
      label: 'Fuel',
      icon: 'ic-fuel',
    },
  ],
};

export const LOGGER = {
  log: (LOG, TAG = 'LOG_TAG') => {
    /*if (process.env.NODE_ENV === 'development') */
    LOG(TAG);
  },
};

export const ACTIONS = {
  TOAST_HANDLER: {
    TOAST: {
      OPEN_TOAST: 'OPEN_TOAST',
      CLOSE_TOAST: 'CLOSE_TOAST',
    },
  },
  NOTIFICATION_HANDLER: {
    NOTIFICATION: {
      ERROR: 'GET_ALL_NOTIFICATION_ERROR',
      PENDING: 'GET_ALL_NOTIFICATION_PENDING',
      FULFILLED: 'GET_ALL_NOTIFICATION_FULFILLED',
    },
  },
  FILES: {
    UPLOAD: {
      ERROR: 'UPLOAD_ERROR',
      PENDING: 'UPLOAD_PENDING',
      FULFILLED: 'UPLOAD_FULFILLED',
    },
  },
  AUTH: {
    LOGIN: {
      ERROR: 'LOGIN_ERROR',
      PENDING: 'LOGIN_PENDING',
      FULFILLED: 'LOGIN_FULFILLED',
    },
    SIGNUP: {
      ERROR: 'SIGNUP_ERROR',
      PENDING: 'SIGNUP_PENDING',
      FULFILLED: 'SIGNUP_FULFILLED',
    },
    FORGOT_PASSWORD: {
      ERROR: 'FORGOT_PASSWORD_ERROR',
      PENDING: 'FORGOT_PASSWORD_PENDING',
      FULFILLED: 'FORGOT_PASSWORD_FULFILLED',
    },
    ANONYMOUS: {
      ERROR: 'ANONYMOUS_ERROR',
      PENDING: 'ANONYMOUS_PENDING',
      FULFILLED: 'ANONYMOUS_FULFILLED',
    },
    LOGOUT: 'LOGIN_LOGOUT',
  },
  USER: {
    GET_ALL: {
      ERROR: 'USER_GET_ALL_ERROR',
      PENDING: 'USER_GET_ALL_PENDING',
      FULFILLED: 'USER_GET_ALL_FULFILLED',
    },
    GET_BY_ID: {
      ERROR: 'USER_GET_BY_ID_ERROR',
      PENDING: 'USER_GET_BY_ID_PENDING',
      FULFILLED: 'USER_GET_BY_ID_FULFILLED',
    },
  },
  NEWS: {
    GET_POSTS: {
      ERROR: 'GET_POSTS_ERROR',
      PENDING: 'GET_POSTS_PENDING',
      FULFILLED: 'GET_POSTS_FULFILLED',
    },
    GET_POST_COMMENTS: {
      ERROR: 'GET_POST_COMMENTS_ERROR',
      PENDING: 'GET_POST_COMMENTS_PENDING',
      FULFILLED: 'GET_POST_COMMENTS_FULFILLED',
    },
    CREATE_POST: {
      ERROR: 'CREATE_POST_ERROR',
      PENDING: 'CREATE_POST_PENDING',
      FULFILLED: 'CREATE_POST_FULFILLED',
    },
    REMOVE_POST_REACTION: {
      ERROR: 'REMOVE_POST_REACTION_ERROR',
      PENDING: 'REMOVE_POST_REACTION_PENDING',
      FULFILLED: 'REMOVE_POST_REACTION_FULFILLED',
    },
    ADD_POST_REACTION: {
      ERROR: 'ADD_POST_REACTION_ERROR',
      PENDING: 'ADD_POST_REACTION_PENDING',
      FULFILLED: 'ADD_POST_REACTION_FULFILLED',
    },
    ADD_POLL_POST_REACTION: {
      ERROR: 'ADD_POLL_POST_REACTION_ERROR',
      PENDING: 'ADD_POLL_POST_REACTION_PENDING',
      FULFILLED: 'ADD_POLL_POST_REACTION_FULFILLED',
    },
  },
  EXPENSES: {
    ADD: 'ADD_EXPENSE',
    GET_ALL: {
      ERROR: 'GET_ALL_EXPENSES_ERROR',
      PENDING: 'GET_ALL_EXPENSES_PENDING',
      FULFILLED: 'GET_ALL_EXPENSES_FULFILLED',
      ERROR_CLEAR: 'GET_ALL_EXPENSES_CLEAR',
    },
    CREATE: {
      ERROR: 'CREATE_EXPENSES_ERROR',
      PENDING: 'CREATE_EXPENSES_PENDING',
      FULFILLED: 'CREATE_EXPENSES_FULFILLED',
    },
  },
  DOCUMENTS: {
    GET_ALL: {
      ERROR: 'GET_ALL_DOCUMENTS_ERROR',
      PENDING: 'GET_ALL_DOCUMENTS_PENDING',
      FULFILLED: 'GET_ALL_DOCUMENTS_FULFILLED',
    },
  },
  CHATS: {
    TOGGLE_CHAT_COMPOSER: 'TOGGLE_CHAT_COMPOSER',
    TOGGLE_SIDE_BAR: 'TOGGLE_SIDE_BAR',
    UPDATE_BOTTOM_CHAT_ROOMS: 'UPDATE_BOTTOM_CHAT_ROOMS',
    UPDATE_CHATS: 'UPDATE_CHATS',
    GET_ALL: {
      ERROR: 'GET_ALL_CHATS_ERROR',
      PENDING: 'GET_ALL_CHATS_PENDING',
      FULFILLED: 'GET_ALL_CHATS_FULFILLED',
    },
  },
  CALL: {
    CALL_STATUS: 'CALL_STATUS',
  },
  GENERAL: {
    CITIES: {
      ERROR: 'CITIES_ERROR',
      PENDING: 'CITIES_PENDING',
      FULFILLED: 'CITIES_FULFILLED',
    },
    Add_EMP: {
      ERROR: 'Add_EMP_ERROR',
      PENDING: ' Add_EMP_PENDING',
      FULFILLED: ' Add_EMP_FULFILLED',
    },
  },
  NOTES: {
    TOGGLE_NOTES_AREA: 'TOGGLE_NOTES_AREA',
    OPEN_NOTES_AREA: 'OPEN_NOTES_AREA',
    CLOSE_NOTES_AREA: 'CLOSE_NOTES_AREA',
  },
  CALENDAR_EVENTS: {
    GET_EVENTS_PENDING: 'GET_EVENTS_PENDING',
    GET_EVENTS: 'GET_EVENTS',
    ADD_EVENT: 'ADD_EVENT',
    ERROR_GET_EVENTS: 'ERROR_GET_EVENTS',
    ERROR_ADD_EVENTS: 'ERROR_ADD_EVENTS',
    OPEN_NEW_EVENT_DIALOG: 'OPEN_NEW_EVENT_DIALOG',
    CLOSE_NEW_EVENT_DIALOG: 'CLOSE_NEW_EVENT_DIALOG',
    OPEN_EDIT_EVENT_DIALOG: 'OPEN_EDIT_EVENT_DIALOG',
    CLOSE_EDIT_EVENT_DIALOG: 'CLOSE_EDIT_EVENT_DIALOG',
  },
  MOBILE_VIEW: {
    NAV_STATUS: 'NAV_STATUS',
  },
};

export const REF_TYPES = {
  Feed: 1,
  Feed_Image: 2,
  Feed_Video: 3,
  Feed_Poll: 4,
  Checkin_Feed: 5,
  Attachment_Feed: 6,
  Create_Project: 7,
  Project_Feed: 8,
  Project_Image_Feed: 9,
  Project_Video_Feed: 10,
  Project_poll_Feed: 11,
  Project_Checkin_Feed: 12,
  Project_Attachment_Feed: 13,
  Project_Task: 14,
  Add_Project_Member: 15,
  Remove_Project_Member: 16,
  Project_Meeting: 17,
  Project_Update: 18,
  Add_Member_in_Project_Meeting: 19,
  Update_Project_Meeting: 20,
  Remove_Member_in_Project_Meeting: 21,
  Project_Meeting_Status: 22,
  Project_Status_notification: 23,
  Create_Group: 24,
  Group_Feed: 25,
  Group_Image_Feed: 26,
  Group_Video_Feed: 27,
  Group_poll_Feed: 28,
  Group_Checkin_Feed: 29,
  Group_Attachment_Feed: 30,
  Group_Task: 31,
  Add_Group_Member: 32,
  Remove_Group_Member: 33,
  Group_Meeting: 34,
  Group_Update: 35,
  Add_Member_in_Group_Meeting: 36,
  Update_Group_Meeting: 37,
  Remove_Member_in_Group_Meeting: 38,
  Group_Meeting_Status: 39,
  Group_Status_notification: 40,
  Create_Department: 41,
  Department_Feed: 42,
  Department_Image_Feed: 43,
  Department_Video_Feed: 44,
  Department_poll_Feed: 45,
  Department_Checkin_Feed: 46,
  Department_Attachment_Feed: 47,
  Department_Task: 48,
  Add_Department_Member: 49,
  Remove_Department_Member: 50,
  Department_Meeting: 51,
  Department_Update: 52,
  Add_Department_in_Group_Meeting: 53,
  Update_Department_Meeting: 54,
  Remove_Member_in_Department_Meeting: 55,
  Department_Meeting_Status: 56,
  Department_Status_notification: 57,
  Reacted_on_Feed: 58,
  Reacted_in_comment_on_Feed: 59,
  Reacted_on_Project_Feed: 60,
  Reacted_in_comment_on_Project_Feed: 61,
  Reacted_on_Group_Feed: 62,
  Reacted_in_comment_on_Group_Feed: 63,
  Reacted_on_Department_Feed: 64,
  Reacted_in_comment_on_Department_Feed: 65,
  Reacted_on_Task: 66,
  Reacted_in_comment_on_Task: 67,
  Reacted_on_Meeting: 68,
  Reacted_in_comment_on_Meeting: 69,
  Reacted_on_Schedule: 70,
  Reacted_in_comment_on_Schedule: 71,
  Create_a_Schedule: 72,
  Create_a_Project_Schedule: 73,
  Create_a_Group_Schedule: 74,
  Create_a_Department_Schedule: 75,
  Update_a_Schedule: 76,
  Add_Member_in_Schedule: 77,
  Shared_a_document_Archive: 78,
  Shared_a_document_Document: 79,
  Comment_on_Feed: 80,
  Comment_on_Group_Feed: 81,
  Comment_on_Project_Feed: 82,
  Comment_on_Department_Feed: 83,
  Comment_on_Task: 84,
  Comment_on_Meeting: 85,
  Comment_on_Schedule: 86,
  Comment_on_todo: 166,
  Business_Approval: 87,
  Expense_Approval: 88,
  Document_Approval: 89,
  Travel_Approval: 90,
  Meeting_Approval: 91,
  Send_Message: 92,
  Added_you_in_a_group_Chat: 93,
  Posted_on_your_timeline: 94,
  Create_Task: 95,
  Update_Task: 96,
  General_Expense: 113,
  Project_Expense: 114,
  Group_Expense: 115,
  Travel_Expense: 116,
  Travel: 117,
  Travel_Against_Project: 118,
  Approver_Status_Update: 119,
  Tagged_Post: 120,
  Tagged_Group_Post: 121,
  Tagged_Project_Post: 122,
  Mention_Post: 123,
  Mention_Group_Post: 124,
  Mention_Project_Post: 125,
  Mention_Timeline_Post: 126,
  Tagged_Timeline_Post: 127,
  Voted_on_poll: 128,
  Voted_on_group_poll: 129,
  Voted_on_project_poll: 130,
  Voted_on_timeline_poll: 131,
  Reacted_on_timeline_feed: 132,
  Replied_on_comment: 133,
  Mentioned_in_comment: 134,
  Task_Progress_Update: 135,
  Execute_General_Expense: 136,
  Execute_Project_Expense: 137,
  Execute_Group_Expense: 138,
  Execute_Travel_Expense: 139,
  Approved_Expense_Request: 140,
  Rejectd_Expense_Request: 141,
  Remarked_Expense_Request: 142,
  Leave_Approval: 143,
  Travel_Agent: 144,
  General_Asset: 145,
  Project_Asset: 146,
  Group_Asset: 147,
  Remarked_Travel_Request: 148,
  Remarked_Document_Request: 149,
  Remarked_Leave_Request: 150,
  Remarked_Asset_Request: 151,
  General_Todo: 152,
  Group_Todo: 153,
  Project_Todo: 154,
  Timeline_Todo: 155,
  Send_Buzz: 156,
  Add_Task_Member: 157,
  Add_Chat_Member: 158,
  Make_Group_Admin: 159,
  Make_Project_Admin: 160,
  Lead_Manager_Schedule: 171,
  Comment_on_Lead_Task: 180,
};
export const WEB_RTC_CONFIGS = () => {
  const STUN = {
    urls: 'stun:global.stun.twilio.com:3478?transport=udp',
  };
  const TURN = {
    urls: 'turn:global.turn.twilio.com:3478?transport=udp',
    username:
      '3afb2e83d870da93eaec2dc72bed51a80d3d2f5db271a1167ba1e47149b6acf3',
    credential: '9DnFMqHqcNhwMV6y6OWiwn9Up9t5T8t4UZyhzUFw6qA=',
    password: '9DnFMqHqcNhwMV6y6OWiwn9Up9t5T8t4UZyhzUFw6qA=',
  };
  return {
    iceServers: [STUN, TURN],
  };
};
/*export const WEB_RTC_CONFIGS = () => {
    const STUN = {
        urls: 'stun:stun.l.google.com:19302'
    };
    const TURN = {
        urls: 'turn:numb.viagenie.ca',
        username: 'ali@miletap.com',
        credential: '88o2fT5mt5zQ',
        password1: '88o2fT5mt5zQ'
    };
    return {
        iceServers: [STUN, TURN]
    };
};*/

//-------------------- functions -------------------

// routing from Snackbar and notification tray
export function onRouteChange(notification) {
  const types = STRINGS.TYPES.NOTIFICATIONS_ROUTING_TYPE;

  if (types.FEED_DETAIL.includes(notification.post_type))
    window.location = `${STRINGS.ROUTES.NEWSFEED.DETAILS}/${notification.ref_id}`;
  else if (types.TASK_DETAIL.includes(notification.post_type))
    window.location = `${STRINGS.ROUTES.TASKS}/${notification.ref_id}`;
  else if (types.EXPENSE_DETAIL.includes(notification.post_type))
    window.location = `${STRINGS.ROUTES.EXPENSES}/${notification.ref_id}`;
  else if (types.SCHEDULE_DETAIL.includes(notification.post_type))
    window.location = `${STRINGS.ROUTES.SCHEDULES}/1/${notification.ref_id}?f=td`;
  else if (types.TRAVEL_DETAILS.includes(notification.post_type))
    window.location = `${STRINGS.ROUTES.TRAVEL.DEFAULT}/${notification.ref_id}`;
  else if (types.PROJECT_BUDGET_DETAIL.includes(notification.post_type))
    window.location = `${STRINGS.ROUTES.PROJECT.BUDGETS}/${notification.parent_ref_id}`;
  else if (types.DOCUMENT_DETAIL.includes(notification.post_type))
    window.location = `${STRINGS.ROUTES.DOCUMENTS.DEFAULT}?f=app`;
}

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
          fill={`${props.props !== undefined ? props.props : '#fff'}`}
        />
        <circle
          cx="12.19"
          cy="7.86"
          r="3.7"
          fill={`${props.props !== undefined ? props.props : '#fffbf2'}`}
        />
        <circle
          cx="5.02"
          cy="17.68"
          r="3.4"
          fill={`${props.props !== undefined ? props.props : '#fef7e4'}`}
        />
        <circle
          cx="5.02"
          cy="30.32"
          r="3.1"
          fill={`${props.props !== undefined ? props.props : '#fef3d7'}`}
        />
        <circle
          cx="12.19"
          cy="40.14"
          r="2.8"
          fill={`${props.props !== undefined ? props.props : '#feefc9'}`}
        />
        <circle
          cx="24"
          cy="44"
          r="2.5"
          fill={`${props.props !== undefined ? props.props : '#feebbc'}`}
        />
        <circle
          cx="35.81"
          cy="40.14"
          r="2.2"
          fill={`${props.props !== undefined ? props.props : '#fde7af'}`}
        />
        <circle
          cx="42.98"
          cy="30.32"
          r="1.9"
          fill={`${props.props !== undefined ? props.props : '#fde3a1'}`}
        />
        <circle
          cx="42.98"
          cy="17.68"
          r="1.6"
          fill={`${props.props !== undefined ? props.props : '#fddf94'}`}
        />
        <circle
          cx="35.81"
          cy="7.86"
          r="1.3"
          fill={`${props.props !== undefined ? props.props : '#fcdb86'}`}
        />
      </svg>
    </span>
  );
}

export const createScreenSharePeerId = (peerId) => {
  return `${peerId}_${STRINGS.TYPES.CALL.SCREEN_SHARE_POSTFIX}`;
};

export const resolvePeerId = (peerId) => {
  return peerId.includes(STRINGS.TYPES.CALL.SCREEN_SHARE_POSTFIX)
    ? peerId.split('_')[0]
    : peerId;
};

export const resolveStream = (peerId, defaultStream, screenShareStream) => {
  return peerId.includes(STRINGS.TYPES.CALL.SCREEN_SHARE_POSTFIX)
    ? screenShareStream
    : defaultStream;
};

export const resolvePeerIdFromPayloadType = (
  peerId,
  defaultStream,
  screenShareStream
) => {
  return peerId.includes(STRINGS.TYPES.CALL.SCREEN_SHARE_POSTFIX)
    ? screenShareStream
    : defaultStream;
};

export const getPeerFlag = (peerId) => {
  return peerId.includes(STRINGS.TYPES.CALL.SCREEN_SHARE_POSTFIX)
    ? STRINGS.TYPES.CALL.PAYLOAD_TYPE.SCREEN_SHARE
    : STRINGS.TYPES.CALL.PAYLOAD_TYPE.DEFAULT;
};

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

export function setAutoHeightOfInput(element) {
  setTimeout(function() {
    element.css('height', '20px');
    element.css('padding', 0);
    element.css('-moz-box-sizing', 'content-box');
    element.css('height', `${element.prop('scrollHeight')}px`);
  }, 0);
}

export function getTypeOfFile(fileName) {
  const ext = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length);
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
  const valid = { status: true, message: '' };
  for (const key in files) {
    if (files.hasOwnProperty(key)) {
      const file = files[key];
      const ext = file.name.substr(
        file.name.lastIndexOf('.') + 1,
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
  const tabbableContainer = $('.tabbable-container');
  const tabbableContainerHeader = $('.cont-header');

  if ($(tabbableContainer.parent()[1]).hasClass('mm-tabs')) {
    const innerTabbableContainer = $(tabbableContainer[1]);
    const innerTabbableContainerContainerHeader = $(
      tabbableContainer[1]
    ).children('.cont-header');
    const innerTabbableContainerContainerBody = $(
      tabbableContainer[1]
    ).children('.cont-body');

    const innerTabbableContainerHeader = $(tabbableContainerHeader[1]);

    innerTabbableContainerContainerHeader.children('.ln').css('z-index', 0);
    innerTabbableContainerContainerBody.css({ 'margin-top': '0px' });
    innerTabbableContainerHeader.css({
      width: `${innerTabbableContainer.outerWidth()}px`,
      position: 'relative',
      'z-index': 0,
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

export function resizeRightMenu() {
  $(window).resize(function() {
    if (window.screen.width < 1240) {
      $('.right-menu-docs').css({ display: 'contents' });
      $('.right-menu-close').css({ display: 'none' });
      $('.file-actions').addClass('df-none');
    } else if (window.screen.width > 1240) {
      $('.file-actions').removeClass('right-file-action-change df-none');
      $('.right-menu-docs').css({ display: 'none' });
      $('.right-menu-close').css({ display: 'none' });
    }
  });
  if (window.screen.width > 1240) {
    $('.right-menu-docs').css({ display: 'none' });
    $('.right-menu-close').css({ display: 'none' });
    $('.file-actions').removeClass('right-file-action-change df-none');
  }
}

export function menuOpen() {
  $('.file-actions').addClass('right-file-action-change');
  $('.right-menu-docs').css('display', 'none');
  $('.right-menu-close').css('display', 'contents');
}

export function menuClose() {
  $('.file-actions').removeClass('right-file-action-change');
  $('.right-menu-close').css('display', 'none');
  $('.right-menu-docs').css('display', 'contents');
}

export function getUrlParameter(sParam) {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
}

export function getCommentLikesView(count, youLike) {
  if (youLike) {
    return (
      <div className="count">
        You {count > 1 ? `and ${count - 1} other` : ''}
      </div>
    );
  } else {
    return <div className="count">{count}</div>;
  }
}

// export function getUserDataFromStorage(key = STRINGS.STORAGE.user_type, defaultValue) {
//     console.log(store.getState())
//     // const user = JSON.parse(localStorage.getItem("userSlice"));
//     const tempuser = JSON.parse(localStorage.getItem("persist:root"));

//     let parsedData=JSON.parse(tempuser.userSlice)
//     let user =parsedData.user
//     console.log(parsedData,"TEMPUSER")

//     if (key === STRINGS.STORAGE.user) {
//         return user;
//     } else {
//         if (defaultValue === undefined) {
//             return user[key]
//         } else {
//             if (user[key] === undefined || user[key] === null || user[key].trim() === "") {
//                 return defaultValue
//             } else {
//                 return user[key]
//             }
//         }
//     }
// }
export function setAuthEnv(token, user) {
  console.log(
    'base chal rha he -----------------------------------------------------------'
  );
  console.log('dasfasdfs');
  localStorage.setItem(STRINGS.STORAGE.token, token);
  user.fullname = user.first_name + ' ' + user.last_name;
  localStorage.setItem(STRINGS.STORAGE.user, JSON.stringify(user));
  console.log(user);
  window.location = ROUTES.ROOT;
}

export function logout() {
  localStorage.clear();
  window.location = ROUTES.AUTH.SIGN_IN;
  console.log(
    'base chal rha he -----------------------------------------------------------'
  );
}

export function getNameForImage(name) {
  const split = name.split(' ');
  let firstName = '',
    lastName = '',
    symbol = '';
  if (split.length > 1) {
    firstName = split[0];
    lastName = split[1];
    symbol = `${firstName[0]}${lastName.length ? lastName[0] : ''}`;
  } else {
    symbol = split[0][0];
  }
  return symbol !== undefined ? symbol.toUpperCase() : 'EX';
}

export function setUpMentionsView(inp, selectedList, users, submit = null) {
  let _thisVal,
    currentFocus = 0,
    val = '',
    appendText = false,
    startPosition = 0;
  let mentionListView = $(
    `<div id="mentions_list" class="input-search-list"></div>`
  );

  const mentionListViewPosition = {
    bottom: 'unset',
    top: 'unset',
    left: 'unset',
  };
  let leftPositionOfMentionList = 0;

  inp.on('mouseup keydown', function(e) {
    if (e.key === '@') {
      appendText = true;
      startPosition = $(this).caret('pos') + 1;
      const position = $(this).caret('position');

      leftPositionOfMentionList = position.left;

      if (inp.offset().top + inp.outerHeight() + 22 >= $(window).height()) {
        mentionListViewPosition.top = 'unset';
        mentionListViewPosition.bottom = 22;
      } else {
        mentionListViewPosition.bottom = 'unset';
        mentionListViewPosition.top = !(
          position.top + 0 + position.height >
          220
        )
          ? position.top + 22
          : 220 + 18;
      }
    }
  });

  inp.on('input', function() {
    _thisVal = $(this).val();
    if (appendText) {
      if (
        _thisVal[startPosition - 1] === '@' &&
        _thisVal[startPosition] !== ' '
      ) {
        let endPosition = _thisVal.indexOf(' ', startPosition);
        endPosition = endPosition <= 0 ? _thisVal.length : endPosition;

        if (_thisVal[endPosition] !== ' ') {
          val = _thisVal.substring(startPosition, endPosition).trim();
          if ($.isEmptyObject(val)) {
            mentionListView.empty();
            mentionListView.removeClass('on');
          } else {
            inp.parent().append(mentionListView);
            mentionListView.empty();
            mentionListView.removeClass('on');
            if (users.length > 0) {
              mentionListView.addClass('on');
              let userFound = false;
              users.forEach((user) => {
                if (user.name.toLowerCase().includes(val.toLowerCase())) {
                  userItem(user);
                  userFound = true;
                }
              });
              if (
                leftPositionOfMentionList +
                  inp.offset().left +
                  mentionListView.outerWidth() >=
                $(window).width()
              ) {
                mentionListViewPosition.left =
                  leftPositionOfMentionList - mentionListView.outerWidth() + 15;
              } else {
                mentionListViewPosition.left = leftPositionOfMentionList;
              }
              mentionListView.css(mentionListViewPosition);

              if (userFound) {
                $('.search-item:nth-child(1)').addClass('on');
                currentFocus = 0;
              } else {
                mentionListView.removeClass('on');
              }
            } else {
              mentionListView.empty();
              mentionListView.removeClass('on');
            }
          }
        } else removeMentionsList();
      } else removeMentionsList();
    }
  });

  inp.on('keydown', function(e) {
    let x = document.getElementById('mentions_list');
    if ($.isEmptyObject($(x).html())) {
      if (e.keyCode === 13 && submit !== null) {
        submit.submit();
        e.preventDefault();
      }
      return;
    }
    if (x) x = x.getElementsByClassName('search-item');
    if (e.keyCode === 40) {
      currentFocus++;
      addActive(x);
      e.preventDefault();
    } else if (e.keyCode === 38) {
      //up
      currentFocus--;
      addActive(x);
      e.preventDefault();
    } else if (e.keyCode === 13) {
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
      e.preventDefault();
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add('on');
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('on');
    }
  }

  function removeMentionsList() {
    appendText = false;
    mentionListView.empty();
    mentionListView.removeClass('on');
    mentionListView.remove();
  }

  function userItem(user) {
    const contact = $(`<div class="search-item">
                                                    <div class="img"
                                                        ${
                                                          !$.isEmptyObject(
                                                            user.profile_picture
                                                          )
                                                            ? `style="background-image: url(${user.profile_picture}); background-repeat: no-repeat; background-size: 100%;"`
                                                            : ''
                                                        }
                                                     >${
                                                       $.isEmptyObject(
                                                         user.profile_picture
                                                       )
                                                         ? getNameForImage(
                                                             user.name
                                                           )
                                                         : ''
                                                     }</div>
                                                    <div class="pr">
                                                        <div class="n">${
                                                          user.name
                                                        }</div>
                                                        ${
                                                          !$.isEmptyObject(
                                                            user.designation
                                                          )
                                                            ? `<div class="p">${user.designation}</div>`
                                                            : ''
                                                        }
                                                    </div>
                                                </div>`);
    mentionListView.append(contact);

    contact.on('click', () => {
      _thisVal = _thisVal.replace(new RegExp(`@${val}`, 'g'), `${user.name} `);
      inp.val(_thisVal);
      if (user.id !== undefined) {
        selectedList.push({ username: user.name, user_id: user.id });
      } else {
        selectedList.push({
          username: user.name,
          user_id: user.user_id,
        });
      }
      inp.focus();
      removeMentionsList();
    });
  }
}

/*---------------- Time functions -----------------*/
export function parseUrlsInText(text) {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  return text.replace(urlRegex, function(url) {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
}

export function parseDateAndTime(st = Date.now(), type = 'short') {
  const date = new Date(parseInt(st));
  const options = {
    weekday: type,
    year: 'numeric',
    month: type,
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export function getRelativeTime(d, t = 'short') {
  const parseDate = parseDateAndTime(d, t);
  const difference = moment(parseDate).diff(new Date(), 'days');
  return Math.abs(difference) > 7 ? parseDate : moment(parseDate).fromNow();
}

// export function parseDateAndTimeISO(st, type = "short") {
//     //2017-12-19 23:30:00
//     let time = parseTimeWithoutDate(st);
//
//     console.log()
//     //console.log(date.getTime())
// }

export function parseDateWithoutTime(st, type = 'short') {
  const date = new Date(parseInt(st));
  const options = {
    weekday: type,
    year: 'numeric',
    month: type,
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export function parseDateWithMontAndYear(st, type = 'short') {
  const date = new Date(parseInt(st));
  const options = {
    year: 'numeric',
    month: type,
  };
  return date.toLocaleDateString('en-US', options);
}

export function parseDateWithDateMontAndYear(st, type = 'short') {
  const date = new Date(parseInt(st));
  const options = {
    year: 'numeric',
    month: type,
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export function parseDateWithDateAndMonth(st, type = 'short') {
  const date = new Date(parseInt(st));
  const options = {
    day: 'numeric',
    month: type,
  };
  return date.toLocaleDateString('en-US', options);
}

export function parseDateTimeIntoLocalDateTime(st) {
  const date = new Date(parseInt(st));
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return {
    date: date.getDate(),
    month: monthNames[date.getMonth()],
    year: date.getFullYear(),
    time: formatAMPM(date),
    dateAsLocalString: date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }),
  };
}

export function parseTimeWithoutDate(st) {
  const date = new Date(parseInt(st));
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return date.toLocaleTimeString('en-US', options);
}

export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

export function SECONDS_TO_HMS(s) {
  var h = Math.floor(s / 3600); //Get whole hours
  s -= h * 3600;
  var m = Math.floor(s / 60); //Get remaining minutes
  s -= m * 60;
  return (
    (h < 10 ? '0' + h : h) +
    ':' +
    (m < 10 ? '0' + m : m) +
    ':' +
    (s < 10 ? '0' + s : s)
  ); //zero padding on minutes and seconds
}

export function MINUTES_TO_HMS(min) {
  var s = min * 60;
  var h = Math.floor(s / 3600); //Get whole hours
  s -= h * 3600;
  var m = Math.floor(s / 60); //Get remaining minutes
  s -= m * 60;
  return (
    (h < 10 ? '0' + h : h) +
    ':' +
    (m < 10 ? '0' + m : m) +
    ':' +
    (s < 10 ? '0' + s : s)
  ); //zero padding on minutes and seconds
}

export function GET_SECONDS(x) {
  var hms = x; // your input string
  var a = hms.split(':'); // split it at the colons
  if (a.length < 3) a[2] = '00';
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  return seconds;
}

/*export function parseTimeWithoutDate(st) {
    const date = new Date(parseInt(st));
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    };
    return date.toLocaleTimeString("en-US", options);
}*/

/*export function parseDateWithDDMMYYYYFormat(st) {
    console.log(st)
    const date = new Date(parseInt(st));
    console.log(date)
    return  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}*/

export function parseDate(d) {
  const date = new Date(d);
  // date.setTime(Date.parse(date.toString()) - Math.abs(date.getTimezoneOffset() * 60000));
  return Date.parse(date.toString());
}

export function calcDiffInDates(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diffTime = Math.abs(date1 - date2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

export function parseDateToUnix(d) {
  const date = new Date(d);
  return Date.parse(date.toString());
}

export function getApprovalObject({ id, email }) {
  let obj = {
    approver_id: id !== STRINGS.DEFAULTS.guid ? id : STRINGS.DEFAULTS.guid,
    approverType: id !== STRINGS.DEFAULTS.guid ? 1 : 0,
    email: id !== STRINGS.DEFAULTS.guid ? '' : email,
  };
  return obj;
}

/*---------------- Time functions -----------------*/
export const calculateAverage = (arr) =>
  arr.reduce((a, b) => a + b, 0) / arr.length;

export const compare_dates = (date1, date2) =>
  date1 > date2 ? 2 : date1 < date2 ? 0 : 1;

export function _getTree(data) {
  let array = [];
  data.forEach((x) => {
    //x.children=Childrens(data,x.id);
    array.push({
      value: x.id,
      label: x.name,
      //'children':x.children
    });
  });
  // function  Childrens(data,id){
  //     let children=[];
  //     data.forEach(y=>{
  //         if(y.pid===id){
  //             if(y.children.length>0)
  //                 y.children=Childrens(data,y.id);
  //             children.push({
  //                 'value':y.id,
  //                 'label':y.name,
  //                 'children':y.children
  //             })
  //         }
  //     })
  //     return children;
  // }
  return array;
}

export function sumArrayValues(input) {
  if (toString.call(input) !== '[object Array]') return false;

  let total = 0;
  for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i])) {
      continue;
    }
    total += Number(input[i]);
  }
  return total;
}

export function createGuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-4' +
    S4().substr(0, 3) +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
}

export function setNotificationOnBrowserTab(counter) {
  const webTitle = 'Konnect';
  const titleWithCounter =
    counter !== 0 ? `${webTitle} (${counter})` : webTitle;
  document.title = titleWithCounter;
}

export const SOCKET_CHAT_IN_TYPES = { CONVERSATION_CHANGE: 1 };

/*---------------- Css Indexing functions -----------------*/
/*export function handleIndexingOnPopUp(){
    $('.tabbable-container > .cont-header').css({zIndex:'1'});
    $('.voters-box').css({zIndex:'inherit'});
}

export function handleIndexingOnPopUpClose(){
    $('.section').css({'overflow':'','overflow-y':''});
        $('.voters-box').css({zIndex:'1'});
        $('.tabbable-container > .cont-header').css({zIndex:'2'});
}*/
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
    typeof data === 'object' &&
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
  const mentionsFoundInTitle = [];
  mentions.forEach(({ key, value }) => {
    const regex = `@${value}`;
    if (!titleWithMentions.includes(regex)) return false;

    const regexExpression = new RegExp(regex, 'g');
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
    // console.log(mentions);
    const titleArr = title.split(' ');
    return titleArr
      .map((item) => {
        const mention = mentions.filter((member) => member.memberId == item);
        // console.log("mention", mention);
        if (mention.length > 0) {
          return `<a href=${mention[0]?.member?.id}>${mention[0]?.member?.name}</a>`;
          // return mention;
        } else {
          return item;
        }
      })
      .join(' ');
  } else {
    return title;
  }
}

// This function will convert single string into array

export function modifySelectData(data) {
  if (typeof data === 'string') {
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
