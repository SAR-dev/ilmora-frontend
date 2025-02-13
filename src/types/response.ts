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
