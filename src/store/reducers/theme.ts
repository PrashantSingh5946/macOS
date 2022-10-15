import { createSlice } from '@reduxjs/toolkit'

enum theme {
    dark="dark",
    light="light",
    glow="glow"
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        currentTheme: theme.dark,
    },
    reducers: {
        setDarkTheme: (state) => { state.currentTheme = theme.dark},
        setLightTheme: (state) => { state.currentTheme = theme.light},
    },
})

export const { setDarkTheme, setLightTheme } = themeSlice.actions

export default themeSlice.reducer