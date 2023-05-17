import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    ApiResponse,
    ApiResponsePreview,
    Group,
    Symptom,
    SymptomPreview,
} from '../../types/types'


export const symptomsApi = createApi({
    reducerPath: 'symptoms',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_HOST_LINK}` }),
    tagTypes: ['SYMPTOM', 'GROUP', 'DISEASE'],
    endpoints: (builder) => ({
        getSymptoms: builder.query<ApiResponse<Symptom>[], void>({
            query: () => '/symptoms',
            providesTags: ['SYMPTOM']
        }),
        addSymptom: builder.mutation<ApiResponse<Symptom>, SymptomPreview>({
            query: (symptom) => ({
                url: '/symptoms',
                method: 'POST',
                body: symptom,
            }),
            invalidatesTags: ['SYMPTOM']
        }),
        updateSymptom: builder.mutation<ApiResponse<Symptom>, Symptom>({
            query: (symptom) => ({
                url: '/symptoms',
                method: 'PUT',
                body: symptom
            }),
            invalidatesTags: ['SYMPTOM']
        }),
        deleteSymptom: builder.mutation<ApiResponsePreview, number>({
            query: (id) => ({
                url: `/symptoms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SYMPTOM']
        }),
        getSymptomsGroups: builder.query<Group[], void>({
            query: () => '/groups/symptoms',
            providesTags: ['GROUP']
        }),
        getSymptomsGroup: builder.query<Group, number>({
            query: (id) => `/groups/symptoms/${id}`
        }),
        addSymptomsGroup: builder.mutation<Group, Omit<Group, 'id'>>({
            query: (group) => ({
                url: '/groups/symptoms',
                method: 'POST',
                body: group,
            }),
            invalidatesTags: ['GROUP']
        }),
        updateSymptomsGroup: builder.mutation<Group, Group>({
            query: (group) => ({
                url: '/groups/symptoms',
                method: 'PUT',
                body: group,
            }),
            invalidatesTags: ['GROUP']
        }),
        deleteSymptomsGroup: builder.mutation<ApiResponsePreview, number>({
            query: (id) => ({
                url: `/groups/symptoms/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['GROUP']
        }),
    })
})

export const {
    useGetSymptomsQuery,
    useAddSymptomMutation,
    useUpdateSymptomMutation,
    useDeleteSymptomMutation,

    useGetSymptomsGroupQuery,
    useGetSymptomsGroupsQuery,
    useAddSymptomsGroupMutation,
    useUpdateSymptomsGroupMutation,
    useDeleteSymptomsGroupMutation,

} = symptomsApi