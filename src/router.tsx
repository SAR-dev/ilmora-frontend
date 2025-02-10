import { createBrowserRouter } from "react-router";
import HomePage from "pages/HomePage";
import NotFound from "pages/NotFound.";
import RoutineCreate from "pages/teacher/RoutineCreate";
import RoutineList from "pages/teacher/RoutineList";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/routines", element: <RoutineList /> },
  { path: "/routines/create", element: <RoutineCreate /> },
  { path: "*", element: <NotFound /> }
]);

export default router;
