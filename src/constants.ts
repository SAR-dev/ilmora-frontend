export const constants = {
    THEME_STORE_KEY: "theme",
    AUTH_TOKEN_KEY: "token",
    USER_SELF_DATA_KEY: "userType",
    STUDENT_LIST_DATA_KEY: "studentList",
    RESOURCE_LIST_DATA_KEY: "resourceList",
    PACKAGE_DATA_KEY: "packageList",
    ROUTINE_VIEW_KEY: "routineView",
    NOTICE_LIST_KEY: "noticeList",
    DAY_NAMES: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    MONTHS: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    MAX_DAY_COUNT_IN_ROUTINE: 200,
    SEARCH_PARAMS: {
        STUDENT_ID: "studentId",
        DATE: "date",
        PAGE_SIZE: "pageSize",
        PAGE_NO: "pageNo",
        START_DATE: "startDate",
        END_DATE: "endDate",
    },
    ROUTINE_VIEWS: {
        CALENDAR: "calendar",
        DAYS: "days"
    },
    PAYMENT_TYPE: {
        INVOICE_TYPE: "Invoice",
        EXTRA_TYPE: "Extra"
    },
    TEMPLATE: {
        MSG: {
            TEACHER:
                `{{name}},

As-Salamu Alaikum,
Invoice Date: [ {{invoicedAt}} ]
Payment Amount: [ {{invoiceAmount}} TK ]

Please see details at: {{invoiceURL}}
`,
            STUDENT:
                `{{name}},

As-Salamu Alaikum,
Invoice Date: [ {{invoicedAt}} ]
Payment Amount: [ {{invoiceAmount}} TK ]

Please see details at: {{invoiceURL}}
`
        },
        KEY: {
            TEACHER: "teacher-msg",
            STUDENT: "student-msg",
        }
    }
}