import { Toaster } from "react-hot-toast"
import { RouterProvider } from "react-router"
import router from "./router"
import { PocketbaseProvider } from "contexts/PocketContext"

const App = () => {
  return (
    <PocketbaseProvider>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      <RouterProvider router={router} />
    </PocketbaseProvider>
  )
}

export default App
