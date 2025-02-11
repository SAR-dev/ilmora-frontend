import { createBrowserRouter } from "react-router";
import TeacherHome from "pages/teacher/TeacherHome";
import NotFound from "pages/NotFound.";
import RoutineCreate from "pages/teacher/RoutineCreate";
import RoutineList from "pages/teacher/RoutineList";
import ClassLogList from "pages/teacher/ClassLogList";
import ClassLogCreate from "pages/teacher/ClassLogCreate";
import SignIn from "pages/SignIn";
import { RequireUnAuth } from "layouts/RequireUnAuth";
import { RequireTeacherAuth } from "layouts/RequireTeacherAuth";
import HomePage from "pages/HomePage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
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
      { path: "/t/routines", element: <RoutineList /> },
      { path: "/t/routines/create", element: <RoutineCreate /> },
      { path: "/t/classes", element: <ClassLogList /> },
      { path: "/t/classes/create", element: <ClassLogCreate /> },
    ]
  },
  { path: "*", element: <NotFound /> }
]);

export default router;
