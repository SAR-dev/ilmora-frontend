export interface UserSelfDataType {
    isTeacher?: boolean
    isStudent?: boolean
}

export interface StudentDataType {
    id: string
    name: string
    country: string
    whatsAppNo: string
    avatar: string
    teachersPrice: string
    packageName: string
    packageClassMins: string
    utcOffset: string
    satTime: string
    sunTime: string
    monTime: string
    tueTime: string
    wedTime: string
    thuTime: string
    friTime: string
    startDate: string
    endDate: string
}

export interface ClassLogDataType {
    id: string
    startedAt: string
    finishedAt: string
    status: string
    studentName: string
    studentCountry: string
    studentUserId: string
    studentUserAvatar: string
    studentWhtsAppNo: string
    teachersPrice: string
    classMins: string
    classNote: string
    utcOffset: string
    packageName: string
}

export interface PaginatedClassLogDataType {
    hasNext: boolean
    hasPrev: boolean
    pageNo: number
    pageSize: number
    totalItems: number
    totalPages: number
    items: ClassLogDataType[]
}

export interface NoticeShortDataType {
    id: string
    title: string
}

export interface ClassStatDataType {
    completedClassInfo: {
        totalClass: string
        totalPrice: string
    }
    pendingClassInfo: {
        totalClass: string
        totalPrice: string
    }
}

export interface ClassLogDetailsDataType {
    id: string;
    studentName: string;
    studentAvatar: string;
    studentWhatsAppNo: string;
    studentCountry: string;
    studentOffset: string;
    teacherName: string;
    teacherAvatar: string;
    teacherWhatsAppNo: string;
    teacherCountry: string;
    teacherOffset: string;
    startedAt: string;
    finishedAt: string;
    status: string;
    classNote: string;
    packageTitle: string;
    classMins: string;
    teachersPrice: string;
    classLink: string;
    packageId: string;
}