import { configureStore } from '@reduxjs/toolkit'
import animationReducer from "./reducers/animation"
import themeReducer from "./reducers/theme"

const store = configureStore({
    reducer: {
        animation: animationReducer,
        theme: themeReducer,
    },
})
export default store;
export type RootState = ReturnType<typeof store.getState>