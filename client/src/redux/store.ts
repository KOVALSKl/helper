import { configureStore } from "@reduxjs/toolkit";
import { symptomsApi } from "./api/symptomsApi";
import selectedSymtpomsReducer from "./slices/selectedSymtpomsSlice";

export const store = configureStore({
    reducer: {
        selectedSymtpoms: selectedSymtpomsReducer,
        [symptomsApi.reducerPath]: symptomsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            symptomsApi.middleware,
        )
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;