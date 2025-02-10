import { useState } from "react";
import Drawer from 'react-modern-drawer';
import { Link } from "react-router";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeName, useThemeStore } from "stores/themeStore";

const Navbar = () => {
    const { theme, setTheme } = useThemeStore()
    const toogleTheme = () => {
        console.log(theme == ThemeName.Dark)
        console.log(theme, ThemeName.Dark)
        if (theme == ThemeName.Dark) setTheme(ThemeName.Light)
        if (theme == ThemeName.Light) setTheme(ThemeName.Dark)
    }

    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const toggleDrawer = () => {
        setShowDrawer((prevState) => !prevState)
    }

    return (
        <div className="navbar bg-base-100 border-b border-base-300 shadow px-5">
            <div className="navbar-start">
                <Link to="/" className="text-lg">
                    Ilmora
                </Link>
                <div className="px-2 py-1 ml-2 rounded-lg text-xs bg-primary text-primary-content uppercase">TEACHER</div>
            </div>
            <div className="navbar-center">
            </div>
            <div className="navbar-end gap-1">
                <button className="btn btn-circle" onClick={toogleTheme}>
                    {theme == ThemeName.Dark ? (
                        <FaMoon className="size-5" />
                    ) : (
                        <FaSun className="size-5" />
                    )}
                </button>
                <button className="btn gap-2" onClick={toggleDrawer}>
                    <img
                        className="size-6 object-cover rounded-full"
                        src="https://atg-prod-scalar.s3.amazonaws.com/studentpower/media/user%20avatar.png"
                    />
                    Sayed Rafi
                </button>
            </div>
            <Drawer
                open={showDrawer}
                onClose={toggleDrawer}
                direction='left'
                className=''
                duration={100}
            >
                <div className="h-full w-64 bg-base-200 flex flex-col justify-between">
                    <div>
                        <div className="w-full p-3 bg-base-100">
                            <Link to="/" className="flex items-center gap-3 font-semibold uppercase p-3">
                                Ilmora
                            </Link>
                        </div>
                        <div className="flex flex-col p-3">
                            <Link to="/products" className="no-animation btn gap-3 justify-start btn-primary btn-ghost">
                                <FiShoppingBag className="size-5" />
                                Shop
                            </Link>
                            <Link to="/carts" className="no-animation btn gap-3 justify-start btn-primary btn-ghost">
                                <FiShoppingCart className="size-5" />
                                Cart & Wishlist
                            </Link>
                        </div>
                    </div>
                    <div className="w-full p-3 bg-base-100">
                        <button className="no-animation btn gap-3 justify-start btn-primary btn-ghost w-full">
                            <RxExit className="size-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default Navbar