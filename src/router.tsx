import { createBrowserRouter } from "react-router";
import NotFound from "@pages/NotFound.";
import HomePage from "@pages/HomePage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "*", element: <NotFound /> }
]);

export default router;
