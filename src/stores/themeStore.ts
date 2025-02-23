import { constants } from 'constants'
import { useEffect } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export enum ThemeName {
    Light = "islamic-l",
    Dark = "islamic-d"
}

type ThemeStore = {
    theme: ThemeName
    setTheme: (props: ThemeName) => void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: ThemeName.Dark,
            setTheme: (value: ThemeName) => {
                set(() => ({ theme: value }))
                document.querySelector('html')?.setAttribute('data-theme', value)
            },
        }), {
        name: constants.THEME_STORE_KEY,
        storage: createJSONStorage(() => localStorage),
    })
)

export const ThemeInitializer = () => {
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        document.querySelector("html")?.setAttribute("data-theme", theme);
    }, [theme]);

    return null; // No UI element needed
};
