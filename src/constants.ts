const CONSTANTS = {
  HOWFOUNDUS: {
    YELP: "Yelp",
    GOOGLE: "Google",
    BING: "Bing",
    FLYER: "Flyer",
    REFERRAL: "Referral",
    THUMBTACK: "Thumbtack",
    CUSTOMER_REFERRAL: "Customer Referral",
    BUSINESS_REFERRAL: "Business Referral",
    REAL_ESTATE_AGENT: "Real Estate Agent",
    NEW_HOME_RESOURCE: "New Home Resource"
  },
  FLOORS: {
    ONE_STORY: "1 story",
    TWO_STORY: "2 story",
    THREE_STORY: "3 story"
  },
  BASEMENT: {
    YES: "Yes",
    NO: "No"
  },
  HOUSESIZE: {
    SMALLEST: "Less than 1600 sq ft",
    SMALLER: "1600 - 1999 sq ft",
    SMALL: "2000 - 2499 sq ft",
    MEDIUM: "2500 - 2999 sq ft",
    MEDIUMLARGE: "3000 - 3499 sq ft",
    LARGE: "3500 - 3999 sq ft",
    VERYLARGE: "4000 - 4999 sq ft",
    HUGE: "5000 sq ft and up"
  },
  RES_COMMERCIAL: {
    RES: "Residential",
    COM: "Commercial"
  },
  YES: "Yes",
  NO: "No",
  POWERWASH: {
    DRIVEWAY: "Power Wash Driveway",
    HOME: "Exterior House Washing"
  },
  WINDOWS: {
    EXTERIOR: "Window Cleaning Exterior Only",
    BOTH: "Window Cleaning Interior and Exterior"
  },
  SCREENS: {
    REPAIR: "Screen Repair",
    BUILDING: "Screen Building"
  },
  YELP: "Yelp",
  SUMMERLIN: "Summerlin",
  BLINDS: "Clean Blinds",
  SERVICES: {
    SCREEN_DOOR: "Screen Door",
    POWER_WASHING: "Power Washing",
    EXT_WINDOW_CLEANING: "Exterior Window Cleaning",
    INT_WINDOW_CLEANING: "Interior Window Cleaning",
    WINDOW_CLEANING: "Window Cleaning",
    SCREEN_BUILDING: "Screen Building",
    SCREEN_REPAIR: "Screen Repair",
    WINDOW_TINT: "Window Tint Installation",
    WINDOW_TINT_ESTIMATE: "Window Tint Estimate",
    DRIVEWAY_PRESSURE_WASHING: "Pressure Wash of Driveway",
    PATIO_PRESSURE_WASHING: "Pressure Wash of Patio",
    EXTERIOR_HOUSE_WASH: "Exterior House Wash",
    SOLAR_SCREEN_BUILD: "Solar Screen Build", 
    SOLAR_SCREEN_REPAIR: "Solar Screen Repair",
    SOLAR_SCREEN_ESTIMATE: "Solar Screen Estimate",
    WINDOW_CLEANING_ESTIMATE: "Window Cleaning Estimate"
  },
  MESSAGETYPES: {
    REMINDER: "reminder",
    SURVEY: "survey"
  },
  JOB_STATUS: {
    SCHEDULED: "scheduled",
    HEADING_TO_JOB: "heading_to_job",
    AT_JOB: "at_job",
    FINISHED: "finished"
  },
  JOB_STATUS_LABELS: {
    scheduled: "Scheduled",
    heading_to_job: "Heading to Job",
    at_job: "Working on Job",
    finished: "Job Finished"
  },
  FIRESTORE: {
    CLIENTS: "clients",
    SURVEYS: "surveys",
    DATE_OF_SERVICE: "dateOfService",
    ADDRESS: "address",
    MESSAGES: "messages",
    PHONE_NUMBER: "phoneNumber",
    SERVICES_PROVIDED: "servicesProvided",
    WHY_US: "whyUs",
    MONEYS_WORTH: "moneysWorth",
    ENJOYED_ABOUT_SERVICE: "enjoyedAboutService",
    IMPROVEMENTS: "improvements",
    RATING: "rating",
    REFERRALS: "referrals",
    EMPLOYEES: "employees",
    USERS: "users",
    APPOINTMENTS: "appointments",
    STATUS_UPDATES: "statusUpdates",
    IMPORTANT_PLACES: "importantPlaces",
    TODOS: "todos",
    ESTIMATES: "estimates",
    ORDERS: "orders",
    DOCUMENTS: "documents",
    WINDOW_CLEANING_ESTIMATES: "window-cleaning-estimates",
    INVOICES: {
      NAME: "invoices",
      COLUMNS: {
        AMOUNT: "amount",
      }
    }
  },
  USER_ROLES: {
    ADMIN: "admin",
    EMPLOYEE: "employee"
  },
  DOCUMENT_CATEGORIES: {
    CONTRACT: "contract",
    MANUAL: "manual",
    POLICY: "policy",
    FORM: "form",
    INVOICE: "invoice",
    RECEIPT: "receipt",
    OTHER: "other"
  },
  WEBVIEW_SETTINGS: {
    CUSTOMERS: "customers",
    SURVEYS: "surveys",
    INVENTORY: "inventory",
    SOLAR_SCREENS: "screens",
    APPOINTMENTS: "appointments",
    INVOICES: "invoices",
    FINANCES: "finances",
    APPOINTMENT: "appointment",
    EMPLOYEES: "employees",
    INVOICE_DETAILS: "invoice-details",
    TODOS: "todos",
    CHAT: "chat",
    ORDERS: "orders",
    ORDER_DETAILS: "order",
    DOCUMENTS: "documents",
    ESTIMATES: "estimates",
    SERVICE_ITEMS: "service-items",
    EMPLOYEE_HOURS: "employee-hours",
    ANALYTICS: "analytics",
    MARKETING: "marketing",
    BILLING: "billing"
  },
  FIREBASE: {
    apiKey: "AIzaSyCrt_jTKOXaJU1dhclEXuWT7Q1bDu8_Vo8",
    authDomain: "dephyned-web.firebaseapp.com",
    projectId: "dephyned-web",
    storageBucket: 'gs://defined-home-services-app' 
  },
  CONVERSION_TRACKING: {    
    ACCEPT_QUOTE: "AW-965571352/OqZ-CLq708YaEJjmtcwD",
    WINDOW_CLEANING: {
      PHONE: "AW-965571352/-UUKCJCx9PQBEJjmtcwD",
    },
    SOLAR_SCREENS: {
      PHONE: "AW-965571352/9AEPCPbd05QZEJjmtcwD",
      ACUITY: "AW-965571352/ozLnCOOZypQZEJjmtcwD",
      FORM_SUBMIT: "AW-965571352/I699CMmNxcYaEJjmtcwD"
    }
  }
};

export default CONSTANTS;
