import { Toaster } from "react-hot-toast"
import { RouterProvider } from "react-router"
import router from "./router"
import { PocketbaseProvider } from "contexts/PocketContext"
import { ClassNoteProvider } from "contexts/ClassNoteContext"
import { AlertProvider } from "contexts/AlertContext"
import { ThemeInitializer } from "stores/themeStore"

const App = () => {
  return (
    <PocketbaseProvider>
      <ClassNoteProvider>
        <AlertProvider>
          <Toaster
            position="bottom-left"
            reverseOrder={false}
          />
          <ThemeInitializer />
          <RouterProvider router={router} />
        </AlertProvider>
      </ClassNoteProvider>
    </PocketbaseProvider>
  )
}

export default App
