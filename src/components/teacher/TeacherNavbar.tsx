import { useState } from "react";
import Drawer from 'react-modern-drawer';
import { Link } from "react-router";
import { RxExit } from "react-icons/rx";
import { FaMoon, FaRegCalendarAlt, FaRegCalendarPlus, FaSun } from "react-icons/fa";
import { ThemeName, useThemeStore } from "stores/themeStore";
import { usePocket } from "contexts/PocketContext";
import { TbTableDashed } from "react-icons/tb";
import { BsCalendar2Week } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";

const TeacherNavbar = () => {
    const { user, logout } = usePocket()
    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const toggleDrawer = () => {
        setShowDrawer((prevState) => !prevState)
    }

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
        <div className="navbar bg-base-100 border-b border-base-300 shadow px-5">
            <div className="navbar-start">
                <Link to="/" className="text-lg">
                    Ilmora
                </Link>
                <div className="px-2 py-1 ml-2 rounded-lg text-xs bg-primary text-primary-content uppercase">
                    TEACHER
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
                {user && (
                    <button className="btn gap-2" onClick={toggleDrawer}>
                        {user.avatar?.length > 0 ? (
                            <img
                                className="size-6 object-cover rounded-full"
                                src={`${import.meta.env.VITE_API_URL}/api/files/${user.collectionId}/${user.id}/${user.avatar}`}
                            />
                        ) : (
                            <div className="size-6 rounded-full bg-base-300 animate-pulse" />
                        )}
                        {user.name}
                    </button>
                )}
            </div>
            <Drawer
                open={showDrawer}
                onClose={toggleDrawer}
                direction='right'
                className=''
                duration={100}
            >
                <div className="h-full w-64 bg-base-200 flex flex-col justify-between">
                    <div>
                        <div className="w-full px-3 py-2 bg-base-100">
                            <Link to="/" className="flex items-center gap-3 font-semibold uppercase p-3">
                                Ilmora
                            </Link>
                        </div>
                        <div className="flex flex-col p-3">
                            <Link to="/t/notices" className="no-animation btn gap-3 justify-start btn-primary btn-ghost">
                                <MdOutlineNotificationsActive className="size-5" />
                                Notices
                            </Link>
                            <Link to="/t/classes/table" className="no-animation btn gap-3 justify-start btn-primary btn-ghost">
                                <TbTableDashed className="size-5" />
                                Class Table
                            </Link>
                            <Link to="/t/classes/calendar" className="no-animation btn gap-3 justify-start btn-primary btn-ghost">
                                <BsCalendar2Week className="size-5" />
                                Class Calendar
                            </Link>
                            <Link to="/t/classes/create" className="no-animation btn gap-3 justify-start btn-primary btn-ghost">
                                <FaRegCalendarPlus className="size-5" />
                                Create Class
                            </Link>
                            <Link to="/t/routines/create" className="no-animation btn gap-3 justify-start btn-primary btn-ghost">
                                <FaRegCalendarAlt className="size-5" />
                                Create Routines
                            </Link>
                        </div>
                    </div>
                    <div className="w-full px-3 py-2 bg-base-100">
                        <button className="no-animation btn gap-3 justify-start btn-primary btn-ghost w-full" onClick={handleLogout}>
                            <RxExit className="size-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default TeacherNavbar