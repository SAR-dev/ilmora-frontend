import { createBrowserRouter } from "react-router";
import HomePage from "pages/HomePage";
import NotFound from "pages/NotFound.";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "*", element: <NotFound /> }
]);

export default router;
