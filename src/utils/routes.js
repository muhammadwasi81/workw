export let DOMAIN_PREFIX = "";
DOMAIN_PREFIX = process.env.NODE_ENV !== "development" ? "/konnect" : "";

export const ROUTES = {
  SEARCH: {
    DEFAULT: `${DOMAIN_PREFIX}/search`,
  },
  MESSENGER: {
    DEFAULT: `${DOMAIN_PREFIX}/messenger`,
    CHAT: `${DOMAIN_PREFIX}/messenger/chat`,
  },
  CUSTOM_APPROVALS: {
    DEFAULT: `${DOMAIN_PREFIX}/customApprovals`,
  },
  APPROVALS: {
    DEFAULT: `${DOMAIN_PREFIX}/approvals`,
  },
  AUTH: {
    SIGN_UP: `${DOMAIN_PREFIX}/register`,
    SIGN_UP_SUCCESS: `${DOMAIN_PREFIX}/thankyou`,
    SIGN_IN: `${DOMAIN_PREFIX}/login`,
    INDIVIDUAL_SIGN_IN: `${DOMAIN_PREFIX}/individualSignIn`,
    PAYMENT: `${DOMAIN_PREFIX}/AddPaymentCard`,
    EXTERNAL_SIGN_UP: `${DOMAIN_PREFIX}/externalSignup`,
    SIGN_IN_ANONYMOUSLY: `${DOMAIN_PREFIX}/authenticating`,
    FORGOT_PASSWORD_LANDING: `${DOMAIN_PREFIX}/resetpassword`,
    FORGOT_PASSWORD: `${DOMAIN_PREFIX}/forgotpassword`,
    VERIFICATION_SUCCESS: `${DOMAIN_PREFIX}/verified`,
    VERIFICATION_INPROCESS: `${DOMAIN_PREFIX}/verify`,
  },
  BUDGET: {
    DEFAULT: `${DOMAIN_PREFIX}/budgets`,
  },
  ROOT: `${DOMAIN_PREFIX}/`,
  HOME: `${DOMAIN_PREFIX}`,
  NEWSFEED: {
    DETAILS: `${DOMAIN_PREFIX}/newsFeedDetails/:id`,
  },
  BUSINESS_POLICY: {
    DEFAULT: `${DOMAIN_PREFIX}/businessPolicy`,
  },
  FORMS: {
    FORMS: `${DOMAIN_PREFIX}/forms/*`,
    ROOT: `${DOMAIN_PREFIX}/forms`,
  },
  JOB_OPENING: `${DOMAIN_PREFIX}/jobopeningletter`,
  OFFER_LETTER: `${DOMAIN_PREFIX}/OfferLetter`,
  DOCUMENT_APPROVAL: `${DOMAIN_PREFIX}/DocumentApproval`,
  SCHEDULE_REMARKS: `${DOMAIN_PREFIX}/ScheduleRemark`,
  PRE_EMPLOYMENT: `${DOMAIN_PREFIX}/EmploymentForm`,
  GROUP: {
    DEFAULT: `${DOMAIN_PREFIX}/groups`,
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
  // DOCUMENTS: {
  // 	DEFAULT: `${DOMAIN_PREFIX}/documents`,
  // 	ITEM: `${DOMAIN_PREFIX}/documents`,
  // 	EDITOR: `${DOMAIN_PREFIX}/documents/editor`,
  // },
  TODO: {
    DEFAULT: `${DOMAIN_PREFIX}/workboard`,
    TODO_BOARD: `${DOMAIN_PREFIX}/workboard/board`,
    MY_TODO: `${DOMAIN_PREFIX}/workboard/assignToMe`,
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
  TASKS: `${DOMAIN_PREFIX}/tasks`,
  PROMOTION: `${DOMAIN_PREFIX}/promotions`,
  EXPENSES: `${DOMAIN_PREFIX}/expenses`,

  PAYROLL: {
    DEFAULT: `${DOMAIN_PREFIX}/payroll`,
    PAYROLL_DETAILS: `${DOMAIN_PREFIX}/payroll/details`,
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
    SETTINGS: `${DOMAIN_PREFIX}/user/settings`,
    NOTES: `${DOMAIN_PREFIX}/user/notes`,
  },
  CALL: {
    DEFAULT: `${DOMAIN_PREFIX}/call`,
    AUDIO: `${DOMAIN_PREFIX}/call/audiocall`,
    VIDEO: `${DOMAIN_PREFIX}/call/audiocall`,
    JOIN: `${DOMAIN_PREFIX}/call/joincall`,
    KONNECT_CALL: `${DOMAIN_PREFIX}/konnectcall`,
  },
  // HR: {
  // 	CHART: `${DOMAIN_PREFIX}/hr/chart`,
  // 	LEAVES: `${DOMAIN_PREFIX}/hr/leaves`,
  // 	SALARY: `${DOMAIN_PREFIX}/hr/salary/`,
  // 	ALLOWANCE: `${DOMAIN_PREFIX}/hr/allowance/`,
  // 	TAXRECEIPTS: `${DOMAIN_PREFIX}/hr/taxreceipts/`,
  // 	COMPANIES: {
  // 		DEFAULT: `${DOMAIN_PREFIX}/hr/companies`,
  // 		RIGHTS_REQUEST: `${DOMAIN_PREFIX}/hr/companies/request_rights`,
  // 		DASHBOARD: `${DOMAIN_PREFIX}/hr/companies/dashboard`,
  // 		ADD: `${DOMAIN_PREFIX}/hr/companies/add`,
  // 		UPDATE: `${DOMAIN_PREFIX}/hr/companies/update`,
  // 		DETAILS: `${DOMAIN_PREFIX}/hr/companies/details`,
  // 		BUSINESS_RIGHTS: `${DOMAIN_PREFIX}/hr/companies/rights`,
  // 		EMAIL_CONFIG: `${DOMAIN_PREFIX}/hr/companies/emailConfig`,
  // 		EMAIL_SEND: `${DOMAIN_PREFIX}/hr/companies/emailSend`,
  // 		INDIVIDUAL_DASHBOARD: `${DOMAIN_PREFIX}/hr/companies/individualDashboard`,
  // 	},
  // 	EMPLOYEES_ADD: `${DOMAIN_PREFIX}/hr/employees/add`,
  // 	DEPARTMENTS: `${DOMAIN_PREFIX}/hr/departments`,
  // 	SUBDEPARTMENT: `${DOMAIN_PREFIX}/hr/departments/list`,
  // 	DETAILDEPARTMENTS: `${DOMAIN_PREFIX}/hr/departments/details`,
  // 	DEFAULTDEPARTMENT: `${DOMAIN_PREFIX}/hr/department/view`,
  // 	OFFICE_TIMINGS: `${DOMAIN_PREFIX}/hr/officetimings/`,
  // 	OFFICE_TIMINGS_DEFAULT: `${DOMAIN_PREFIX}/hr/officetimings/timings`,
  // 	OFFICE_TIMINGS_EMPLOYEES: `${DOMAIN_PREFIX}/hr/officetimings/employees`,
  // 	HOLIDAYS: `${DOMAIN_PREFIX}/hr/holidays/`,
  // 	LEVELS: `${DOMAIN_PREFIX}/hr/addlevels`,
  // 	APPROVALS_FLOW: {
  // 		DEFAULT: `${DOMAIN_PREFIX}/hr/approvalflow`,
  // 	},
  // 	APPRAISALS: {
  // 		DEFAULT: `${DOMAIN_PREFIX}/appraisals`,
  // 	},
  // 	RESIGNATIONS: {
  // 		DEFAULT: `${DOMAIN_PREFIX}/resignations/`,
  // 	},
  // 	WARNINGS: {
  // 		DEFAULT: `${DOMAIN_PREFIX}/warnings`,
  // 		APPROVALS: `${DOMAIN_PREFIX}/warnings/approvals`,
  // 	},
  // 	COMPLAINS: {
  // 		DEFAULT: `${DOMAIN_PREFIX}/complains`,
  // 		APPROVALS: `${DOMAIN_PREFIX}/complains/approvals`,
  // 	},
  // 	BONUS: {
  // 		DEFAULT: `${DOMAIN_PREFIX}/bonus`,
  // 	},
  // },
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
  TASK: {
    DEFAULT: `${DOMAIN_PREFIX}/tasks`,
    DETAIL: `${DOMAIN_PREFIX}/tasks/taskDetail`,
  },
  LEAD_MANAGER: {
    DEFAULT: `${DOMAIN_PREFIX}/leadmanager`,
  },
  REWARDS: {
    DEFAULT: `${DOMAIN_PREFIX}/rewards/*`,
    REWARD: `${DOMAIN_PREFIX}/rewards/`,
    APPROVALS: `${DOMAIN_PREFIX}/rewards/approvals`,
  },
  COMPLAINS: {
    DEFAULT: `${DOMAIN_PREFIX}/complains/*`,
    COMPLAIN: `${DOMAIN_PREFIX}/complains/`,
    APPROVALS: `complains/approvals`,
  },
  WARNINGS: {
    DEFAULT: `${DOMAIN_PREFIX}/warnings/*`,
    WARNING: `${DOMAIN_PREFIX}/warnings/`,
    APPROVALS: `warnings/approvals`,
  },
  EXPENSES: {
    DEFAULT: `${DOMAIN_PREFIX}/expenses/*`,
    EXPENSES: `${DOMAIN_PREFIX}/expenses`,
  },
  LEAVES: {
    DEFAULT: `${DOMAIN_PREFIX}/leaves/*`,
    LEAVE: `${DOMAIN_PREFIX}/leaves/`,
    APPROVALS: `leaves/approvals`,
  },
  EMPLOYEES: {
    DEFAULT: `${DOMAIN_PREFIX}/employees/*`,
    EMPLOYEELINK: `${DOMAIN_PREFIX}/employees`,
    ADD: `add`,
    BASIC_INFO: `${DOMAIN_PREFIX}/employees/info`,
    JOB_BY_ID: `${DOMAIN_PREFIX}/employees/job`,
    EMAIL_CONFIG: `${DOMAIN_PREFIX}/employees/emailconfig`,
    EDUCATION: `${DOMAIN_PREFIX}/employees/education`,
    EXPERIENCE: `${DOMAIN_PREFIX}/employees/experience`,
    PACKAGE: `${DOMAIN_PREFIX}/employees/package`,
    LINKAGE: `${DOMAIN_PREFIX}/employees/linkage`,
    USER_RIGHTS: `${DOMAIN_PREFIX}/employees/rights`,
    ACTIVITY_LOGS: `${DOMAIN_PREFIX}/employees/activityLogs`,
    SALARY: `${DOMAIN_PREFIX}/employees/salary`,
    APPRAISAL: `${DOMAIN_PREFIX}/employees/appraisal`,
    OFFICE_TIMINGS: `${DOMAIN_PREFIX}/employees/officeTimings`,
    OFFICETIME: `${DOMAIN_PREFIX}/employees/officetime`,
    EMPLOYEE_TIME: `${DOMAIN_PREFIX}/employees/employee_time`,
    EMAIL_SEND: `${DOMAIN_PREFIX}/employees/EmailSend`,
    ALLOWANCES: `${DOMAIN_PREFIX}/employees/allowances`,
    BANK_DETAILS: `${DOMAIN_PREFIX}/employees/bankDetails`,
  },
  ADMINISTRATOR: {
    DEFAULT: `${DOMAIN_PREFIX}/administrator/*`,
    ADMINISTRATION: `${DOMAIN_PREFIX}/administrator/`,
    BUSINESS_POLICY: `businessPolicy`,
    ACCESSROLES: `${DOMAIN_PREFIX}/konnect/accessroles`,
    GRADE: `grade`,
    DESIGNATION: `designation`,
    APPRASIAL: `appraisal`,
    TIMEZONE: `timezone`,
    OFFICETIMING: `officetimings`,
    OFFICETIME: `officetimings/officetime`,
    CURRENCY: `currency`,
    EMPLOYEE_TIME: `officetimings/employee_time`,
    JOB_SKILLS: `job_skills`,
    LEAVE_TYPES: `leaveType`,
    USER_TYPES: `userTypes`,
    EXPENSE_HEADERS: `expenseHeaders`,
    SALARY_HEADERS: `salaryHeaders`,
    EMAIL_CONFIG: `emailConfig`,
    REQUEST_FOR_RIGHTS: `rights`,
    CUSTOM_APPROVALS: `customApprovals`,
    CUSTOM_APPROVAL_CATEGORY: `customApprovalCategory`,
    DEFAULT_APPROVALS: `defaultApprovals`,
    ALLOWANCES: `allowances`,
    REWARD_CATEGORY: `rewardCategory`,
    WARNING_CATEGORY: `warningCategory`,
  },
  LOAN: {
    DEFAULT: `${DOMAIN_PREFIX}/loan/*`,
    LOAN: `${DOMAIN_PREFIX}/loan`,
    APPROVALS: `${DOMAIN_PREFIX}/loan/approvals`,
  },
  RESIGNATION: {
    DEFAULT: `${DOMAIN_PREFIX}/resignation/*`,
    RESIGNATION: `${DOMAIN_PREFIX}/resignation`,
    APPROVALS: `${DOMAIN_PREFIX}/loan/approvals`,
  },
  REQUISITION: {
    DEFAULT: `${DOMAIN_PREFIX}/requisition/*`,
    REQUISITION: `${DOMAIN_PREFIX}/requisition`,
    APPROVALS: `${DOMAIN_PREFIX}/loan/approvals`,
  },

  TRAVELS: `${DOMAIN_PREFIX}/travel`,
  TRAVEL: {
    DEFAULT: `${DOMAIN_PREFIX}/travel`,
    TREAVELDETAIL: `${DOMAIN_PREFIX}/travel/travel-detail/`,
    DETAIL: `${DOMAIN_PREFIX}/travel/travel-detail/:travelId`,
    CITIES: `${DOMAIN_PREFIX}/travel/cities`,
    APPROVALS: `${DOMAIN_PREFIX}/travel/approvals`,
    EXPENSES: `${DOMAIN_PREFIX}/travel/expenses`,
    AGENT: `${DOMAIN_PREFIX}/travel/agent`,
  },

  DOCUMENTS: {
    DEFAULT: `${DOMAIN_PREFIX}/documents/*`,
    DOCUMENT: `${DOMAIN_PREFIX}/documents`,
  },
  FINANCE: {
    CHART_OF_ACCOUNT: {
      DEFAULT: `${DOMAIN_PREFIX}/chart-of-account/*`,
      ROOT: `${DOMAIN_PREFIX}/chart-of-account`,
    },
    VOUCHER: {
      DEFAULT: `${DOMAIN_PREFIX}/voucher/*`,
      ROOT: `${DOMAIN_PREFIX}/voucher`,
    },
  },

  HR: {
    CHART: `${DOMAIN_PREFIX}/hr/chart`,
    LEAVES: `${DOMAIN_PREFIX}/hr/leaves`,
    SALARY: `${DOMAIN_PREFIX}/hr/salary/`,
    ALLOWANCE: `${DOMAIN_PREFIX}/hr/allowance/`,
    TAXRECEIPTS: `${DOMAIN_PREFIX}/hr/taxreceipts/`,
    CAREER: {
      DEFAULT: `${DOMAIN_PREFIX}/hr/careers`,
      JOB_BY_ID: `${DOMAIN_PREFIX}/hr/careers/job`,
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
    RESIGNATIONS: {
      DEFAULT: `${DOMAIN_PREFIX}/resignations/*`,
    },
    WARNINGS: {
      DEFAULT: `${DOMAIN_PREFIX}/warnings`,
      APPROVALS: `${DOMAIN_PREFIX}/warnings/approvals`,
    },
    CUSTOM_APPROVALS: {
      DEFAULT: `${DOMAIN_PREFIX}/customApprovals`,
      APPROVALS: `${DOMAIN_PREFIX}/warnings/approvals`,
    },
    COMPLAINS: {
      DEFAULT: `${DOMAIN_PREFIX}/complains`,
      APPROVALS: `${DOMAIN_PREFIX}/complains/approvals`,
    },
    BONUS: {
      DEFAULT: `${DOMAIN_PREFIX}/bonus`,
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

  TASK: {
    DEFAULT: `${DOMAIN_PREFIX}/tasks/*`,
    ROOT: `${DOMAIN_PREFIX}/tasks`,
    DETAIL: `tasks/taskDetail/:id`,
  },

  REWARDS: {
    DEFAULT: `${DOMAIN_PREFIX}/rewards`,
    REWARD: `${DOMAIN_PREFIX}/rewards`,
    APPROVALS: `${DOMAIN_PREFIX}/rewards/approvals`,
  },
  COMPLAINS: {
    DEFAULT: `${DOMAIN_PREFIX}/complains`,
    COMPLAIN: `${DOMAIN_PREFIX}/complains`,
    APPROVALS: `complains/approvals`,
  },
  WARNINGS: {
    DEFAULT: `${DOMAIN_PREFIX}/warnings`,
    WARNING: `${DOMAIN_PREFIX}/warnings`,
    APPROVALS: `warnings/approvals`,
  },
  LEAVES: {
    DEFAULT: `${DOMAIN_PREFIX}/leaves`,
    LEAVE: `${DOMAIN_PREFIX}/leaves`,
    APPROVALS: `leaves/approvals`,
  },
  DEPARTMENTS: {
    DEFAULT: `${DOMAIN_PREFIX}/departments`,
    DEPARTMENT: `${DOMAIN_PREFIX}/departments`,
    APPROVALS: `departments/approvals`,
  },
  CAREER: {
    DEFAULT: `${DOMAIN_PREFIX}/careers/*`,
    JOB_DETAIL: `${DOMAIN_PREFIX}/jobdetail`,
    CAREERLINK: `${DOMAIN_PREFIX}/careers`,
  },

  WORKBOARD: {
    DEFAULT: `${DOMAIN_PREFIX}/workboard`,
    DASHBOARD: `${DOMAIN_PREFIX}/workboard/dashboard`,
    LIST: `${DOMAIN_PREFIX}/workboard/list`,
    BOARD: `${DOMAIN_PREFIX}/workboard/board/`,
    TODO_BOARD: `${DOMAIN_PREFIX}/workboard/board/:id`,
    MY_TODO: `${DOMAIN_PREFIX}/workboard/assignToMe`,
  },

  BONUS: {
    DEFAULT: `${DOMAIN_PREFIX}/bonus`,
  },
};
