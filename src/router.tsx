import { createBrowserRouter } from "react-router";
import HomePage from "pages/HomePage";
import NotFound from "pages/NotFound.";
import RoutineCreate from "pages/teacher/RoutineCreate";
import RoutineList from "pages/teacher/RoutineList";
import ClassLogList from "pages/teacher/ClassLogList";
import ClassLogCreate from "pages/teacher/ClassLogCreate";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/routines", element: <RoutineList /> },
  { path: "/routines/create", element: <RoutineCreate /> },
  { path: "/classes", element: <ClassLogList /> },
  { path: "/classes/create", element: <ClassLogCreate /> },
  { path: "*", element: <NotFound /> }
]);

export default router;
