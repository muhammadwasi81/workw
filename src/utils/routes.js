export let DOMAIN_PREFIX = "";
DOMAIN_PREFIX = process.env.NODE_ENV !== "development" ? "/konnect" : "";

export const ROUTES = {
  SEARCH: {
    DEFAULT: `${DOMAIN_PREFIX}/search`,
  },
  //sanjna
  SETTINGS: {
    DEFAULT: `${DOMAIN_PREFIX}/settings/*`,
    SETTING: `${DOMAIN_PREFIX}/settings/`,
    CHANGE_PASSWORD: `changePassword`,
    BASIC_INFORMATION: `basicInformation`,
  },
  MESSENGER: {
    DEFAULT: `${DOMAIN_PREFIX}/messenger`,
    CHAT: `${DOMAIN_PREFIX}/messenger/chat`,
  },
  CUSTOM_APPROVALS: {
    DEFAULT: `${DOMAIN_PREFIX}/customApprovals/*`,
    ROOT: `${DOMAIN_PREFIX}/customApprovals`,
    DETAIL: `/detail`,
  },
  APPROVALS: {
    DEFAULT: `${DOMAIN_PREFIX}/approvals`,
    MY_APPROVALS: `${DOMAIN_PREFIX}/approvals/myApprovals`,
  },
  MY_APPROVALS: {
    DEFAULT: `${DOMAIN_PREFIX}/myApprovals`,
  },
  USER: {
    LINK: `${DOMAIN_PREFIX}/user/`,
    DEFAULT: `${DOMAIN_PREFIX}/user/`,
    TIMELINE: {
      DEFAULT: `${DOMAIN_PREFIX}/user/timeline/post`,
      INFORMATION: `${DOMAIN_PREFIX}/user/timeline/information`,
    },
    SETTINGS: `${DOMAIN_PREFIX}/user/settings`,
    NOTES: `${DOMAIN_PREFIX}/user/notes`,
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
    LINK: `${DOMAIN_PREFIX}/newsFeedDetails/`,
  },
  BUSINESS_POLICY: {
    DEFAULT: `${DOMAIN_PREFIX}/businessPolicy`,
  },
  FORMS: {
    DEFAULT: `${DOMAIN_PREFIX}/forms/*`,
    ROOT: `${DOMAIN_PREFIX}/forms`,
    SUBMIT_FORM: `${DOMAIN_PREFIX}/submitForm`,
    EDIT_FORM: `${DOMAIN_PREFIX}/editForm`,
    CREATE_FORM: `create`,
    RESPONSE_DETAIL_FORM: "detail",
    RESPONSE: "response",
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
    DETAIL: `${DOMAIN_PREFIX}/groups/group-detail`,
  },
  ELearning: {
    LINK: `${DOMAIN_PREFIX}/eLearning`,
    DEFAULT: `${DOMAIN_PREFIX}/eLearning/*`,
    // COURSE: `${DOMAIN_PREFIX}/eLearning/courses/`,
  },
  INVENTORY: {
    DEFAULT: `${DOMAIN_PREFIX}/inventory`,
  },
  ATTENDANCE: {
    DEFAULT: `${DOMAIN_PREFIX}/attendance`,
    USER_ATTENDANCE: `${DOMAIN_PREFIX}/attendance/user_attendance`,
  },
  ASSETS: {
    DEFAULT: `${DOMAIN_PREFIX}/assets/*`,
    ROOT: `${DOMAIN_PREFIX}/assets`,
    ASSETS: `${DOMAIN_PREFIX}/assets`,
    DETAIL: `/detail`,
  },
  ASSETS_TABLE_LIST: {
    DEFAULT: `${DOMAIN_PREFIX}/assetsList`,
  },
  CREATE_ASSETS: {
    DEFAULT: `${DOMAIN_PREFIX}/createAssets`,
  },
  REQUEST_LIST_ITEM: {
    DEFAULT: `${DOMAIN_PREFIX}/listItems`,
  },
  QUOTATION: {
    DEFAULT: `${DOMAIN_PREFIX}/quotation/*`,
    ROOT: `${DOMAIN_PREFIX}/quotation`,
    CREATE: `${DOMAIN_PREFIX}/create`,
  },
  QUOTATIONCLIENT: {
    DEFAULT: `${DOMAIN_PREFIX}/quotationClient/*`,
    ROOT: `${DOMAIN_PREFIX}/quotationClient`,
    CREATE: `${DOMAIN_PREFIX}/create`,
  },
  PROJECT: {
    DEFAULT: `${DOMAIN_PREFIX}/projects`,
    // DETAIL: `project-detail`,
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
  TODO: {
    DEFAULT: `${DOMAIN_PREFIX}/workboard`,
    TODO_BOARD: `${DOMAIN_PREFIX}/workboard/board`,
    MY_TODO: `${DOMAIN_PREFIX}/workboard/assignToMe`,
  },

  LEAD_MANAGER: {
    DEFAULT: `${DOMAIN_PREFIX}/leadManager`,
    LEAD_GROUP: `${DOMAIN_PREFIX}/leadManager/leadManagerGroup`,
    LEAD_GROUP_DETAIL: `${DOMAIN_PREFIX}/leadManager/leadManagerGroupDetails/`,
    LEAD_DETAIL: `${DOMAIN_PREFIX}/leadManager/leadManagerGroupDetails/:id`,
  },
  SCHEDULES: {
    LINK: `${DOMAIN_PREFIX}/schedules`,
    DEFAULT: `${DOMAIN_PREFIX}/schedules/*`,
  },
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
    DEFAULT: `${DOMAIN_PREFIX}/approvals`,
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

  CALL: {
    DEFAULT: `${DOMAIN_PREFIX}/call`,
    AUDIO: `${DOMAIN_PREFIX}/call/audiocall`,
    VIDEO: `${DOMAIN_PREFIX}/call/audiocall`,
    JOIN: `${DOMAIN_PREFIX}/call/joincall`,
    KONNECT_CALL: `${DOMAIN_PREFIX}/konnectcall`,
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
  //by sanjna
  TASK: {
    DEFAULT: `${DOMAIN_PREFIX}/tasks/*`,
    ROOT: `${DOMAIN_PREFIX}/tasks`,
    DETAIL: `/detail`,
    // DETAIL: `${DOMAIN_PREFIX}/tasks/taskDetail`,
  },

  REWARDS: {
    DEFAULT: `${DOMAIN_PREFIX}/rewards/*`,
    REWARD: `${DOMAIN_PREFIX}/rewards/`,
    DETAILS: `${DOMAIN_PREFIX}/rewardDetails/:id`,
    APPROVALS: `${DOMAIN_PREFIX}/rewards/approvals`,
  },
  COMPLAINS: {
    COMPLAIN: `${DOMAIN_PREFIX}/complains/*`,
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
    ADD: `add`,
    EMPLOYEELINK: `${DOMAIN_PREFIX}/employees`,
    INFO: `info/*`,
    BANK_DETAIL: "info/bankDetail/:id",
    BASIC_INFO: "info/basicInfo/:id",
    USER_LEAVES: "info/leaves/:id",
    EDUCATION: `info/education/:id`,
    EMERGENCY_INFO: `info/emergencyInfo/:id`,
    EXPERIENCE: `info/experience/:id`,
  },
  EMPLOYEES_INFO: {
    // JOB_BY_ID: `${DOMAIN_PREFIX}/employees/job`,
    // EMAIL_CONFIG: `${DOMAIN_PREFIX}/employees/emailconfig`,
    // PACKAGE: `${DOMAIN_PREFIX}/employees/package`,
    // LINKAGE: `${DOMAIN_PREFIX}/employees/linkage`,
    // USER_RIGHTS: `${DOMAIN_PREFIX}/employees/rights`,
    // ACTIVITY_LOGS: `${DOMAIN_PREFIX}/employees/activityLogs`,
    // SALARY: `${DOMAIN_PREFIX}/employees/salary`,
    // APPRAISAL: `${DOMAIN_PREFIX}/employees/appraisal`,
    // OFFICE_TIMINGS: `${DOMAIN_PREFIX}/employees/officeTimings`,
    // OFFICETIME: `${DOMAIN_PREFIX}/employees/officetime`,
    // EMPLOYEE_TIME: `${DOMAIN_PREFIX}/employees/employee_time`,
    // EMAIL_SEND: `${DOMAIN_PREFIX}/employees/EmailSend`,
    // ALLOWANCES: `${DOMAIN_PREFIX}/employees/allowances`,
  },
  ADMINISTRATOR: {
    DEFAULT: `${DOMAIN_PREFIX}/administrator/*`,
    ADMINISTRATION: `${DOMAIN_PREFIX}/administrator/`,
    BUSINESS_POLICY: `businessPolicy`,
    ACCESSROLES: `accessroles`,
    GRADE: `grade`,
    ELEARNING_CATEGORY: `eLearningCategory`,
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
  REQUISITIONS: {
    DEFAULT: `${DOMAIN_PREFIX}/requisition/*`,
    ROOT: `${DOMAIN_PREFIX}/requisition`,
    REQUISITIONS: `${DOMAIN_PREFIX}/requisition`,
    DETAIL: `/detail`,
    APPROVALS: `${DOMAIN_PREFIX}/loan/approvals`,
    APPLYREQUISITION: `${DOMAIN_PREFIX}/applyRequisition`,
    CREATE_VOUCHERS: `${DOMAIN_PREFIX}/createasset`,
  },

  REWARDS: {
    DEFAULT: `${DOMAIN_PREFIX}/rewards/*`,
    REWARD: `${DOMAIN_PREFIX}/rewards/`,
    APPROVALS: `${DOMAIN_PREFIX}/rewards/approvals`,
  },
  COMPLAINS: {
    DEFAULT: `${DOMAIN_PREFIX}/complains/*`,
    ROOT: `${DOMAIN_PREFIX}/complains`,
    DETAIL: `/detail`,
  },
  WARNINGS: {
    DEFAULT: `${DOMAIN_PREFIX}/warnings/*`,
    WARNING: `${DOMAIN_PREFIX}/warnings/`,
    APPROVALS: `warnings/approvals`,
  },
  EXPENSES: {
    DEFAULT: `${DOMAIN_PREFIX}/expenses/*`,
    ROOT: `${DOMAIN_PREFIX}/expenses`,
    EXPENSES: `${DOMAIN_PREFIX}/expenses/`,
    DETAIL: `/detail`,
  },
  APPRAISALS: {
    DEFAULT: `${DOMAIN_PREFIX}/appraisals/*`,
    ROOT: `${DOMAIN_PREFIX}/appraisals`,
    DETAIL: `/detail`,
    SUBMIT: `/submitAppraisal`,
  },
  PROMOTION: {
    DEFAULT: `${DOMAIN_PREFIX}/promotions/*`,
    ROOT: `${DOMAIN_PREFIX}/promotions`,
    PROMOTION: `${DOMAIN_PREFIX}/promotions`,

    DETAIL: `/detail`,
  },
  LEAVES: {
    DEFAULT: `${DOMAIN_PREFIX}/leaves/*`,
    LEAVE: `${DOMAIN_PREFIX}/leaves/`,
    APPROVALS: `leaves/approvals`,
  },
  REQUISITION: {
    DEFAULT: `${DOMAIN_PREFIX}/requisition/*`,
    REQUISITION: `${DOMAIN_PREFIX}/requisition`,
    DETAIL: `${DOMAIN_PREFIX}/requisition/requisitionDetail/:id`,
    APPLYREQUISITION: `${DOMAIN_PREFIX}/applyRequisition`,
  },
  //   EMPLOYEES: {
  //     DEFAULT: `${DOMAIN_PREFIX}/employees/*`,
  //     EMPLOYEELINK: `${DOMAIN_PREFIX}/employees`,
  //     ADD: `add`,
  //     BASIC_INFO: `${DOMAIN_PREFIX}/employees/info`,
  //     JOB_BY_ID: `${DOMAIN_PREFIX}/employees/job`,
  //     EMAIL_CONFIG: `${DOMAIN_PREFIX}/employees/emailconfig`,
  //     EDUCATION: `${DOMAIN_PREFIX}/employees/education`,
  //     EXPERIENCE: `${DOMAIN_PREFIX}/employees/experience`,
  //     PACKAGE: `${DOMAIN_PREFIX}/employees/package`,
  //     LINKAGE: `${DOMAIN_PREFIX}/employees/linkage`,
  //     USER_RIGHTS: `${DOMAIN_PREFIX}/employees/rights`,
  //     ACTIVITY_LOGS: `${DOMAIN_PREFIX}/employees/activityLogs`,
  //     SALARY: `${DOMAIN_PREFIX}/employees/salary`,
  //     APPRAISAL: `${DOMAIN_PREFIX}/employees/appraisal`,
  //     OFFICE_TIMINGS: `${DOMAIN_PREFIX}/employees/officeTimings`,
  //     OFFICETIME: `${DOMAIN_PREFIX}/employees/officetime`,
  //     EMPLOYEE_TIME: `${DOMAIN_PREFIX}/employees/employee_time`,
  //     EMAIL_SEND: `${DOMAIN_PREFIX}/employees/EmailSend`,
  //     ALLOWANCES: `${DOMAIN_PREFIX}/employees/allowances`,
  //     BANK_DETAILS: `${DOMAIN_PREFIX}/employees/bankDetails`,
  //   },
  ADMINISTRATOR: {
    DEFAULT: `${DOMAIN_PREFIX}/administrator/*`,
    ADMINISTRATION: `${DOMAIN_PREFIX}/administrator/`,
    BUSINESS_LOGO: `businessLogo`,
    REBATE_CATEGORY: `rebateCategory`,
    ASSETS_CATEGORY: `assetsCategory`,
    DEFAULT_HIRING_CRITERIA: `defaultHiringCriteria`,
    SUBSIDIARY_OFFICE: `subsidiaryOffice`,
    SUBSIDIARY: `subsidiary`,
    COMPANIES_POLICY: `companiesPolicy`,
    COMLAIN_CATEGORY: `complainCategory`,
    PAYROLL_GROUP: `payrollGroup`,
    ACCESSROLES: `accessroles`,
    FISCAL_YEAR: `fiscalYear`,
    DESIGNATION: `designation`,
    TAX_SLAB: `taxSlab`,
    TAX_SLAB_GROUP: `taxSlabsGroup`,
    GRADE: `grade`,
    ELEARNING_CATEGORY: `eLearningCategory`,

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
    ROOT: `${DOMAIN_PREFIX}/loan`,
    LOAN: `${DOMAIN_PREFIX}/loan`,
    DETAIL: `/detail`,
    APPROVALS: `${DOMAIN_PREFIX}/loan/approvals`,
  },
  // RESIGNATION: {
  // 	DEFAULT: `${DOMAIN_PREFIX}/resignation/*`,
  // 	RESIGNATION: `${DOMAIN_PREFIX}/resignation`,
  // },

  TRAVELS: `${DOMAIN_PREFIX}/travel`,
  TRAVEL: {
    DEFAULT: `${DOMAIN_PREFIX}/travel/*`,
    ROOT: `${DOMAIN_PREFIX}/travel`,
    DETAILS: `/detail`,
    TREAVELDETAIL: `${DOMAIN_PREFIX}/travel/travel-detail/`,
    DETAIL: `${DOMAIN_PREFIX}/travel/travel-detail/:travelId`,
    CITIES: `${DOMAIN_PREFIX}/travel/cities`,
    APPROVALS: `${DOMAIN_PREFIX}/travel/approvals`,
    EXPENSES: `${DOMAIN_PREFIX}/travel/expenses`,
    AGENT: `${DOMAIN_PREFIX}/travel/agent`,
  },
  COMPANIES: {
    DEFAULT: `${DOMAIN_PREFIX}/companies/*`,
    ROOT: `${DOMAIN_PREFIX}/companies`,
  },
  DOCUMENTS: {
    DEFAULT: `${DOMAIN_PREFIX}/documents/*`,
    DOCUMENT: `${DOMAIN_PREFIX}/documents`,
  },
  SALARY: {
    DEFAULT: `${DOMAIN_PREFIX}/salary/*`,
    ROOT: `${DOMAIN_PREFIX}/salary`,
    SALARY: `${DOMAIN_PREFIX}/salary`,
    DETAIL: `/detail`,
    CREATE: `${DOMAIN_PREFIX}/create`,
  },
  QOUTATION: {
    DEFAULT: `${DOMAIN_PREFIX}/quotation/*`,
    ROOT: `${DOMAIN_PREFIX}/quotation`,
    CREATE: `${DOMAIN_PREFIX}/create`,
  },
  PAYROLL: {
    DEFAULT: `${DOMAIN_PREFIX}/payroll/*`,
    ROOT: `${DOMAIN_PREFIX}/payroll`,
    CREATE: `${DOMAIN_PREFIX}/create`,
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
    TRANSACTION: {
      DEFAULT: `${DOMAIN_PREFIX}/transaction/*`,
      ROOT: `${DOMAIN_PREFIX}/transaction`,
    },
    REPORT: {
      DEFAULT: `${DOMAIN_PREFIX}/ledgerReport/*`,
      ROOT: `${DOMAIN_PREFIX}/ledgerReport`,
    },
    PAYROLL: {
      DEFAULT: `${DOMAIN_PREFIX}/payroll/*`,
      ROOT: `${DOMAIN_PREFIX}/payroll`,
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
    // APPRAISALS: {
    //   DEFAULT: `${DOMAIN_PREFIX}/appraisals`,
    //   SUBMIT: `${DOMAIN_PREFIX}/appraisals/submitAppraisal`,
    // },
    // RESIGNATIONS: {
    // 	DEFAULT: `${DOMAIN_PREFIX}/resignations/*`,
    // },
    WARNINGS: {
      DEFAULT: `${DOMAIN_PREFIX}/warnings`,
      APPROVALS: `${DOMAIN_PREFIX}/warnings/approvals`,
    },
    CUSTOM_APPROVALS: {
      DEFAULT: `${DOMAIN_PREFIX}/customApprovals`,
      APPROVALS: `${DOMAIN_PREFIX}/warnings/approvals`,
    },
    BONUS: {
      DEFAULT: `${DOMAIN_PREFIX}/bonus`,
    },
  },
  MAIL: {
    DEFAULT: `${DOMAIN_PREFIX}/mail/*`,
    ROOT: `${DOMAIN_PREFIX}/mail`,
    DETAIL: `/detail`,

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
  //commenttteddd
  // TASK: {
  //   DEFAULT: `${DOMAIN_PREFIX}/tasks/*`,
  //   ROOT: `${DOMAIN_PREFIX}/tasks`,
  //   DETAIL: `tasks/taskDetail/:id`,
  // },
  REWARDS: {
    DEFAULT: `${DOMAIN_PREFIX}/rewards/*`,
    ROOT: `${DOMAIN_PREFIX}/rewards`,
    REWARD: `${DOMAIN_PREFIX}/rewards`,
    DETAIL: `/detail`,
    APPROVALS: `${DOMAIN_PREFIX}/rewards/approvals`,
  },
  //****by SANJANA****
  TEAMS: {
    DEFAULT: `${DOMAIN_PREFIX}/teams/*`,
    ROOT: `${DOMAIN_PREFIX}/teams`,
    TEAM: `${DOMAIN_PREFIX}/teams`,
    ATTENDENCE: `attendence`,
    CHECK_IN: `checkIn`,
    LEAVES: `leaves`,
    REWARDS: `rewards`,
    APPRAISALS: `appraisals`,
    WARNING: `warning`,
    COMPLAIN: `complain`,
    COURSES: `courses`,
    EDUCATION: `education`,
    EXPERIENCE: `experience`,
    LOAN: `loan`,
    ACTIVITY_LOG: `activityLog`,
  },
  WARNINGS: {
    DEFAULT: `${DOMAIN_PREFIX}/warnings/*`,
    ROOT: `${DOMAIN_PREFIX}/warnings`,
    WARNING: `${DOMAIN_PREFIX}/warnings`,
    DETAIL: `/detail`,
    APPROVALS: `warnings/approvals`,
  },
  LEAVES: {
    DEFAULT: `${DOMAIN_PREFIX}/leaves/*`,
    ROOT: `${DOMAIN_PREFIX}/leaves`,
    LEAVE: `${DOMAIN_PREFIX}/leaves`,
    DETAIL: `/detail`,
    APPROVALS: `leaves/approvals`,
  },
  DEPARTMENTS: {
    DEFAULT: `${DOMAIN_PREFIX}/departments/*`,
    DEPARTMENT: `${DOMAIN_PREFIX}/departments`,
    DETAIL: `${DOMAIN_PREFIX}/departments/department-detail`,
    APPROVALS: `departments/approvals`,
  },
  CAREER: {
    DEFAULT: `${DOMAIN_PREFIX}/careers/*`,
    JOB_DETAIL: `${DOMAIN_PREFIX}/jobdetail`,
    CAREERLINK: `${DOMAIN_PREFIX}/careers`,
    APPLYJOB: `${DOMAIN_PREFIX}/applyjob`,
  },
  JOBS: {
    DEFAULT: `${DOMAIN_PREFIX}/jobBoard/*`,
    ROOT: `${DOMAIN_PREFIX}/jobBoard`,
    PUBLIC: `${DOMAIN_PREFIX}/public/jobBoard`,
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
    DEFAULT: `${DOMAIN_PREFIX}/bonus/*`,
    ROOT: `${DOMAIN_PREFIX}/bonus`,
    DETAIL: `/detail`,
  },
};
