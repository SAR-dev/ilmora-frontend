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