import { Toaster } from "react-hot-toast"
import { RouterProvider } from "react-router"
import router from "./router"

const App = () => {
  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App
