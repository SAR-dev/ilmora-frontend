import { Toaster } from "react-hot-toast"
import { RouterProvider } from "react-router"
import router from "./router"
import { PocketbaseProvider } from "contexts/PocketContext"
import { ClassNoteProvider } from "contexts/ClassNoteContext"

const App = () => {
  return (
    <PocketbaseProvider>
      <ClassNoteProvider>
        <Toaster
          position="bottom-left"
          reverseOrder={false}
        />
        <RouterProvider router={router} />
      </ClassNoteProvider>
    </PocketbaseProvider>
  )
}

export default App
