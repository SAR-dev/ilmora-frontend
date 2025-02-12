export interface UserSelfDataType {
    isTeacher?: boolean
    isStudent?: boolean
}

export interface StudentDataType {
    id: string
    name: string
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
    teachersPrice: string
    classMins: string
    classNote: string
}