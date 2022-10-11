import { createSlice } from '@reduxjs/toolkit'

export const animationSlice = createSlice({
    name: 'animation',
    initialState: {
        areAnimationsEnabled: false,
    },
    reducers: {
        switchOn: (state) => { state.areAnimationsEnabled = true; },
        switchOff: (state) => { state.areAnimationsEnabled = false; }
    },
})

export const { switchOff, switchOn } = animationSlice.actions

export default animationSlice.reducer