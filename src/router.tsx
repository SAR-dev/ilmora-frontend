import { createBrowserRouter } from "react-router";
import TeacherHome from "pages/teacher/TeacherHome";
import NotFound from "pages/NotFound.";
import RoutineCreate from "pages/teacher/RoutineCreate";
import ClassCalendar from "pages/teacher/ClassCalendar";
import ClassLogCreate from "pages/teacher/ClassLogCreate";
import SignIn from "pages/SignIn";
import { RequireUnAuth } from "layouts/RequireUnAuth";
import { RequireTeacherAuth } from "layouts/RequireTeacherAuth";
import NoticeList from "pages/teacher/NoticeList";
import NoticeDetails from "pages/teacher/NoticeDetails";
import ClassLogDetails from "pages/teacher/ClassLogDetails";
import ClassTable from "pages/teacher/ClassTable";
import { RequireSuperAuth } from "layouts/RequireSuperAuth";
import AdminHome from "pages/admin/AdminHome";
import PaymentsInvoices from "pages/teacher/PaymentsInvoices";
import Homepage from "pages/Homepage";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  {
    element: <RequireUnAuth />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
    ]
  },
  {
    element: <RequireSuperAuth />,
    children: [
      { path: "/a", element: <AdminHome /> },
    ]
  },
  {
    element: <RequireTeacherAuth />,
    children: [
      { path: "/t", element: <TeacherHome /> },
      { path: "/t/routines/create", element: <RoutineCreate /> },
      { path: "/t/classes/create", element: <ClassLogCreate /> },
      { path: "/t/classes/calendar", element: <ClassCalendar /> },
      { path: "/t/classes/table", element: <ClassTable /> },
      { path: "/t/classes/:id", element: <ClassLogDetails /> },
      { path: "/t/notices", element: <NoticeList /> },
      { path: "/t/notices/:id", element: <NoticeDetails /> },
      { path: "/t/payments", element: <PaymentsInvoices /> },
    ]
  },
  { path: "*", element: <NotFound /> }
]);

export default router;
