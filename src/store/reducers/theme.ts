import { createSlice } from '@reduxjs/toolkit'

export enum themes {
    dark="dark",
    light="light",
    glow="glow"
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        currentTheme: themes.dark,
    },
    reducers: {
        setDarkTheme: (state) => { state.currentTheme = themes.dark},
        setLightTheme: (state) => { state.currentTheme = themes.light},
    },
})

export const { setDarkTheme, setLightTheme } = themeSlice.actions;

export default themeSlice.reducer;
