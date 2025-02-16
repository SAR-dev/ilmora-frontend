import { Link } from "react-router";
import { RxExit } from "react-icons/rx";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeName, useThemeStore } from "stores/themeStore";
import { usePocket } from "contexts/PocketContext";

const AdminNavbar = () => {
    const { logout } = usePocket()

    const { theme, setTheme } = useThemeStore()
    const toogleTheme = () => {
        if (theme == ThemeName.Dark) setTheme(ThemeName.Light)
        if (theme == ThemeName.Light) setTheme(ThemeName.Dark)
    }

    const handleLogout = () => {
        logout()
        window.location.reload()
    }

    return (
        <section>
            <div className="navbar bg-base-100 border-b border-base-300 shadow px-5">
                <div className="navbar-start">
                    <Link to="/" className="text-lg">
                        Ilmora
                    </Link>
                    <div className="px-2 py-1 ml-2 rounded-lg text-xs bg-primary text-primary-content uppercase">
                        ADMIN
                    </div>
                </div>
                <div className="navbar-center" />
                <div className="navbar-end gap-1">
                    <button className="btn btn-circle" onClick={toogleTheme}>
                        {theme == ThemeName.Dark ? (
                            <FaMoon className="size-5" />
                        ) : (
                            <FaSun className="size-5" />
                        )}
                    </button>
                    <button className="btn" onClick={handleLogout}>
                        <RxExit className="size-5" />
                        Sign Out
                    </button>
                </div>
            </div>
            <div className="fixed top-0 w-full h-screen p-5 bg-error text-error-content w-full justify-center items-center text-center text-2xl flex lg:hidden gap-2 items-center font-semibold z-[99]">
                💀 Admin panel is optimized for desktop version only.
            </div>
        </section>
    )
}

export default AdminNavbar