import { constants } from 'constants'
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
