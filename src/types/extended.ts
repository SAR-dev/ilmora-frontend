import { StudentsResponse, TeachersResponse, UsersResponse } from "./pocketbase";

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