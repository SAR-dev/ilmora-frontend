export interface RoutineCreateType {
    studentId: string
    utcOffset: string
    startDate: string
    endDate: string
    satTime: string
    sunTime: string
    monTime: string
    tueTime: string
    wedTime: string
    thuTime: string
    friTime: string
}

export interface ClassLogCreateType {
    studentId: string
    utcOffset: string
    logs: {
        date: string
        time: string
    }[]
}