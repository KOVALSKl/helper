import { configureStore } from "@reduxjs/toolkit";
import { symptomsApi } from "./api/symptomsApi";
import { diseasesApi } from "./api/diseasesApi";
import { doctorsApi } from "./api/doctorsApi";
import selectedSymtpomsReducer from "./slices/selectedSymtpomsSlice";

export const store = configureStore({
    reducer: {
        selectedSymtpoms: selectedSymtpomsReducer,
        [symptomsApi.reducerPath]: symptomsApi.reducer,
        [diseasesApi.reducerPath]: diseasesApi.reducer,
        [doctorsApi.reducerPath]: doctorsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            symptomsApi.middleware,
            diseasesApi.middleware,
            doctorsApi.middleware,
        )
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;