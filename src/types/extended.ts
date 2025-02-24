import { DailyClassPackagesResponse, StudentsResponse, TeachersResponse, TeacherStudentRelResponse, UsersResponse } from "./pocketbase";

export type TexpandStudentListWithUser = StudentsResponse & {
  expand: {
    userId: UsersResponse;
  };
};

export type TexpandTeacherListWithUser = TeachersResponse & {
  expand: {
    userId: UsersResponse;
  };
};

export type TexpandTeacherStudentRelListWithUser = TeacherStudentRelResponse & {
  expand: {
    studentId: TexpandStudentListWithUser;
    teacherId: TexpandTeacherListWithUser;
    dailyClassPackageId: DailyClassPackagesResponse;
  };
};