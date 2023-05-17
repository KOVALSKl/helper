import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApiResponsePreview, Doctor, ApiResponse} from "../../types/types";

export const doctorsApi = createApi({
    reducerPath: 'doctors',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_HOST_LINK}`}),
    tagTypes: ['DOCTORS'],
    endpoints: (builder) => ({
        getDoctors: builder.query<ApiResponse<Doctor>[], void>({
            query: () => '/doctors',
            providesTags: ['DOCTORS']
        }),
        getDoctor: builder.query<ApiResponse<Doctor>, number>({
            query: (id) => `/doctors/${id}`,
        }),
        addDoctor: builder.mutation<ApiResponse<Doctor>, Omit<Doctor, 'id'>>({
            query: (doctor) => ({
                url: '/doctors',
                method: 'POST',
                body: doctor,
            }),
            invalidatesTags: ['DOCTORS']
        }),
        updateDoctor: builder.mutation<ApiResponse<Doctor>,Doctor>({
            query: (doctor) => ({
                url: '/doctors',
                method: 'PUT',
                body: doctor
            }),
            invalidatesTags: ['DOCTORS']
        }),
        deleteDoctor: builder.mutation<ApiResponsePreview, number>({
            query: (id) => ({
                url: `/doctors/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['DOCTORS'],
        })
    })
})

export const {
    useGetDoctorQuery,
    useGetDoctorsQuery,
    useAddDoctorMutation,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
} = doctorsApi