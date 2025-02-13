import { createBrowserRouter } from "react-router";
import TeacherHome from "pages/teacher/TeacherHome";
import NotFound from "pages/NotFound.";
import RoutineCreate from "pages/teacher/RoutineCreate";
import ClassLogList from "pages/teacher/ClassLogList";
import ClassLogCreate from "pages/teacher/ClassLogCreate";
import SignIn from "pages/SignIn";
import { RequireUnAuth } from "layouts/RequireUnAuth";
import { RequireTeacherAuth } from "layouts/RequireTeacherAuth";
import Homepage from "pages/Homepage";
import NoticeList from "pages/teacher/NoticeList";
import NoticeDetails from "pages/teacher/NoticeDetails";
import ClassLogDetails from "pages/teacher/ClassLogDetails";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  {
    element: <RequireUnAuth />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
    ]
  },
  {
    element: <RequireTeacherAuth />,
    children: [
      { path: "/t", element: <TeacherHome /> },
      { path: "/t/routines/create", element: <RoutineCreate /> },
      { path: "/t/classes/create", element: <ClassLogCreate /> },
      { path: "/t/classes", element: <ClassLogList /> },
      { path: "/t/classes/:id", element: <ClassLogDetails /> },
      { path: "/t/notices", element: <NoticeList /> },
      { path: "/t/notices/:id", element: <NoticeDetails /> },
    ]
  },
  { path: "*", element: <NotFound /> }
]);

export default router;
