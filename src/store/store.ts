import { configureStore } from '@reduxjs/toolkit'
import animationReducer from "./reducers/animation"

const store = configureStore({
    reducer: {
        animation: animationReducer,
    },
})
export default store;
export type RootState = ReturnType<typeof store.getState>